// Captura screenshots das demos dos projetos e salva em public/projects/<slug>/.
//
//   npm run shots
//
// Para cada demo, captura várias seções da página (rolando de cima a baixo),
// em 16:9 para encaixar nos frames da página de detalhe sem corte. Depois rode
// `npm run sync:github` — o sync detecta as imagens e preenche `screenshots`.
//
// Requer o Playwright + o Chromium instalados:
//   npm i -D playwright && npx playwright install chromium
//
// Só captura projetos que têm `demo` (URL pública). Projetos sem demo são
// ignorados (adicione prints manualmente em public/projects/<slug>/ se quiser).

import { mkdirSync, existsSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { curatedProjects } from "../src/data/projects.curated.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const VIEWPORT = { width: 1440, height: 810 }; // 16:9
const MAX_SHOTS = 3; // máximo de seções por demo

// Remove prints antigos para não deixar imagens órfãs de execuções anteriores.
function cleanDir(dir) {
  if (!existsSync(dir)) return;
  for (const f of readdirSync(dir)) {
    if (/^\d+\.(png|jpe?g|webp)$/i.test(f)) rmSync(resolve(dir, f));
  }
}

// Capturas configuradas: uma imagem por página/estado definido em `shots`.
async function captureConfigured(context, project, dir) {
  let count = 0;
  for (const shot of project.shots) {
    const page = await context.newPage();
    try {
      await page.goto(project.demo + (shot.path ?? ""), {
        waitUntil: "networkidle",
        timeout: 45000,
      });
      await page.waitForTimeout(1200);

      if (shot.click) {
        // Margem de hidratação: garante navegação client-side (abre o modal
        // via intercepting routes em vez de carregar a página cheia).
        await page.waitForTimeout(2000);
        const openModal = async () => {
          await page.locator(shot.click).first().click().catch(() => {});
          return page
            .waitForSelector("dialog", { timeout: 6000 })
            .then(() => true)
            .catch(() => false);
        };
        let opened = await openModal();
        if (!opened) {
          // Clicou antes da hidratação e navegou para a página cheia: volta e repete.
          await page.goBack().catch(() => {});
          await page.waitForTimeout(2500);
          opened = await openModal();
        }
        await page.waitForTimeout(1200);
      }

      if (shot.fill) {
        const input = page.locator("input").first();
        await input.fill(shot.fill);
        if (shot.submit) {
          // Cobre formulários (Enter) e botões de submit avulsos (clique).
          await input.press("Enter").catch(() => {});
          const submitBtn = page.locator('button[type="submit"]').first();
          if (await submitBtn.count()) await submitBtn.click().catch(() => {});
        }
        await page.waitForTimeout(2000); // espera os resultados carregarem
      }

      count++;
      const n = String(count).padStart(2, "0");
      await page.screenshot({ path: resolve(dir, `${n}.png`) });
    } catch (err) {
      console.warn(`     · falha em "${shot.label ?? shot.path ?? "/"}": ${err.message}`);
    } finally {
      await page.close();
    }
  }
  return count;
}

// Fallback automático: rola a home e captura em seções (para projetos sem `shots`).
async function captureScrolling(context, project, dir) {
  const page = await context.newPage();
  let count = 0;
  try {
    await page.goto(project.demo, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1500);

    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const steps = Math.min(MAX_SHOTS, Math.max(1, Math.ceil(pageHeight / VIEWPORT.height)));

    for (let i = 0; i < steps; i++) {
      const target = Math.min(i * VIEWPORT.height, Math.max(0, pageHeight - VIEWPORT.height));
      await page.evaluate((y) => window.scrollTo(0, y), target);
      await page.waitForTimeout(700);
      count++;
      await page.screenshot({ path: resolve(dir, `${String(count).padStart(2, "0")}.png`) });
    }
  } finally {
    await page.close();
  }
  return count;
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error(
      "✗ Playwright não encontrado. Instale com:\n" +
        "    npm i -D playwright && npx playwright install chromium",
    );
    process.exit(1);
  }

  const targets = curatedProjects.filter((p) => p.demo);
  console.log(`→ Capturando ${targets.length} demos (até ${MAX_SHOTS} seções cada)\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });

  for (const p of targets) {
    const dir = resolve(ROOT, "public/projects", p.name);
    mkdirSync(dir, { recursive: true });
    cleanDir(dir);
    try {
      const n = p.shots?.length
        ? await captureConfigured(context, p, dir)
        : await captureScrolling(context, p, dir);
      console.log(`  ✓  ${p.name.padEnd(20)} ${n} imagem(ns)`);
    } catch (err) {
      console.warn(`  !  ${p.name.padEnd(20)} falha: ${err.message}`);
    }
  }

  await browser.close();
  console.log("\n✔ Concluído. Rode `npm run sync:github` para registrar as imagens.");
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});

// Captura screenshots das demos dos projetos e salva em public/projects/<slug>/.
//
//   npm run shots
//
// Depois rode `npm run sync:github` — o sync detecta as imagens automaticamente
// e preenche o campo `screenshots` de cada projeto.
//
// Requer o Playwright + o Chromium instalados:
//   npm i -D playwright && npx playwright install chromium
//
// Só captura projetos que têm `demo` (URL pública). Projetos sem demo são
// ignorados (adicione prints manualmente em public/projects/<slug>/ se quiser).

import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { curatedProjects } from "../src/data/projects.curated.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const VIEWPORT = { width: 1280, height: 800 };

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
  console.log(`→ Capturando ${targets.length} demos\n`);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });

  for (const p of targets) {
    const dir = resolve(ROOT, "public/projects", p.name);
    mkdirSync(dir, { recursive: true });
    const out = resolve(dir, "01.png");
    const page = await context.newPage();
    try {
      await page.goto(p.demo, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(1500); // deixa animações/imagens assentarem
      await page.screenshot({ path: out });
      console.log(`  ✓  ${p.name.padEnd(20)} → public/projects/${p.name}/01.png`);
    } catch (err) {
      console.warn(`  !  ${p.name.padEnd(20)} falha: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\n✔ Concluído. Rode `npm run sync:github` para registrar as imagens.");
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});

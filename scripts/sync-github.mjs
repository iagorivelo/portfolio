// Sincroniza os projetos com a API do GitHub.
//
//   npm run sync:github
//
// Lê a fonte curada (src/data/projects.curated.mjs), busca os dados vivos de
// cada repositório e escreve src/data/projects.generated.json — que é o arquivo
// importado pela aplicação. Rode sempre que quiser atualizar stars, demos ou
// puxar descrição/stack novas via topics do GitHub, e comite o .json gerado.
//
// Autenticação (opcional, recomendada): defina GITHUB_TOKEN no .env para subir
// o limite de 60 → 5000 req/h. Sem token, roda anônimo (suficiente para poucos
// repos). Um Personal Access Token "classic" sem escopos (ou fine-grained só de
// leitura) já basta para repositórios públicos.

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { execFileSync } from "node:child_process";

import { curatedProjects } from "../src/data/projects.curated.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_PATH = resolve(ROOT, "src/data/projects.generated.json");
const ENV_PATH = resolve(ROOT, ".env");

// --- .env mínimo (Node só injeta com --env-file; parseamos aqui p/ portabilidade) ---
function loadEnv() {
  if (!existsSync(ENV_PATH)) return;
  const raw = readFileSync(ENV_PATH, "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!m || line.trim().startsWith("#")) continue;
    const key = m[1];
    let val = (m[2] ?? "").trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnv();

// Token: .env (GITHUB_TOKEN/GH_TOKEN) → CLI do gh (gh auth token) → anônimo.
function resolveToken() {
  const fromEnv = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (fromEnv) return { token: fromEnv, source: ".env" };
  try {
    const t = execFileSync("gh", ["auth", "token"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (t) return { token: t, source: "gh" };
  } catch {
    // gh ausente ou não autenticado — segue anônimo
  }
  return { token: "", source: "anônimo" };
}

const { token: TOKEN, source: TOKEN_SOURCE } = resolveToken();

// --- topics do GitHub → rótulos de stack apresentáveis ---
// Adicione entradas conforme for tagueando novos repos. Topics não mapeadas
// entram title-cased; topics genéricas em IGNORE_TOPICS são descartadas.
const TOPIC_LABELS = {
  php: "PHP",
  php8: "PHP",
  phpunit: "PHPUnit",
  laravel: "Laravel",
  filament: "Filament",
  laminas: "Laminas / Zend MVC",
  zend: "Laminas / Zend MVC",
  typescript: "TypeScript",
  javascript: "JavaScript",
  react: "React",
  reactjs: "React",
  next: "Next.js",
  nextjs: "Next.js",
  node: "Node.js",
  nodejs: "Node.js",
  python: "Python",
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  mysql: "MySQL",
  sqlite: "SQLite",
  sqlite3: "SQLite3",
  redis: "Redis",
  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",
  docker: "Docker",
  nginx: "Nginx",
  apache: "Apache",
  jwt: "JWT",
  pdo: "PDO",
  ajax: "AJAX",
  rest: "REST API",
  "rest-api": "REST API",
  api: "REST API",
  "github-api": "GitHub API",
  vercel: "Vercel",
  "radix-ui": "Radix UI",
  viacep: "ViaCEP",
  supabase: "Supabase",
  gemini: "Google Gemini",
  "google-gemini": "Google Gemini",
  pest: "Pest",
  rss: "RSS",
  markdown: "Markdown",
};

// Ordem de exibição do stack. Rótulos aqui aparecem nesta ordem; os que não
// estiverem na lista vão para o fim, preservando a ordem original das topics.
const STACK_PRIORITY = [
  // Frameworks / meta-frameworks
  "Next.js",
  "Laravel",
  "Laminas / Zend MVC",
  // Bibliotecas de UI base
  "React",
  // Linguagens
  "TypeScript",
  "JavaScript",
  "PHP",
  "Python",
  // UI / estilo
  "Tailwind CSS",
  "Radix UI",
  "Filament",
  // Runtime / padrões do framework
  "Server Components",
  "Server Actions",
  "Node.js",
  // Serviços / plataformas de dados
  "Supabase",
  "Google Gemini",
  // Persistência
  "PDO",
  "MySQL",
  "PostgreSQL",
  "SQLite3",
  "SQLite",
  "Redis",
  // APIs / integrações
  "REST API",
  "GitHub API",
  "ViaCEP",
  "RSS",
  "Markdown",
  // Autenticação
  "JWT",
  // Infra / DevOps
  "Docker",
  "Nginx",
  "Apache",
  "Vercel",
  // Testes
  "PHPUnit",
  "Pest",
  // Diversos
  "AJAX",
];

const IGNORE_TOPICS = new Set([
  "portfolio",
  "project",
  "projects",
  "study",
  "studies",
  "example",
  "demo",
  "hacktoberfest",
  "learning",
  "practice",
  "valorant",
  "cep",
  "query-builder",
]);

function normalizeTopics(topics) {
  if (!Array.isArray(topics)) return [];
  const seen = new Set();
  const out = [];
  for (const t of topics) {
    if (IGNORE_TOPICS.has(t)) continue;
    const label =
      TOPIC_LABELS[t] ??
      t
        .split(/[-_]/)
        .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
        .join(" ");
    if (!seen.has(label)) {
      seen.add(label);
      out.push(label);
    }
  }
  // Ordena pela prioridade; rótulos fora da lista mantêm a ordem original no fim.
  const rank = (label) => {
    const i = STACK_PRIORITY.indexOf(label);
    return i === -1 ? STACK_PRIORITY.length : i;
  };
  return out
    .map((label, i) => ({ label, i }))
    .sort((a, b) => rank(a.label) - rank(b.label) || a.i - b.i)
    .map((x) => x.label);
}

// Detecta screenshots em public/projects/<slug>/ (geradas por `npm run shots`
// ou adicionadas à mão). Retorna caminhos públicos ordenados.
function scanScreenshots(name) {
  const dir = resolve(ROOT, "public/projects", name);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
    .sort()
    .map((f) => `/projects/${name}/${f}`);
}

function parseRepo(url) {
  if (!url) return null;
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  return m ? { owner: m[1], name: m[2].replace(/\.git$/, "") } : null;
}

function loadPrevious() {
  if (!existsSync(OUT_PATH)) return new Map();
  try {
    const arr = JSON.parse(readFileSync(OUT_PATH, "utf8"));
    return new Map(arr.map((p) => [p.name, p]));
  } catch {
    return new Map();
  }
}

async function fetchRepo(owner, name) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-sync-script",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
    headers,
  });
  if (!res.ok) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    const hint =
      res.status === 403 && remaining === "0"
        ? " (rate-limit atingido — defina GITHUB_TOKEN no .env)"
        : res.status === 404
          ? " (repositório privado ou inexistente)"
          : "";
    throw new Error(`HTTP ${res.status}${hint}`);
  }
  return res.json();
}

// --- monta o projeto final aplicando a precedência curado → GitHub ---
function mergeProject(curated, gh, previous) {
  const nonEmpty = (v) => (typeof v === "string" && v.trim() ? v.trim() : null);

  const language = curated.language ?? gh?.language ?? "Outros";

  let stack = Array.isArray(curated.stack) && curated.stack.length ? curated.stack : null;
  if (!stack) {
    const fromTopics = normalizeTopics(gh?.topics);
    stack = fromTopics.length ? fromTopics : [language];
  }

  const merged = {
    name: curated.name,
    title: curated.title,
    description: nonEmpty(gh?.description) ?? curated.description ?? curated.title,
    ...(curated.longDescription ? { longDescription: curated.longDescription } : {}),
    ...(curated.highlights ? { highlights: curated.highlights } : {}),
    screenshots:
      curated.screenshots && curated.screenshots.length
        ? curated.screenshots
        : scanScreenshots(curated.name),
    language,
    stack,
    type: curated.type,
    ...(curated.repo ? { repo: curated.repo } : {}),
    stars: gh ? gh.stargazers_count : (previous?.stars ?? 0),
    ...(curated.featured ? { featured: true } : {}),
  };

  const demo = curated.demo ?? nonEmpty(gh?.homepage) ?? previous?.demo;
  if (demo) merged.demo = demo;

  if (gh?.archived) merged.archived = true;

  const pushedAt = gh?.pushed_at ?? previous?.pushedAt;
  if (pushedAt) merged.pushedAt = pushedAt;

  return merged;
}

async function main() {
  const authLabel = TOKEN
    ? `(autenticado via ${TOKEN_SOURCE})`
    : "(anônimo, 60 req/h)";
  console.log(`→ Sincronizando ${curatedProjects.length} projetos ${authLabel}\n`);
  const previous = loadPrevious();
  const results = [];
  let fetched = 0;
  let fallbacks = 0;

  for (const curated of curatedProjects) {
    const repo = parseRepo(curated.repo);
    const prev = previous.get(curated.name);

    if (!repo) {
      results.push(mergeProject(curated, null, prev));
      console.log(`  •  ${curated.name.padEnd(20)} sem repo — usando dados curados`);
      continue;
    }

    try {
      const gh = await fetchRepo(repo.owner, repo.name);
      results.push(mergeProject(curated, gh, prev));
      fetched++;
      const auto = !(Array.isArray(curated.stack) && curated.stack.length)
        ? " [stack via topics]"
        : "";
      console.log(
        `  ✓  ${curated.name.padEnd(20)} ★ ${String(gh.stargazers_count).padStart(3)}${auto}`,
      );
    } catch (err) {
      results.push(mergeProject(curated, null, prev));
      fallbacks++;
      console.warn(
        `  !  ${curated.name.padEnd(20)} falha: ${err.message} — mantendo valores anteriores`,
      );
    }
  }

  writeFileSync(OUT_PATH, JSON.stringify(results, null, 2) + "\n", "utf8");
  console.log(
    `\n✔ ${results.length} projetos escritos em src/data/projects.generated.json` +
      `  (${fetched} do GitHub, ${fallbacks} em fallback)`,
  );
  if (fallbacks > 0 && !TOKEN) {
    console.log("  Dica: defina GITHUB_TOKEN no .env para evitar rate-limit.");
  }
}

main().catch((err) => {
  console.error("Erro fatal no sync:", err);
  process.exit(1);
});

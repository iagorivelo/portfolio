# Portfolio — Iago Rivelo

Portfólio pessoal construído com **Next.js 16 (App Router)**, React 19, TypeScript
e Tailwind CSS v4. Componentes de UI via shadcn/ui (estilo new-york).

## Stack

- Next.js 16 — App Router, React Server Components por padrão
- React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- shadcn/ui + Radix UI + lucide-react

## Estrutura

| Caminho | Descrição |
| --- | --- |
| `src/app/` | App Router — cada `page.tsx` é uma rota |
| `src/app/layout.tsx` | Shell raiz (metadata, fontes, providers) |
| `src/components/` | Componentes compartilhados |
| `src/components/ui/` | Componentes shadcn/ui |
| `src/lib/` | Dados e utilitários (`portfolio-data`, `utils`) |
| `src/data/` | Dados dos projetos (ver "Projetos" abaixo) |
| `src/hooks/` | Hooks React |
| `public/` | Assets estáticos |

## Projetos (dados)

Os projetos são **gerados a partir da API do GitHub**, não escritos à mão na aplicação:

- `src/data/projects.curated.mjs` — **fonte editável à mão** (títulos, descrições em PT, highlights, stack curada, `type`, `featured`, `demo`).
- `scripts/sync-github.mjs` — `npm run sync:github` enriquece cada projeto com dados vivos (stars, demo, descrição/stack de fallback, `archived`, `pushedAt`) e escreve o JSON gerado.
- `src/data/projects.generated.json` — **gerado; não editar à mão.** É o que `src/lib/portfolio-data.ts` importa.

Precedência: conteúdo curado sempre vence; GitHub é fallback. Stack = curada ?? topics do repo (normalizadas em `TOPIC_LABELS`) ?? linguagem. Rode `sync:github` e comite o `.json` após alterar a curadoria ou para atualizar stars. Defina `GITHUB_TOKEN` no `.env` para evitar rate-limit.

## Comandos

```bash
npm run dev     # servidor de desenvolvimento
npm run build   # build de produção
npm run start        # servir build de produção
npm run lint         # eslint
npm run sync:github  # sincroniza projetos com a API do GitHub
```

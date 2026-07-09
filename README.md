# Portfólio — Iago Rivelo

Portfólio pessoal de **Iago Rivelo**, Analista de Desenvolvimento de Software.
Construído com **Next.js 16 (App Router)**, **React 19**, **TypeScript** e
**Tailwind CSS v4**, com foco em performance, SEO e uma base de dados de
projetos **sincronizada automaticamente com a API do GitHub**.

---

## ✨ Destaques

- **Renderização estática (SSG)** — páginas pré-renderizadas para carregamento rápido.
- **SEO completo** — metadata dinâmica, Open Graph, `sitemap.xml`, `robots.txt` e
  dados estruturados (JSON-LD) de `Person`, `WebSite` e `SoftwareSourceCode`.
- **Projetos automatizados** — descrições, stack (via _topics_), estrelas e status
  de arquivamento são capturados direto dos repositórios do GitHub. Veja
  [Automação de projetos](#-automação-de-projetos).
- **Filtro por stack** na listagem de projetos e **página de detalhe** por projeto.
- **Tema escuro nativo** e layout totalmente responsivo.

---

## 🧱 Stack

| Camada | Tecnologias |
| --- | --- |
| **Framework** | Next.js 16 (App Router, React Server Components) |
| **UI** | React 19, Tailwind CSS v4, shadcn/ui (estilo _new-york_), lucide-react |
| **Linguagem** | TypeScript |
| **Utilitários** | clsx, tailwind-merge |
| **Qualidade** | ESLint, Prettier |
| **Automação** | Node.js (script de sync) + GitHub CLI / API |

---

## 📁 Estrutura

```
src/
├── app/                  # App Router — cada page.tsx é uma rota
│   ├── layout.tsx        # Shell raiz (metadata, fontes, nav)
│   ├── page.tsx          # Home
│   ├── about/            # Sobre
│   ├── projects/         # Listagem + [slug] de detalhe
│   ├── contact/          # Contato
│   ├── sitemap.ts        # sitemap.xml
│   └── robots.ts         # robots.txt
├── components/           # Componentes compartilhados
├── data/
│   ├── projects.curated.mjs      # Fonte editável dos projetos
│   └── projects.generated.json   # Gerado pelo sync (não editar)
├── lib/                  # portfolio-data, structured-data, site, utils
scripts/
└── sync-github.mjs       # Sincroniza os projetos com a API do GitHub
```

---

## 🔄 Automação de projetos

Os projetos **não são escritos à mão** na aplicação — são gerados a partir da
API do GitHub, garantindo que o portfólio reflita o estado real dos repositórios.

```
projects.curated.mjs  ──►  npm run sync:github  ──►  projects.generated.json  ──►  app
   (você edita)              (busca a API)             (gerado, versionado)
```

Precedência aplicada pelo sync (**o GitHub é a fonte principal**):

| Campo | Origem |
| --- | --- |
| `description` | descrição do repositório → curada (fallback) → título |
| `stack` | _topics_ do repositório (normalizadas e ordenadas) → curada → linguagem |
| `stars`, `archived`, `pushedAt` | sempre da API do GitHub |
| `longDescription`, `highlights` | curados (sem equivalente no GitHub) |

Para atualizar um card, basta editar a **descrição** e os **topics** no próprio
repositório e rodar `npm run sync:github`.

---

## 🚀 Como rodar

**Pré-requisitos:** Node.js 20+ e npm.

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Ambiente de desenvolvimento
npm run dev        # http://localhost:3000
```

Para gerar o build de produção:

```bash
npm run build
npm run start
```

---

## 📜 Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | Linter (ESLint) |
| `npm run format` | Formata o código (Prettier) |
| `npm run sync:github` | Sincroniza os projetos com a API do GitHub |

---

## ⚙️ Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `SITE_URL` | Recomendada | URL do site em produção (metadata, sitemap, canonical). Server-only. |
| `GITHUB_TOKEN` | Opcional | Eleva o limite da API de 60 → 5000 req/h no sync. Sem ela, o script tenta `gh auth token` e, por fim, roda anônimo. |

---

## 📄 Licença

Projeto de uso pessoal. Sinta-se à vontade para se inspirar na estrutura.

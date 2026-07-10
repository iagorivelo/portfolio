// Fonte curada dos projetos — ÚNICA fonte que você edita à mão.
//
// O script `npm run sync:github` lê este arquivo, enriquece cada projeto com
// dados vivos da API do GitHub (stars, demo, descrição/stack de fallback,
// arquivado, último push) e escreve `projects.generated.json`, que é o que a
// aplicação de fato importa. Nunca edite o .json gerado — edite aqui e rode o sync.
//
// Precedência aplicada pelo sync:
//   • description → descrição do repo ?? curada ?? título   (GitHub vence)
//   • stack       → topics do repo normalizadas ?? curada ?? [linguagem]  (GitHub vence)
//   • language    → curada ?? linguagem do repo
//   • demo        → curada ?? homepage do repo
//   • stars       → sempre do GitHub (fallback: valor anterior gerado, senão 0)
//   • longDescription/highlights → sempre curados (sem equivalente no GitHub)
//
// `description` e `stack` são capturados do GitHub. Só mantenha `description`
// aqui como fallback quando o repo não puder ter uma (ex.: busca-cep, arquivado
// e read-only). Para o texto do card, edite a descrição no próprio repositório.

/** @type {import("../lib/portfolio-data").CuratedProject[]} */
export const curatedProjects = [
  {
    name: "tech-store",
    title: "Tech Store",
    longDescription:
      "Loja de tecnologia construída sobre o App Router do Next.js, explorando React Server Components para renderizar no servidor e Server Actions para mutações sem rotas de API dedicadas. O catálogo carrega sob demanda com scroll infinito, o carrinho persiste entre sessões e o tema escuro é nativo.",
    highlights: [
      "Catálogo com scroll infinito alimentado por Server Actions",
      "Carrinho persistente entre sessões",
      "React Server Components para payload mínimo no cliente",
      "Tema escuro nativo e layout responsivo",
    ],
    screenshots: [],
    language: "JavaScript",
    type: "app",
    repo: "https://github.com/iagorivelo/tech-store",
    demo: "https://tech-store-sigma-umber.vercel.app",
    shots: [
      { label: "catálogo" },
      { path: "/produto/headphone-pro-max", label: "página de produto" },
    ],
    featured: true,
  },
  {
    name: "automatic-blog",
    title: "Automatic Blog",
    longDescription:
      "Plataforma de blog com geração de conteúdo automatizada, roteamento dinâmico por slug e publicação contínua na edge da Vercel. Pensada para produzir e servir artigos com o mínimo de intervenção manual.",
    highlights: [
      "Geração de conteúdo automatizada",
      "Roteamento dinâmico por slug",
      "Deploy contínuo na edge da Vercel",
      "TypeScript de ponta a ponta",
    ],
    screenshots: [],
    language: "TypeScript",
    type: "app",
    repo: "https://github.com/iagorivelo/automatic-blog",
    demo: "https://automatic-blog-phi.vercel.app",
    shots: [
      { label: "home" },
      {
        path: "/post/um-ano-de-tensao-comercial-brasil-e-eua-em-impasse-tarifario-sem-solucao",
        label: "artigo",
      },
    ],
    featured: true,
  },
  {
    name: "valorant_data",
    title: "Valorant Data",
    longDescription:
      "Catálogo interativo que consome a API pública do Valorant e organiza mapas, armas, agentes e coleções em uma interface rica, com imagens, vídeos e descrições oficiais do jogo.",
    highlights: [
      "Consumo da API pública oficial do Valorant",
      "Navegação por mapas, armas, agentes e coleções",
      "Mídia rica com imagens e vídeos",
      "Tipagem estática com TypeScript",
    ],
    screenshots: [],
    language: "TypeScript",
    type: "app",
    repo: "https://github.com/iagorivelo/valorant_data",
    demo: "https://valorant-data-ten.vercel.app",
    shots: [
      { path: "/agentes", label: "agentes" },
      { path: "/armas", label: "armas" },
      { path: "/mapas", label: "mapas" },
    ],
    featured: true,
  },
  {
    name: "search-repos",
    title: "Search Repos",
    longDescription:
      "Ferramenta que busca repositórios do GitHub em tempo real conforme você digita, com listagem paginada, estados de carregamento e erro tratados e interface totalmente responsiva.",
    highlights: [
      "Busca em tempo real na API do GitHub",
      "Listagem paginada",
      "Tratamento explícito de carregamento e erros",
      "UI responsiva",
    ],
    screenshots: [],
    language: "TypeScript",
    type: "tool",
    repo: "https://github.com/iagorivelo/search-repos",
    demo: "https://search-repos-xi.vercel.app",
    shots: [
      { label: "busca" },
      { fill: "iagorivelo", submit: true, label: "resultados" },
    ],
  },
  {
    name: "busca-cep",
    title: "Busca CEP",
    description:
      "Consulta de endereços via CEP integrada à ViaCEP com validação, feedback de erro e histórico local.",
    longDescription:
      "Consulta de endereços a partir do CEP integrada à API ViaCEP, com validação de entrada, feedback claro de erro e histórico local das últimas buscas.",
    highlights: [
      "Integração com a API ViaCEP",
      "Validação de CEP e feedback de erro",
      "Histórico local das buscas",
      "Interface enxuta e responsiva",
    ],
    screenshots: [],
    language: "TypeScript",
    type: "tool",
    repo: "https://github.com/iagorivelo/busca-cep",
    demo: "https://busca-por-cep.vercel.app/",
    shots: [{ label: "busca por CEP" }],
  },
  {
    name: "chat-php",
    title: "Chat PHP",
    longDescription:
      "Chat em tempo real escrito em PHP puro, com persistência de mensagens em SQLite3 e atualização via AJAX. Autenticação por tokens JWT, testes com PHPUnit e ambiente containerizado com Docker e Nginx. Um estudo enxuto de fundamentos de I/O e arquitetura sem frameworks.",
    highlights: [
      "Mensagens em tempo real via AJAX",
      "Autenticação com tokens JWT",
      "Persistência em SQLite3, PHP puro sem frameworks",
      "Ambiente Docker + Nginx e testes com PHPUnit",
    ],
    screenshots: [],
    language: "PHP",
    type: "app",
    repo: "https://github.com/iagorivelo/chat-php",
  },
  {
    name: "file-import-system",
    title: "File Import System",
    longDescription:
      "Sistema administrativo de importação de arquivos construído em Laravel com painéis em Filament, seguindo arquitetura orientada a domínio (DDD). Controle de acesso baseado em papéis (RBAC): administradores gerenciam usuários e programas, enquanto cada usuário importa apenas dentro do escopo que lhe foi permitido.",
    highlights: [
      "Laravel 13 com painéis administrativos em Filament",
      "Controle de acesso por papéis (RBAC)",
      "Arquitetura orientada a domínio (DDD) com PSR-4",
      "MySQL e Redis orquestrados via Docker, testes com Pest",
    ],
    screenshots: [],
    language: "PHP",
    type: "app",
    repo: "https://github.com/iagorivelo/file-import-system",
  },
  {
    name: "sql-builder",
    title: "SQL Builder",
    longDescription:
      "Biblioteca em PHP para compor SQL de forma fluente e legível, priorizando reuso e clareza na montagem de queries por meio de uma API encadeável. Construída sobre PDO com prepared statements e validação de identificadores, mirando MySQL.",
    highlights: [
      "API fluente e encadeável",
      "Camada sobre PDO com prepared statements",
      "Validação de identificadores para segurança",
      "PHP puro, orientada a objetos, sem dependências externas",
    ],
    screenshots: [],
    language: "PHP",
    type: "biblioteca",
    repo: "https://github.com/iagorivelo/sql-builder",
  },
];

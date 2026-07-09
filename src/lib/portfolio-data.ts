import projectsData from "@/data/projects.generated.json";

export const profile = {
  name: "Iago Rivelo",
  role: "Analista de Desenvolvimento de Software",
  title: "Full-Stack Developer",
  location: "Recife, Pernambuco",
  company: "Grupo ABRAZ",
  github: "https://github.com/iagorivelo",
  avatar: "https://avatars.githubusercontent.com/u/100492685?v=4",
  bio: "Analista de Desenvolvimento de Software — PHP · Laminas · TypeScript · React · Next.js",
  since: "2021",
};

export type ProjectType = "app" | "biblioteca" | "tool";

export type Project = {
  /** Slug usado na URL (/projects/<name>). */
  name: string;
  title: string;
  /** Resumo curto exibido nos cards. */
  description: string;
  /** Descrição expandida exibida na página de detalhe. */
  longDescription?: string;
  /** Pontos de destaque técnicos do projeto. */
  highlights?: string[];
  /**
   * Caminhos de screenshots (ex.: "/projects/<slug>/01.png").
   * Deixe vazio para renderizar placeholders na página de detalhe.
   */
  screenshots?: string[];
  language: string;
  stack: string[];
  type: ProjectType;
  /** URL do repositório. Omitido em projetos privados/proprietários. */
  repo?: string;
  demo?: string;
  stars: number;
  featured?: boolean;
  /** Repositório arquivado no GitHub (preenchido pelo sync). */
  archived?: boolean;
  /** Data ISO do último push (preenchido pelo sync). */
  pushedAt?: string;
};

/**
 * Formato editado à mão em `src/data/projects.curated.mjs`.
 * Os campos que o sync com o GitHub preenche não são exigidos aqui.
 */
export type CuratedProject = Omit<Project, "stars" | "archived" | "pushedAt">;

// Fonte de dados dos projetos — GERADA por `npm run sync:github`.
// Edite o conteúdo em `src/data/projects.curated.mjs`, não aqui.
export const projects = projectsData as unknown as Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.name === slug);
}

export const skills = {
  Linguagens: ["PHP", "TypeScript", "JavaScript", "SQL"],
  "Back-end": [
    "Laminas / Zend MVC",
    "Laravel",
    "Filament",
    "Node.js",
    "REST APIs",
    "Server Actions",
    "JWT",
  ],
  "Front-end": ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  Dados: ["MySQL", "SQLite", "Redis"],
  "Ferramentas & DevOps": ["Docker", "Git", "Nginx", "Apache", "Vercel", "Pest / PHPUnit", "Linux"],
};

export type ExperienceRole = {
  period: string;
  role: string;
  /** Marca o cargo atual (exibe destaque). */
  current?: boolean;
  /** Entregas e responsabilidades concretas da fase. */
  highlights: string[];
  /** Tecnologias em foco naquele período. */
  tech: string[];
};

export type Experience = {
  company: string;
  /** Período total na empresa (soma dos cargos). */
  period: string;
  /** Cargos do mais recente para o mais antigo — conta a progressão. */
  roles: ExperienceRole[];
};

export const experience: Experience[] = [
  {
    company: "Grupo ABRAZ",
    period: "dez 2021 — atual",
    roles: [
      {
        period: "jan 2025 — atual",
        role: "Analista de Desenvolvimento de Software",
        current: true,
        highlights: [
          "Modelagem de regras de negócio dos setores jurídico e de cobrança: fluxos de fila, transições de status e apuração de honorários.",
          "Automação de processos antes manuais, reduzindo trabalho operacional da equipe.",
          "Integrações e módulos sob medida em sistemas PHP com Laminas e Laravel.",
        ],
        tech: ["PHP", "Laminas", "Laravel", "MySQL", "Docker"],
      },
      {
        period: "jan 2023 — jan 2025",
        role: "Assistente Técnico de Desenvolvimento de Software",
        highlights: [
          "Evolução e manutenção dos sistemas internos que sustentam a operação jurídica.",
          "Desenvolvimento de novas funcionalidades e correção de bugs em produção.",
          "Primeiras integrações e módulos sob medida para a operação.",
        ],
        tech: ["PHP", "Laminas", "MySQL", "Git"],
      },
      {
        period: "dez 2021 — dez 2022",
        role: "Estagiário de Desenvolvimento",
        highlights: [
          "Primeiros passos no desenvolvimento profissional, apoiando os projetos internos da equipe.",
          "Correções e pequenas features sob orientação, consolidando fundamentos de PHP e SQL.",
        ],
        tech: ["PHP", "MySQL", "Git"],
      },
    ],
  },
];

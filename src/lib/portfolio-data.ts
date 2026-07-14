import projectsData from "@/data/projects.generated.json";

export const profile = {
  name: "Iago Rivelo",
  role: "Analista de Desenvolvimento de Software",
  location: "Recife, Pernambuco",
  company: "Grupo ABRAZ",
  github: "https://github.com/iagorivelo",
  linkedin: "https://www.linkedin.com/in/iagorivelo/",
  email: "iago.rivelo@gmail.com",
  avatar: "/avatar.jpg",
  bio: "Analista de Desenvolvimento de Software — PHP · Laminas · TypeScript · React · Next.js",
  since: "2021",
};

export type ProjectType = "app" | "biblioteca" | "tool";

export type Project = {
  name: string;
  title: string;

  description: string;

  longDescription?: string;

  highlights?: string[];

  screenshots?: string[];
  language: string;
  stack: string[];
  type: ProjectType;

  repo?: string;
  demo?: string;
  stars: number;
  featured?: boolean;

  archived?: boolean;

  pushedAt?: string;
};

export type CaptureShot = {
  path?: string;

  click?: string;

  fill?: string;

  submit?: boolean;

  label?: string;
};

export type CuratedProject = Omit<Project, "stars" | "archived" | "pushedAt"> & {
  shots?: CaptureShot[];
};

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

  current?: boolean;

  highlights: string[];

  tech: string[];
};

export type Experience = {
  company: string;

  period: string;

  roles: ExperienceRole[];
};

export const experience: Experience[] = [
  {
    company: "Grupo ABRAZ",
    period: "dez 2021 - atual",
    roles: [
      {
        period: "jan 2025 - atual",
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
        period: "jan 2023 - jan 2025",
        role: "Assistente Técnico de Desenvolvimento de Software",
        highlights: [
          "Evolução e manutenção dos sistemas internos que sustentam a operação jurídica.",
          "Desenvolvimento de novas funcionalidades e correção de bugs em produção.",
          "Primeiras integrações e módulos sob medida para a operação.",
        ],
        tech: ["PHP", "Laminas", "MySQL", "Git"],
      },
      {
        period: "dez 2021 - dez 2022",
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

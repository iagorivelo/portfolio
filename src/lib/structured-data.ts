import { profile, projects, type Project } from "@/lib/portfolio-data";
import { siteUrl } from "@/lib/site";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  jobTitle: profile.role,
  description: profile.bio,
  url: siteUrl,
  image: `${siteUrl}${profile.avatar}`,
  email: `mailto:${profile.email}`,
  sameAs: [profile.github, profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pernambuco",
    addressCountry: "BR",
  },
  worksFor: {
    "@type": "Organization",
    name: profile.company,
  },
  knowsAbout: [
    "PHP",
    "Laminas",
    "Laravel",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MySQL",
    "SQLite",
    "Docker",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: `${profile.name} — Portfólio`,
  inLanguage: "pt-BR",
  publisher: { "@id": personId },
};

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

export function webPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}${path || "/"}#webpage`,
    url: `${siteUrl}${path}`,
    name,
    description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
  };
}

export function profilePageSchema({ description }: { description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/about#profilepage`,
    url: `${siteUrl}/about`,
    name: `Sobre — ${profile.name}`,
    description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.longDescription ?? project.description,
    ...(project.repo ? { codeRepository: project.repo } : {}),
    programmingLanguage: project.language,
    keywords: project.stack.join(", "),
    author: { "@id": personId },
    ...(project.demo ? { url: project.demo } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export const projectsItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Projetos de ${profile.name}`,
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareSourceCode",
      name: project.title,
      description: project.description,
      ...(project.repo ? { codeRepository: project.repo } : {}),
      programmingLanguage: project.language,
      ...(project.demo ? { url: project.demo } : {}),
    },
  })),
};

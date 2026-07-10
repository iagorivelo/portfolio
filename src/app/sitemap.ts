import type { MetadataRoute } from "next";

import { projects } from "@/lib/portfolio-data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];

  const projectRoutes = projects.map((project) => ({
    path: `/projects/${project.name}`,
    priority: 0.6,
    // Data real do último push do repositório (preenchida pelo sync), quando existir.
    lastModified: project.pushedAt ? new Date(project.pushedAt) : lastModified,
  }));

  return [...staticRoutes.map((route) => ({ ...route, lastModified })), ...projectRoutes].map(
    ({ path, priority, lastModified: modified }) => ({
      url: `${siteUrl}${path}`,
      lastModified: modified,
      changeFrequency: "monthly" as const,
      priority,
    }),
  );
}

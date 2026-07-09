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
  }));

  return [...staticRoutes, ...projectRoutes].map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}

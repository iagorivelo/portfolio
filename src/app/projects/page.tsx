import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { projectsItemListSchema, webPageSchema } from "@/lib/structured-data";
import { ProjectsClient } from "./projects-client";
import { ProjectsSkeleton } from "./projects-skeleton";

const description =
  "Projetos open-source de Iago Rivelo: Next.js, React, TypeScript, PHP e mais. Filtre por stack e tipo (app, biblioteca, tool).";

export const metadata: Metadata = {
  title: "Projetos",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projetos — Iago Rivelo",
    description:
      "Repositórios e demos ao vivo dos projetos open-source de Iago Rivelo, com filtros por stack e tipo.",
    type: "website",
    url: "/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos — Iago Rivelo",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={webPageSchema({ path: "/projects", name: "Projetos — Iago Rivelo", description })}
      />
      <JsonLd data={projectsItemListSchema} />

      <SiteNav />

      <main id="conteudo">
        <section className="mx-auto max-w-6xl px-6 pt-20 pb-10">
          <div className="text-mono text-xs text-accent-lime mb-4">work</div>
          <h1 className="text-display text-5xl md:text-7xl mb-6">
            Projetos <span className="italic">selecionados</span>.
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Um recorte do que construí publicamente. Cada projeto reflete uma investigação técnica —
            desde Server Components em Next.js até fundamentos de I/O em PHP puro.
          </p>
        </section>

        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsClient />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  );
}

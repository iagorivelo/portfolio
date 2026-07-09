import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Archive, ArrowLeft, ArrowRight, ArrowUpRight, Check, Github, Star } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { getProjectBySlug, projects, type Project } from "@/lib/portfolio-data";
import { ogImage } from "@/lib/site";
import { breadcrumbSchema, projectSchema, webPageSchema } from "@/lib/structured-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.name }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  const description = project.longDescription ?? project.description;
  const path = `/projects/${project.name}`;

  return {
    title: project.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${project.title} — Iago Rivelo`,
      description,
      type: "article",
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Iago Rivelo`,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const index = projects.findIndex((p) => p.name === project.name);
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  const path = `/projects/${project.name}`;

  return (
    <div className="min-h-screen">
      <JsonLd
        data={webPageSchema({
          path,
          name: `${project.title} — Iago Rivelo`,
          description: project.longDescription ?? project.description,
        })}
      />
      <JsonLd data={projectSchema(project)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Início", path: "/" },
          { name: "Projetos", path: "/projects" },
          { name: project.title, path },
        ])}
      />

      <SiteNav />

      <article className="mx-auto max-w-5xl px-6 pt-12 pb-24">
        {/* Breadcrumb */}
        <nav aria-label="Trilha de navegação" className="text-mono text-xs text-muted-foreground mb-8">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-accent-lime transition-colors">
                início
              </Link>
            </li>
            <li aria-hidden className="opacity-40">
              /
            </li>
            <li>
              <Link href="/projects" className="hover:text-accent-lime transition-colors">
                projetos
              </Link>
            </li>
            <li aria-hidden className="opacity-40">
              /
            </li>
            <li className="text-foreground">{project.title.toLowerCase()}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-mono text-[11px] px-2 py-0.5 rounded-full bg-accent-lime/10 text-accent-lime border border-accent-lime/20">
              {project.language}
            </span>
            <span className="text-mono text-[11px] px-2 py-0.5 rounded-full bg-surface-elevated text-muted-foreground border border-border/60">
              {project.type}
            </span>
            {project.archived && (
              <span className="inline-flex items-center gap-1 text-mono text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Archive className="h-3 w-3" /> arquivado
              </span>
            )}
            {project.stars > 0 && (
              <span className="inline-flex items-center gap-1 text-mono text-[11px] text-muted-foreground">
                <Star className="h-3 w-3" /> {project.stars}
              </span>
            )}
          </div>

          <h1 className="text-display text-5xl md:text-7xl mb-6">{project.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {project.longDescription ?? project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-accent-lime hover:text-accent-lime transition-colors"
              >
                <Github className="h-4 w-4" />
                Ver código
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:gap-3"
              >
                Ver demo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            )}
          </div>
        </header>

        {/* Screenshots */}
        <section className="mb-12">
          <div className="text-mono text-xs text-accent-lime mb-4">preview</div>
          <ProjectScreenshots project={project} />
        </section>

        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16">
          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <section>
              <div className="text-mono text-xs text-accent-lime mb-4">destaques</div>
              <ul className="space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-[15px] text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Stack */}
          <aside className="md:min-w-56">
            <div className="text-mono text-xs text-accent-lime mb-4">stack</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-mono text-[11px] px-2.5 py-1 rounded-md bg-surface-elevated border border-border/60 text-muted-foreground cursor-default transition-all duration-200 ease-out hover:scale-110 hover:bg-accent-lime/10 hover:border-accent-lime/50 hover:text-accent-lime hover:shadow-[0_0_12px_-2px_var(--color-accent-lime)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {/* Prev / Next */}
        <nav
          aria-label="Navegação entre projetos"
          className="mt-16 pt-8 border-t border-border/40 grid gap-4 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.name}`}
              className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-5 hover:border-accent-lime/40 transition-all"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-accent-lime transition-colors" />
              <span>
                <span className="block text-mono text-[11px] text-muted-foreground">anterior</span>
                <span className="block font-medium">{previous.title}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/projects/${next.name}`}
              className="group flex items-center justify-end gap-3 rounded-xl border border-border bg-surface p-5 text-right hover:border-accent-lime/40 transition-all sm:col-start-2"
            >
              <span>
                <span className="block text-mono text-[11px] text-muted-foreground">próximo</span>
                <span className="block font-medium">{next.title}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent-lime transition-colors" />
            </Link>
          )}
        </nav>
      </article>

      <SiteFooter />
    </div>
  );
}

function ProjectScreenshots({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];

  if (shots.length > 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {shots.map((src, i) => (
          <BrowserFrame key={src} url={project.demo}>
            <div className="relative aspect-video">
              <Image
                src={src}
                alt={`${project.title} — captura de tela ${i + 1}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </BrowserFrame>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[0, 1].map((i) => (
        <BrowserFrame key={i} url={project.demo}>
          <div className="relative aspect-video flex flex-col items-center justify-center gap-2 overflow-hidden">
            <div className="absolute inset-0 grid-noise opacity-40 pointer-events-none" />
            <span className="text-mono text-xs text-accent-lime">{project.title.toLowerCase()}</span>
            <span className="text-xs text-muted-foreground">prévia em breve</span>
          </div>
        </BrowserFrame>
      ))}
    </div>
  );
}

function BrowserFrame({ url, children }: { url?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border/60 bg-surface-elevated px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        {url && (
          <span className="ml-2 truncate text-mono text-[11px] text-muted-foreground">
            {url.replace(/^https?:\/\//, "")}
          </span>
        )}
      </div>
      <div className="bg-background">{children}</div>
    </div>
  );
}

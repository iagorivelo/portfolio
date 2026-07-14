"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Archive, ArrowRight, ArrowUpRight, Github, Search, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { projects, type ProjectType } from "@/lib/portfolio-data";

const TYPES: { value: ProjectType | "all"; label: string }[] = [
  { value: "all", label: "todos" },
  { value: "app", label: "app" },
  { value: "biblioteca", label: "biblioteca" },
  { value: "tool", label: "tool" },
];

export function ProjectsClient() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const rawType = searchParams.get("type");
  const type = TYPES.some((t) => t.value === rawType) ? (rawType as ProjectType | "all") : "all";
  const activeStacks = useMemo(
    () => searchParams.get("stack")?.split(",").filter(Boolean) ?? [],
    [searchParams],
  );
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  const commit = (updates: { q?: string; type?: ProjectType | "all"; stack?: string[] }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (updates.q !== undefined) {
      if (updates.q) params.set("q", updates.q);
      else params.delete("q");
    }
    if (updates.type !== undefined) {
      if (updates.type !== "all") params.set("type", updates.type);
      else params.delete("type");
    }
    if (updates.stack !== undefined) {
      if (updates.stack.length) params.set("stack", updates.stack.join(","));
      else params.delete("stack");
    }
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  const handleQuery = (value: string) => {
    setQuery(value);
    commit({ q: value });
  };

  const toggleStack = (stack: string) => {
    const nextStacks = activeStacks.includes(stack)
      ? activeStacks.filter((s) => s !== stack)
      : [...activeStacks, stack];
    commit({ stack: nextStacks });
  };

  const clearAll = () => {
    setQuery("");
    window.history.replaceState(null, "", pathname);
  };

  const allStacks = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.stack.forEach((s) => set.add(s)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (activeStacks.length && !activeStacks.every((s) => p.stack.includes(s))) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.language.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [query, type, activeStacks]);

  const hasFilters = Boolean(query) || type !== "all" || activeStacks.length > 0;

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="rounded-xl border border-border bg-surface p-5 md:p-6 space-y-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQuery(e.target.value)}
              placeholder="Buscar por nome, descrição ou tecnologia..."
              aria-label="Buscar projetos"
              className="w-full bg-surface-elevated border border-border/60 rounded-md pl-10 pr-10 py-2.5 text-sm outline-none focus:border-accent-neon/60 transition-colors placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => handleQuery("")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div>
            <div className="text-mono text-[11px] text-muted-foreground mb-2">tipo</div>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => {
                const active = type === t.value;
                return (
                  <button
                    key={t.value}
                    onClick={() => commit({ type: t.value })}
                    className={`text-mono text-xs px-3 py-1.5 rounded-md border transition-colors ${
                      active
                        ? "bg-accent-neon/10 border-accent-neon/40 text-accent-neon"
                        : "border-border hover:border-accent-neon/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-mono text-[11px] text-muted-foreground mb-2">stack</div>
            <div className="flex flex-wrap gap-2">
              {allStacks.map((s) => {
                const active = activeStacks.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleStack(s)}
                    className={`text-mono text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                      active
                        ? "bg-accent-neon/10 border-accent-neon/40 text-accent-neon"
                        : "border-border/60 bg-surface-elevated text-muted-foreground hover:text-foreground hover:border-accent-neon/30"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-mono text-xs text-muted-foreground">
            <span>
              <span className="text-accent-neon">{filtered.length}</span> de {projects.length}{" "}
              projeto
              {projects.length === 1 ? "" : "s"}
            </span>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="text-muted-foreground hover:text-accent-neon transition-colors"
              >
                limpar filtros
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <div className="text-mono text-xs text-accent-neon mb-2">no matches</div>
            <p className="text-sm text-muted-foreground">
              Nenhum projeto encontrado com esses filtros.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {filtered.map((p) => (
              <article
                key={p.name}
                className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-accent-neon/40 transition-all"
              >
                <div className="grid md:grid-cols-[240px_1fr]">
                  <Link
                    href={`/projects/${p.name}`}
                    aria-label={`Ver ${p.title}`}
                    className="relative aspect-video md:aspect-auto md:min-h-[190px] overflow-hidden border-b md:border-b-0 md:border-r border-border/60"
                  >
                    {p.screenshots?.[0] ? (
                      <Image
                        src={p.screenshots[0]}
                        alt={`Preview de ${p.title}`}
                        fill
                        sizes="(min-width: 768px) 240px, 100vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center grid-noise opacity-60">
                        <span className="text-mono text-xs text-accent-neon relative">
                          {p.name}
                        </span>
                      </span>
                    )}
                  </Link>

                  <div className="p-6 md:p-7 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <h2 className="text-xl md:text-2xl font-medium mr-1">
                        <Link
                          href={`/projects/${p.name}`}
                          className="hover:text-accent-neon transition-colors"
                        >
                          {p.title}
                        </Link>
                      </h2>
                      <span className="text-mono text-[11px] px-2 py-0.5 rounded-full bg-accent-neon/10 text-accent-neon border border-accent-neon/20">
                        {p.language}
                      </span>
                      <span className="text-mono text-[11px] px-2 py-0.5 rounded-full bg-surface-elevated text-muted-foreground border border-border/60">
                        {p.type}
                      </span>
                      {p.archived && (
                        <span className="inline-flex items-center gap-1 text-mono text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          <Archive className="h-3 w-3" /> arquivado
                        </span>
                      )}
                      {p.stars > 0 && (
                        <span className="inline-flex items-center gap-1 text-mono text-[11px] text-muted-foreground">
                          <Star className="h-3 w-3" /> {p.stars}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.stack.map((s) => (
                        <button
                          key={s}
                          onClick={() => toggleStack(s)}
                          className={`text-mono text-[11px] px-2 py-1 rounded-md transition-colors ${
                            activeStacks.includes(s)
                              ? "bg-accent-neon/10 text-accent-neon border border-accent-neon/30"
                              : "bg-surface-elevated text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2">
                      <Link
                        href={`/projects/${p.name}`}
                        className="group/btn inline-flex items-center gap-1.5 text-mono text-xs px-3 py-2 rounded-md border border-accent-neon/40 text-accent-neon hover:bg-accent-neon/10 transition-colors active:scale-95"
                      >
                        detalhes
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-mono text-xs px-3 py-2 rounded-md border border-border hover:border-accent-neon hover:text-accent-neon transition-colors active:scale-95"
                        >
                          <Github className="h-3.5 w-3.5" />
                          código
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-mono text-xs px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity active:scale-95"
                        >
                          demo
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

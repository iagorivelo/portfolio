import Link from "next/link";
import { ArrowUpRight, Github, MapPin } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { profile, projects, skills } from "@/lib/portfolio-data";
import { webPageSchema } from "@/lib/structured-data";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="min-h-screen">
      <JsonLd
        data={webPageSchema({
          path: "",
          name: "Iago Rivelo — Software Developer",
          description:
            "Portfólio de Iago Rivelo, Software Developer full-stack em Pernambuco. PHP, JavaScript, Node.js, React e Next.js.",
        })}
      />
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-noise opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-32 relative">
          <div className="text-mono text-xs text-accent-lime mb-6 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-lime animate-pulse" />
            disponível para novos projetos
          </div>

          <h1 className="text-display text-6xl md:text-8xl lg:text-9xl">
            Iago
            <br />
            <span className="italic text-accent-lime">Rivelo.</span>
          </h1>

          <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Software Developer full-stack construindo experiências web robustas com{" "}
              <span className="text-foreground">React</span>,{" "}
              <span className="text-foreground">Next.js</span>,{" "}
              <span className="text-foreground">Node.js</span> e{" "}
              <span className="text-foreground">PHP/Laminas</span>. Foco em código limpo,
              performance e interfaces que fazem sentido.
            </p>
            <div className="flex flex-col gap-2 text-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-accent-lime" />
                {profile.location}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-lime">@</span>
                {profile.company}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:gap-3"
            >
              Ver projetos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-accent-lime hover:text-accent-lime transition-colors"
            >
              Sobre mim
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-accent-lime hover:text-accent-lime transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* STACK STRIP */}
      <section className="border-y border-border/40 bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-mono text-xs text-muted-foreground">
          <span className="text-accent-lime">stack ~</span>
          {["TypeScript", "React", "Next.js", "Node.js", "PHP", "Laminas", "Python", "SQL", "Tailwind"].map(
            (s) => (
              <span key={s} className="hover:text-foreground transition-colors">
                {s}
              </span>
            ),
          )}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-mono text-xs text-accent-lime mb-2">01. trabalhos selecionados</div>
            <h2 className="text-display text-4xl md:text-5xl">Projetos em destaque</h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex text-mono text-xs text-muted-foreground hover:text-accent-lime items-center gap-1"
          >
            todos os projetos <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Link
              key={p.name}
              href={`/projects/${p.name}`}
              className="group relative rounded-xl border border-border bg-surface p-6 md:p-8 hover:border-accent-lime/40 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-mono text-xs text-muted-foreground">
                  0{i + 1} / {String(featured.length).padStart(2, "0")}
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-lime group-hover:rotate-45 transition-all" />
              </div>
              <h3 className="text-2xl font-medium mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-mono text-[11px] px-2 py-1 rounded-md bg-surface-elevated text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12">
          <div className="text-mono text-xs text-accent-lime mb-2">02. capacidades</div>
          <h2 className="text-display text-4xl md:text-5xl">O que eu uso todo dia</h2>
        </div>
        <div className="grid gap-px bg-border rounded-xl overflow-hidden md:grid-cols-2 lg:grid-cols-5">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="bg-surface p-6">
              <div className="text-mono text-xs text-accent-lime mb-4">{category}</div>
              <ul className="space-y-2">
                {items.map((it) => (
                  <li key={it} className="text-sm text-foreground/90">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-2xl border border-border bg-surface p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-noise opacity-30 pointer-events-none" />
          <div className="relative">
            <div className="text-mono text-xs text-accent-lime mb-4">03. próximo passo</div>
            <h2 className="text-display text-4xl md:text-6xl mb-6">
              Vamos construir <span className="italic">algo bom</span>.
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Aberto a oportunidades, colaborações open-source e conversas técnicas.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Entrar em contato <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { SpotlightCard } from "@/components/spotlight-card";
import { JsonLd } from "@/components/json-ld";
import { profile, projects, skills } from "@/lib/portfolio-data";
import { webPageSchema } from "@/lib/structured-data";

const STACK_STRIP = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PHP",
  "Laminas",
  "Laravel",
  "MySQL",
  "Docker",
  "Tailwind",
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const [lead, ...rest] = featured;

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

      <main id="conteudo">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-noise opacity-40 pointer-events-none" />
          <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-24 md:pb-28 relative">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
              <div>
                <div
                  className="rise text-mono text-xs text-accent-neon mb-7 inline-flex items-center gap-2.5 rounded-full border border-accent-neon/30 bg-accent-neon/5 px-3 py-1.5"
                  style={{ "--d": "0ms" } as React.CSSProperties}
                >
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent-neon" />
                  disponível para novos projetos
                </div>

                <h1
                  className="rise text-display-lg text-6xl sm:text-7xl lg:text-8xl"
                  style={{ "--d": "80ms" } as React.CSSProperties}
                >
                  Iago
                  <br />
                  <span className="text-accent-neon">Rivelo.</span>
                </h1>

                <p
                  className="rise mt-8 text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
                  style={{ "--d": "160ms" } as React.CSSProperties}
                >
                  Software Developer full-stack em {profile.location.split(",")[0]}. Construo web
                  apps com <span className="text-foreground">React</span>,{" "}
                  <span className="text-foreground">Next.js</span>,{" "}
                  <span className="text-foreground">Node.js</span> e{" "}
                  <span className="text-foreground">PHP</span>, com foco em código limpo e
                  performance.
                </p>

                <div
                  className="rise mt-9 flex flex-wrap items-center gap-3"
                  style={{ "--d": "240ms" } as React.CSSProperties}
                >
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:gap-3 active:scale-[0.98]"
                  >
                    Ver projetos
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-accent-neon hover:text-accent-neon transition-colors active:scale-[0.98]"
                  >
                    Sobre mim
                  </Link>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-border text-muted-foreground hover:border-accent-neon hover:text-accent-neon transition-colors active:scale-95"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {lead && (
                <div
                  className="rise relative hidden sm:block"
                  style={{ "--d": "320ms" } as React.CSSProperties}
                >
                  <div className="absolute -inset-6 rounded-3xl bg-accent-neon/10 blur-3xl pointer-events-none" />
                  {rest[0]?.screenshots?.[0] && (
                    <HeroFrame
                      className="absolute -right-2 top-6 w-[78%] rotate-3 opacity-70 blur-[1px]"
                      src={rest[0].screenshots[0]}
                      alt=""
                      priority={false}
                    />
                  )}
                  <Link
                    href={`/projects/${lead.name}`}
                    className="group relative block transition-transform duration-500 hover:-translate-y-1 -rotate-1 hover:rotate-0"
                    aria-label={`Ver projeto ${lead.title}`}
                  >
                    {lead.screenshots?.[0] && (
                      <HeroFrame
                        src={lead.screenshots[0]}
                        alt={`Preview do projeto ${lead.title}`}
                        url={lead.demo}
                        priority
                        className="shadow-2xl shadow-black/20"
                      />
                    )}
                    <span className="mt-3 flex items-center justify-between text-mono text-xs text-muted-foreground">
                      <span>
                        <span className="text-accent-neon">↳</span> {lead.title.toLowerCase()}
                      </span>
                      <span className="inline-flex items-center gap-1 group-hover:text-accent-neon transition-colors">
                        ver projeto
                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:rotate-45" />
                      </span>
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          aria-label="Tecnologias que uso"
          className="border-y border-border/40 bg-surface/40 overflow-hidden"
        >
          <div className="flex items-center py-5">
            <span className="text-mono text-xs text-accent-neon px-6 shrink-0">stack ~</span>
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div className="stack-marquee">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    aria-hidden={copy === 1 || undefined}
                    className="stack-marquee-group text-mono text-sm text-muted-foreground"
                  >
                    {Array.from({ length: 3 }).flatMap((_, r) =>
                      STACK_STRIP.map((s) => (
                        <span key={`${r}-${s}`} className="shrink-0">
                          {s}
                        </span>
                      )),
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <h2 className="text-display text-4xl md:text-5xl max-w-md">
              Trabalhos que mostram <span className="text-accent-neon">como eu penso</span>
            </h2>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-mono text-xs text-muted-foreground hover:text-accent-neon transition-colors"
            >
              todos os projetos
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {lead && (
              <SpotlightCard
                href={`/projects/${lead.name}`}
                className="reveal group block rounded-2xl border border-border bg-surface overflow-hidden hover:border-accent-neon/40 md:col-span-2"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px] overflow-hidden border-b border-border/60 md:border-b-0 md:border-r">
                    {lead.screenshots?.[0] ? (
                      <Image
                        src={lead.screenshots[0]}
                        alt={`Preview do projeto ${lead.title}`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <PreviewFallback title={lead.title} />
                    )}
                  </div>
                  <div className="p-7 md:p-9 flex flex-col">
                    <div className="flex items-center gap-2 mb-5 text-mono text-[11px]">
                      <span className="rounded-full bg-accent-neon/10 text-accent-neon border border-accent-neon/20 px-2 py-0.5">
                        em destaque
                      </span>
                      <span className="text-muted-foreground">{lead.language}</span>
                    </div>
                    <h3 className="text-display text-2xl md:text-3xl mb-3">{lead.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {lead.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {lead.stack.slice(0, 5).map((s) => (
                        <span
                          key={s}
                          className="text-mono text-[11px] px-2 py-1 rounded-md bg-surface-elevated text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent-neon transition-colors">
                      Explorar projeto
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            )}

            {rest.map((p) => (
              <SpotlightCard
                key={p.name}
                href={`/projects/${p.name}`}
                className="reveal group block rounded-2xl border border-border bg-surface overflow-hidden hover:border-accent-neon/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60">
                  {p.screenshots?.[0] ? (
                    <Image
                      src={p.screenshots[0]}
                      alt={`Preview do projeto ${p.title}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <PreviewFallback title={p.title} />
                  )}
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-display text-xl">{p.title}</h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-neon group-hover:rotate-45 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="text-mono text-[11px] px-2 py-1 rounded-md bg-surface-elevated text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
            <div className="reveal lg:sticky lg:top-24">
              <div className="text-mono text-xs text-accent-neon mb-4">o que eu uso</div>
              <h2 className="text-display text-4xl md:text-5xl mb-5">Ferramentas do dia a dia</h2>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                Do banco de dados à interface. A stack que uso para levar uma ideia de zero até
                produção.
              </p>
            </div>

            <div className="reveal rounded-2xl border border-border bg-surface divide-y divide-border/60">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="grid sm:grid-cols-[130px_1fr] gap-3 sm:gap-6 p-6 hover:bg-surface-elevated/40 transition-colors"
                >
                  <div className="text-mono text-xs text-accent-neon pt-1">{category}</div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((it) => (
                      <span
                        key={it}
                        className="text-sm px-2.5 py-1 rounded-md bg-surface-elevated border border-border/60 text-foreground/90 hover:border-accent-neon/40 hover:text-accent-neon transition-colors"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="reveal relative rounded-3xl border border-accent-neon/20 bg-surface p-10 md:p-16 overflow-hidden">
            <div className="absolute inset-0 grid-noise opacity-30 pointer-events-none" />
            <div
              className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-accent-neon/10 blur-3xl pointer-events-none"
              aria-hidden
            />
            <div className="relative max-w-2xl">
              <h2 className="text-display text-4xl md:text-6xl mb-6">
                Vamos construir <span className="text-accent-neon">algo bom</span>.
              </h2>
              <p className="text-muted-foreground text-lg max-w-lg mb-9">
                Aberto a oportunidades, colaborações open-source e conversas técnicas. Respondo em
                até 48h.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:gap-3 active:scale-[0.98]"
              >
                Entrar em contato
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function HeroFrame({
  src,
  alt,
  url,
  className,
  priority,
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface overflow-hidden ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-surface-elevated px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        {url && (
          <span className="ml-2 truncate text-mono text-[10px] text-muted-foreground">
            {url.replace(/^https?:\/\//, "")}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] bg-background">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 460px, 60vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function PreviewFallback({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden">
      <div className="absolute inset-0 grid-noise opacity-40 pointer-events-none" />
      <span className="text-mono text-xs text-accent-neon">{title.toLowerCase()}</span>
      <span className="text-xs text-muted-foreground">prévia em breve</span>
    </div>
  );
}

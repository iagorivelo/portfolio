import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { profile, experience, skills } from "@/lib/portfolio-data";
import { profilePageSchema } from "@/lib/structured-data";

const description =
  "Sobre Iago Rivelo: trajetória, experiência profissional e stack como Software Developer full-stack.";

export const metadata: Metadata = {
  title: "Sobre",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Sobre — Iago Rivelo",
    description: "Trajetória, experiência e stack de Iago Rivelo, Software Developer.",
    type: "profile",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre — Iago Rivelo",
  },
};

export default function About() {
  return (
    <div className="min-h-screen">
      <JsonLd data={profilePageSchema({ description })} />
      <SiteNav />

      <main id="conteudo">
        <section className="mx-auto max-w-4xl px-6 pt-20 pb-16">
          <div className="text-mono text-xs text-accent-lime mb-4">about me</div>
          <h1 className="text-display text-5xl md:text-7xl mb-10">
            Um pouco <span className="italic">sobre mim</span>.
          </h1>

          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
            <div className="relative">
              <div className="absolute -inset-2 rounded-2xl bg-accent-lime/20 blur-xl" />
              <Image
                src={profile.avatar}
                alt={`Retrato de ${profile.name}`}
                width={160}
                height={160}
                priority
                className="relative w-40 h-40 rounded-2xl object-cover border border-border"
              />
            </div>

            <div className="space-y-5 text-[15px] leading-relaxed text-foreground/90">
              <p>
                Olá! Sou <span className="text-accent-lime">Iago Rivelo</span>, Analista de
                Desenvolvimento de Software baseado em {profile.location}. Minha jornada na
                tecnologia começou em {profile.since} e, desde então, venho evoluindo com um foco
                claro: unir código sólido a processos que resolvem problemas reais de negócio.
              </p>
              <p>
                Atualmente, faço parte do time do{" "}
                <span className="text-foreground">{profile.company}</span>, onde desenvolvo e
                mantenho sistemas internos críticos em PHP (Laminas e Laravel) para os setores
                jurídico e de cobrança. Meu dia a dia vai muito além da tela do editor; atuo
                diretamente na modelagem de regras de negócio — como fluxos de fila, transições de
                status e apuração de honorários — e na automação de processos antes manuais, criando
                integrações e módulos sob medida que dão tração à operação da empresa.
              </p>
              <p>
                Nos projetos pessoais e open-source, uso o tempo para explorar o que não cabe no dia
                a dia. No back-end, estudo arquitetura e bancos de dados (SQLite e MySQL) — cheguei
                a escrever meu próprio query builder em PHP. No ecossistema JavaScript, construo
                aplicações com React 19, Next.js (Server Components e Server Actions) e TypeScript
                estrito.
              </p>
              <p>
                Gosto de trabalhar perto do produto: entender o problema antes de escrever código
                costuma valer mais do que qualquer framework — é o que faz uma solução envelhecer
                bem. É também por isso que sigo estudando fundamentos, da modelagem de dados ao
                design de interface.
              </p>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-mono text-xs text-accent-lime mb-2">experiência</div>
          <h2 className="text-display text-3xl md:text-4xl mb-10">Trajetória</h2>

          <div className="space-y-12">
            {experience.map((exp) => (
              <div key={exp.company}>
                {/* Cabeçalho da empresa */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-8">
                  <h3 className="text-xl md:text-2xl font-medium">{exp.company}</h3>
                  <span className="text-mono text-xs text-muted-foreground">{exp.period}</span>
                </div>

                {/* Régua de progressão dos cargos */}
                <ol className="relative border-l border-border/60 ml-1.5 space-y-10">
                  {exp.roles.map((role) => (
                    <li key={role.role} className="relative pl-8">
                      {/* Marcador */}
                      <span
                        className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 ${
                          role.current
                            ? "bg-accent-lime border-accent-lime shadow-[0_0_10px_-1px_var(--color-accent-lime)]"
                            : "bg-background border-border"
                        }`}
                        aria-hidden
                      />

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="text-base md:text-lg font-medium">{role.role}</h4>
                        {role.current && (
                          <span className="text-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-accent-lime/10 text-accent-lime border border-accent-lime/30">
                            atual
                          </span>
                        )}
                      </div>
                      <div className="text-mono text-xs text-muted-foreground mt-1 mb-3">
                        {role.period}
                      </div>

                      <ul className="space-y-1.5 mb-4">
                        {role.highlights.map((h) => (
                          <li
                            key={h}
                            className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                          >
                            <span className="text-accent-lime mt-1.5 shrink-0 h-1 w-1 rounded-full bg-accent-lime" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {role.tech.map((t) => (
                          <span
                            key={t}
                            className="text-mono text-[11px] px-2 py-0.5 rounded-md bg-surface-elevated border border-border/60 text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="text-mono text-xs text-accent-lime mb-2">toolbox</div>
          <h2 className="text-display text-3xl md:text-4xl mb-10">Stack &amp; ferramentas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="rounded-xl border border-border bg-surface p-6">
                <div className="text-mono text-xs text-accent-lime mb-3">{cat.toLowerCase()}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-md bg-surface-elevated border border-border/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

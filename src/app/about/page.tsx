import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Building2, CalendarDays } from "lucide-react";
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

const quickFacts = [
  { Icon: Building2, label: "atualmente", value: profile.company },
  { Icon: MapPin, label: "base", value: profile.location },
  { Icon: CalendarDays, label: "desde", value: profile.since },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <JsonLd data={profilePageSchema({ description })} />
      <SiteNav />

      <main id="conteudo">
        <section className="mx-auto max-w-5xl px-6 pt-20 pb-16">
          <div className="text-mono text-xs text-accent-neon mb-4">sobre</div>
          <h1 className="text-display-lg text-5xl md:text-7xl mb-12">
            Um pouco <span className="text-accent-neon">sobre mim</span>.
          </h1>

          <div className="grid md:grid-cols-[260px_1fr] gap-10 lg:gap-14 items-start">
            <div className="reveal md:sticky md:top-24">
              <div className="relative w-fit">
                <div className="absolute -inset-3 rounded-3xl bg-accent-neon/20 blur-2xl" />
                <Image
                  src={profile.avatar}
                  alt={`Retrato de ${profile.name}`}
                  width={200}
                  height={200}
                  priority
                  className="relative w-full max-w-[220px] aspect-square rounded-2xl object-cover border border-border"
                />
              </div>

              <dl className="mt-7 space-y-4">
                {quickFacts.map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="h-4 w-4 mt-0.5 text-accent-neon shrink-0" />
                    <div>
                      <dt className="text-mono text-[11px] text-muted-foreground">{label}</dt>
                      <dd className="text-sm text-foreground/90">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-5 text-[15px] md:text-base leading-relaxed text-foreground/90">
              <p>
                Olá! Sou <span className="text-accent-neon">Iago Rivelo</span>, Analista de
                Desenvolvimento de Software baseado em {profile.location}. Minha jornada na
                tecnologia começou em {profile.since} e, desde então, venho evoluindo com um foco
                claro: unir código sólido a processos que resolvem problemas reais de negócio.
              </p>
              <p>
                Atualmente, faço parte do time do{" "}
                <span className="text-foreground">{profile.company}</span>, onde desenvolvo e
                mantenho sistemas internos críticos em PHP (Laminas e Laravel) para os setores
                jurídico e de cobrança. Meu dia a dia vai muito além da tela do editor; atuo
                diretamente na modelagem de regras de negócio, como fluxos de fila, transições de
                status e apuração de honorários, e na automação de processos antes manuais, criando
                integrações e módulos sob medida que dão tração à operação da empresa.
              </p>
              <p>
                Nos projetos pessoais e open-source, uso o tempo para explorar o que não cabe no dia
                a dia. No back-end, estudo arquitetura e bancos de dados (SQLite e MySQL); cheguei a
                escrever meu próprio query builder em PHP. No ecossistema JavaScript, construo
                aplicações com React 19, Next.js (Server Components e Server Actions) e TypeScript
                estrito.
              </p>
              <p>
                Gosto de trabalhar perto do produto: entender o problema antes de escrever código
                costuma valer mais do que qualquer framework. É o que faz uma solução envelhecer bem
                e por isso sigo estudando fundamentos, da modelagem de dados ao design de interface.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="reveal text-display text-3xl md:text-4xl mb-10">Trajetória</h2>

          <div className="space-y-12">
            {experience.map((exp) => (
              <div key={exp.company} className="reveal">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-8">
                  <h3 className="text-xl md:text-2xl font-medium">{exp.company}</h3>
                  <span className="text-mono text-xs text-muted-foreground">{exp.period}</span>
                </div>

                <ol className="relative border-l border-border/60 ml-1.5 space-y-10">
                  {exp.roles.map((role) => (
                    <li key={role.role} className="relative pl-8">
                      <span
                        className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 ${
                          role.current
                            ? "bg-accent-neon border-accent-neon shadow-[0_0_10px_-1px_var(--color-accent-neon)]"
                            : "bg-background border-border"
                        }`}
                        aria-hidden
                      />

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="text-base md:text-lg font-medium">{role.role}</h4>
                        {role.current && (
                          <span className="text-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-accent-neon/10 text-accent-neon border border-accent-neon/30">
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
                            <span className="text-accent-neon mt-1.5 shrink-0 h-1 w-1 rounded-full bg-accent-neon" />
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

        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="reveal text-display text-3xl md:text-4xl mb-10">
            Stack &amp; ferramentas
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {Object.entries(skills).map(([cat, items]) => (
              <div
                key={cat}
                className="reveal rounded-2xl border border-border bg-surface p-6 hover:border-accent-neon/40 hover:-translate-y-0.5 transition-all"
              >
                <div className="text-mono text-xs text-accent-neon mb-4">{cat.toLowerCase()}</div>
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

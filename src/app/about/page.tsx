import type { Metadata } from "next";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { profile, timeline, skills } from "@/lib/portfolio-data";
import { ogImage } from "@/lib/site";
import { webPageSchema } from "@/lib/structured-data";

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
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre — Iago Rivelo",
    images: [ogImage],
  },
};

export default function About() {
  return (
    <div className="min-h-screen">
      <JsonLd data={webPageSchema({ path: "/about", name: "Sobre — Iago Rivelo", description })} />
      <SiteNav />

      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16">
        <div className="text-mono text-xs text-accent-lime mb-4">about me</div>
        <h1 className="text-display text-5xl md:text-7xl mb-10">
          Um pouco <span className="italic">sobre mim</span>.
        </h1>

        <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-accent-lime/20 blur-xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatar}
              alt={profile.name}
              className="relative w-40 h-40 rounded-2xl object-cover border border-border"
            />
          </div>

          <div className="space-y-5 text-[15px] leading-relaxed text-foreground/90">
            <p>
              Olá! Sou <span className="text-accent-lime">Iago Rivelo</span>, Analista de
              Desenvolvimento de Software baseado em {profile.location}. Comecei como estagiário em{" "}
              {profile.since} e, desde então, venho evoluindo em direção a soluções cada vez mais
              robustas — hoje unindo código sólido a processos que resolvem problemas reais de
              negócio.
            </p>
            <p>
              Atualmente atuo no <span className="text-foreground">{profile.company}</span>, onde
              desenvolvo e mantenho sistemas internos em PHP (Laminas e Laravel) para os setores
              jurídico e de cobrança — da modelagem de regras de negócio (fluxos de fila, transições
              de status e apuração de honorários) à automação de processos antes manuais, passando
              por integrações e módulos sob medida para a operação.
            </p>
            <p>
              Nos projetos pessoais e open-source, exploro diferentes camadas do desenvolvimento:
              back-ends em PHP com persistência em SQLite e MySQL — incluindo um query builder
              próprio — e aplicações web no ecossistema JavaScript moderno, com React 19, Next.js
              (Server Components e Server Actions) e TypeScript rigoroso sobre APIs REST bem
              desenhadas.
            </p>
            <p>
              Gosto de trabalhar próximo do produto: entender o problema antes de escrever a primeira
              linha e entregar soluções que envelhecem bem. Fora do editor, estou sempre estudando
              fundamentos — do banco de dados ao design de interface — porque acredito que engenharia
              boa nasce dessa base.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-mono text-xs text-accent-lime mb-2">experiência</div>
        <h2 className="text-display text-3xl md:text-4xl mb-10">Trajetória</h2>

        <div className="space-y-8">
          {timeline.map((t, i) => (
            <div
              key={i}
              className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-8 pb-8 border-b border-border/40 last:border-0"
            >
              <div className="text-mono text-xs text-muted-foreground pt-1">{t.period}</div>
              <div>
                <h3 className="text-lg font-medium">{t.role}</h3>
                <div className="text-sm text-accent-lime mb-2">{t.company}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
              </div>
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

      <SiteFooter />
    </div>
  );
}

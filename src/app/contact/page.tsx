import type { Metadata } from "next";
import { ArrowUpRight, Building2, FileDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/site-nav";
import { JsonLd } from "@/components/json-ld";
import { profile } from "@/lib/portfolio-data";
import { webPageSchema } from "@/lib/structured-data";

const description =
  "Entre em contato com Iago Rivelo para projetos, colaborações ou conversas técnicas.";

export const metadata: Metadata = {
  title: "Contato",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contato — Iago Rivelo",
    description: "Fale com Iago Rivelo sobre projetos e colaborações.",
    type: "website",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato — Iago Rivelo",
  },
};

type Channel = {
  Icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  primary?: boolean;
};

const channels: Channel[] = [
  {
    Icon: Mail,
    label: "e-mail",
    value: profile.email,
    href: `mailto:${profile.email}`,
    primary: true,
  },
  {
    Icon: Linkedin,
    label: "linkedin",
    value: "/in/iagorivelo",
    href: profile.linkedin,
    external: true,
  },
  {
    Icon: Github,
    label: "github",
    value: "@iagorivelo",
    href: profile.github,
    external: true,
  },
  { Icon: FileDown, label: "currículo", value: "Baixar CV (PDF)", href: "/cv.pdf", external: true },
  { Icon: MapPin, label: "localização", value: profile.location },
  { Icon: Building2, label: "atualmente em", value: profile.company },
];

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd
        data={webPageSchema({ path: "/contact", name: "Contato — Iago Rivelo", description })}
      />
      <SiteNav />

      <main id="conteudo" className="flex-1 w-full">
        <section className="mx-auto max-w-5xl px-6 pt-20 pb-24 w-full">
          <div className="text-mono text-xs text-accent-neon mb-4">contato</div>
          <h1 className="text-display-lg text-5xl md:text-7xl mb-8">
            Vamos <span className="text-accent-neon">conversar</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-14">
            Estou aberto a oportunidades full-stack, freelas selecionados e colaborações
            open-source. O caminho mais rápido é o e-mail. Também respondo no LinkedIn.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map(({ Icon, label, value, href, external, primary }) => {
              const cardClass = `reveal group rounded-2xl border p-6 transition-all ${
                primary
                  ? "border-accent-neon/40 bg-accent-neon/[0.04] sm:col-span-2 lg:col-span-1"
                  : "border-border bg-surface"
              } ${href ? "hover:border-accent-neon/40 hover:-translate-y-0.5" : ""}`;

              const inner = (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="h-6 w-6 text-accent-neon" />
                    {href && (
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-neon group-hover:rotate-45 transition-all" />
                    )}
                  </div>
                  <div className="text-mono text-xs text-muted-foreground mb-1">{label}</div>
                  <div className="text-lg font-medium break-words">{value}</div>
                </>
              );

              if (!href) {
                return (
                  <div key={label} className={cardClass}>
                    {inner}
                  </div>
                );
              }

              return (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={cardClass}
                >
                  {inner}
                </a>
              );
            })}
          </div>

          <div className="mt-14 pt-8 border-t border-border/40 flex items-center gap-2.5 text-mono text-xs text-muted-foreground">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent-neon" />
            respondendo mensagens em até 48h
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

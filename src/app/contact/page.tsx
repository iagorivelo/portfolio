import type { Metadata } from "next";
import { ArrowUpRight, Github, MapPin, Building2, FileDown } from "lucide-react";
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

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={webPageSchema({ path: "/contact", name: "Contato — Iago Rivelo", description })} />
      <SiteNav />

      <section className="flex-1 mx-auto max-w-4xl px-6 pt-20 pb-24 w-full">
        <div className="text-mono text-xs text-accent-lime mb-4">get in touch</div>
        <h1 className="text-display text-5xl md:text-7xl mb-8">
          Vamos <span className="italic">conversar</span>.
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-14">
          Estou aberto a oportunidades full-stack, freelas selecionados e colaborações open-source.
          A melhor forma de me alcançar é pelo GitHub.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-border bg-surface p-6 hover:border-accent-lime/40 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <Github className="h-6 w-6 text-accent-lime" />
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-lime group-hover:rotate-45 transition-all" />
            </div>
            <div className="text-mono text-xs text-muted-foreground mb-1">github</div>
            <div className="text-lg font-medium">@iagorivelo</div>
          </a>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-border bg-surface p-6 hover:border-accent-lime/40 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <FileDown className="h-6 w-6 text-accent-lime" />
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-lime group-hover:rotate-45 transition-all" />
            </div>
            <div className="text-mono text-xs text-muted-foreground mb-1">currículo</div>
            <div className="text-lg font-medium">Baixar CV (PDF)</div>
          </a>

          <div className="rounded-xl border border-border bg-surface p-6">
            <MapPin className="h-6 w-6 text-accent-lime mb-4" />
            <div className="text-mono text-xs text-muted-foreground mb-1">localização</div>
            <div className="text-lg font-medium">{profile.location}</div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <Building2 className="h-6 w-6 text-accent-lime mb-4" />
            <div className="text-mono text-xs text-muted-foreground mb-1">atualmente em</div>
            <div className="text-lg font-medium">{profile.company}</div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 text-mono text-xs text-muted-foreground">
          <span className="text-accent-lime">$</span> respondendo mensagens em até 48h
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-lime animate-pulse" />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

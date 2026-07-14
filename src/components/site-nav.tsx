"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { to: "/", label: "início" },
  { to: "/about", label: "sobre" },
  { to: "/projects", label: "projetos" },
  { to: "/contact", label: "contato" },
] as const;

function isActive(pathname: string, to: string) {
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

function Wordmark() {
  return (
    <span className="font-medium tracking-tight">
      <span className="text-mono text-accent-neon">{"{"}</span>
      {profile.name.split(" ")[0].toLowerCase()}
      <span className="text-accent-neon">.</span>dev
      <span className="text-mono text-accent-neon">{"}"}</span>
    </span>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 backdrop-blur-xl bg-background/70">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-20 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="Página inicial" className="group">
          <Wordmark />
        </Link>

        <ul className="hidden md:flex items-center gap-1 text-mono text-[13px]">
          {links.map((l) => {
            const active = isActive(pathname, l.to);
            return (
              <li key={l.to}>
                <Link
                  href={l.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative px-3 py-1.5 rounded-md transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-3 right-3 -bottom-px h-px bg-accent-neon origin-left transition-transform duration-300 ease-out",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden md:inline-flex items-center justify-center h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-accent-neon hover:border-accent-neon/40 transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-accent-neon/40 transition-colors active:scale-95"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-border/40 bg-background/95">
          <ul className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1 text-mono text-sm">
            {links.map((l) => {
              const active = isActive(pathname, l.to);
              return (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-md transition-colors",
                      active
                        ? "text-foreground bg-surface-elevated"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full",
                        active ? "bg-accent-neon" : "bg-border",
                      )}
                    />
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-muted-foreground hover:text-accent-neon transition-colors"
              >
                <Github className="h-4 w-4" />
                github
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const socials = [
    { href: profile.github, label: "GitHub", Icon: Github, external: true },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
    { href: `mailto:${profile.email}`, label: "E-mail", Icon: Mail, external: false },
  ];

  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-3">
          <Link href="/" className="inline-block">
            <Wordmark />
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Software Developer full-stack. Aberto a oportunidades e colaborações.
          </p>
        </div>

        <nav aria-label="Redes e contato" className="flex items-center gap-2">
          {socials.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border text-muted-foreground hover:text-accent-neon hover:border-accent-neon/50 hover:-translate-y-0.5 transition-all"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-mono text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {profile.name}. Feito com Next.js e cuidado.
          </span>
          <span>{profile.location}</span>
        </div>
      </div>
    </footer>
  );
}

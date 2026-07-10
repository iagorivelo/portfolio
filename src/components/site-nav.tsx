"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { to: "/", label: "Início" },
  { to: "/about", label: "Sobre" },
  { to: "/projects", label: "Projetos" },
  { to: "/contact", label: "Contato" },
] as const;

function isActive(pathname: string, to: string) {
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 backdrop-blur-xl bg-background/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-mono text-xs text-accent-lime">{"//"}</span>
          <span className="font-medium tracking-tight">
            {profile.name.split(" ")[0].toLowerCase()}
            <span className="text-accent-lime">.</span>dev
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1 text-mono text-[13px]">
          {links.map((l, i) => {
            const active = isActive(pathname, l.to);
            return (
              <li key={l.to}>
                <Link
                  href={l.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors",
                    active && "text-foreground bg-surface-elevated",
                  )}
                >
                  <span className="text-accent-lime/60 mr-1">0{i + 1}.</span>
                  {l.label}
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
            className="hidden md:inline-flex items-center gap-2 text-mono text-xs px-3 py-1.5 rounded-md border border-border hover:border-accent-lime hover:text-accent-lime transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-accent-lime/40 transition-colors"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-border/40 bg-background/95">
          <ul className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1 text-mono text-sm">
            {links.map((l, i) => {
              const active = isActive(pathname, l.to);
              return (
                <li key={l.to}>
                  <Link
                    href={l.to}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-md text-muted-foreground hover:text-foreground transition-colors",
                      active && "text-foreground bg-surface-elevated",
                    )}
                  >
                    <span className="text-accent-lime/60">0{i + 1}.</span>
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
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-muted-foreground hover:text-accent-lime transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-mono text-xs text-muted-foreground">
        <div>
          <span className="text-accent-lime">$</span> designed &amp; built by{" "}
          {profile.name.toLowerCase()} — {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-lime transition-colors"
          >
            github
          </a>
          <span className="opacity-40">·</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent-lime transition-colors"
          >
            linkedin
          </a>
          <span className="opacity-40">·</span>
          <a href={`mailto:${profile.email}`} className="hover:text-accent-lime transition-colors">
            e-mail
          </a>
          <span className="opacity-40">·</span>
          <span>{profile.location.toLowerCase()}</span>
        </div>
      </div>
    </footer>
  );
}

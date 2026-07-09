"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// Observa a classe `.dark` no <html> como fonte de verdade do tema.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => true; // dark é o padrão da marca durante o SSR

/** Alterna entre claro/escuro adicionando a classe `.dark` no <html>. */
export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage indisponível — só não persiste a preferência
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Tema claro" : "Tema escuro"}
      className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-accent-lime hover:border-accent-lime/40 transition-colors"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

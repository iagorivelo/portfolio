import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site";
import { siteGraph } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Iago Rivelo — Software Developer",
    template: "%s — Iago Rivelo",
  },
  description:
    "Portfólio de Iago Rivelo, Software Developer full-stack em Pernambuco. PHP, JavaScript, Node.js, React e Next.js.",
  authors: [{ name: "Iago Rivelo", url: siteUrl }],
  creator: "Iago Rivelo",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Iago Rivelo — Software Developer",
    description:
      "Full-stack developer especializado em PHP, JavaScript, React e Next.js. Projetos, sobre e contato.",
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Iago Rivelo — Portfólio",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={siteGraph} />
        {children}
      </body>
    </html>
  );
}

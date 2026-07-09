/**
 * Base URL do site, usada em metadataBase, canonical, sitemap, robots e
 * structured data. Consumida apenas no servidor (build/SSG), por isso NÃO usa
 * o prefixo NEXT_PUBLIC_ — a variável não é exposta ao navegador. Defina
 * SITE_URL no ambiente de produção (ex.: https://seu-dominio.com); em dev cai
 * para localhost.
 */
export const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

/**
 * Imagem Open Graph compartilhada. O merge de metadata do Next é raso, então
 * cada página que define `openGraph` precisa reincluir a imagem — reusamos daqui.
 */
export const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 640,
  alt: "Iago Rivelo — Software Developer",
};

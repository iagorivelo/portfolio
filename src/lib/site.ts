/**
 * Base URL do site, usada em metadataBase, canonical, sitemap, robots e
 * structured data. Consumida apenas no servidor (build/SSG), por isso NÃO usa
 * o prefixo NEXT_PUBLIC_ — a variável não é exposta ao navegador. Defina
 * SITE_URL no ambiente de produção (ex.: https://seu-dominio.com); em dev cai
 * para localhost.
 */
export const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

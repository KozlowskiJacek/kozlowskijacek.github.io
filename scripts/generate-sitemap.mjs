// Generuje dist/sitemap.xml z tras (src/data/site.ts → indexableRoutes)
// i slugów opublikowanych projektów (src/data/projects.ts). Uruchamiany po buildzie (postbuild).
// Moduły TS (z importami obrazów) ładuje runnerImport z Vite — bez osobnej kopii listy tras.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { runnerImport } from "vite";

const load = async (id) => (await runnerImport(id, { logLevel: "error" })).module;

const { indexableRoutes, absoluteUrl, siteLanguages, defaultLanguage } = await load("/src/data/site.ts");
const { publishedProjects } = await load("/src/data/projects.ts");
const { caseStudyPath } = await load("/src/data/navigation.ts");

const routes = [...indexableRoutes, ...publishedProjects.map((project) => caseStudyPath(project.slug))];

const escapeXml = (value) =>
  value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);

const alternates = (path) =>
  [...siteLanguages.map((lng) => [lng, absoluteUrl(path, lng)]), ["x-default", absoluteUrl(path, defaultLanguage)]]
    .map(([lng, href]) => `    <xhtml:link rel="alternate" hreflang="${lng}" href="${escapeXml(href)}"/>`)
    .join("\n");

// Każda wersja językowa jako osobny <url> z kompletem alternatyw (zalecenie Google dla hreflang w sitemapie).
const entries = routes.flatMap((path) =>
  siteLanguages.map(
    (lng) => `  <url>
    <loc>${escapeXml(absoluteUrl(path, lng))}</loc>
${alternates(path)}
  </url>`,
  ),
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

const output = resolve("dist/sitemap.xml");
writeFileSync(output, xml);
console.log(`✓ sitemap.xml: ${routes.length} tras × ${siteLanguages.length} języki`);

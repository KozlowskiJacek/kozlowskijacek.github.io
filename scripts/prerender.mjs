// Prerendering tras do statycznego HTML (krok postbuild, po `vite build` i `vite build --ssr`).
// Dla każdej trasy z dist-ssr/entry-server.js (strony statyczne + case studies):
//  - renderuje aplikację przez react-dom/server + StaticRouter (React Router 7),
//  - wstawia HTML do <div id="root"> i tagi z <Seo /> (title, meta, canonical, JSON-LD) do <head>,
//  - zapisuje plik jako dist/<trasa>.html — GitHub Pages serwuje go pod adresem bez ukośnika
//    (/uslugi/web → uslugi/web.html), więc adres zgadza się z canonical i nie ma przekierowania 301.
// dist/404.html zostaje czystym szablonem SPA (fallback GitHub Pages dla nieznanych i starych adresów).
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { PassThrough } from "node:stream";
import { pathToFileURL } from "node:url";

const dist = resolve("dist");
const templatePath = join(dist, "index.html");
const template = readFileSync(templatePath, "utf8");

const { render, routes } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);

/** Zbiera strumień Reacta do stringa. */
const collect = (pipe) =>
  new Promise((done, fail) => {
    const sink = new PassThrough();
    const chunks = [];
    sink.on("data", (chunk) => chunks.push(chunk));
    sink.on("end", () => done(Buffer.concat(chunks).toString("utf8")));
    sink.on("error", fail);
    pipe(sink);
  });

/** Szablon bez domyślnych tagów, które zastąpi <Seo /> (title i opis oznaczony data-rh). */
const baseTemplate = template
  .replace(/<title>[\s\S]*?<\/title>\s*/, "")
  .replace(/\s*<!--[\s\S]*?data-rh[\s\S]*?-->/, "")
  .replace(/\s*<meta\s+data-rh="true"[\s\S]*?\/>/, "");

const fileFor = (route) => (route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`);

copyFileSync(templatePath, join(dist, "404.html"));

for (const route of routes) {
  const { pipe, helmet } = await render(route);
  const appHtml = await collect(pipe);
  const head = helmet();
  if (!head) throw new Error(`Brak tagów <head> dla ${route} — czy strona renderuje <Seo />?`);

  const headTags = ["title", "meta", "link", "script"]
    .map((type) => head[type].toString())
    .filter(Boolean)
    .join("\n    ")
    .trim();
  const htmlAttributes = head.htmlAttributes.toString();

  const page = baseTemplate
    .replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
    .replace("</head>", `    ${headTags}\n  </head>`)
    // data-prerendered: main.tsx hydratuje tylko, gdy adres i język zgadzają się z tym HTML.
    .replace('<div id="root"></div>', `<div id="root" data-prerendered="${route}">${appHtml}</div>`);

  if (!page.includes(`data-prerendered="${route}"`)) throw new Error("Nie znaleziono <div id=\"root\"></div> w szablonie");

  const file = join(dist, fileFor(route));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  console.log(`✓ ${route} → dist/${fileFor(route)}`);
}

// /portfolio to i plik portfolio.html, i katalog portfolio/ (case studies). Gdyby GitHub Pages
// wybrał katalog (przekierowanie na /portfolio/), też musi tam być gotowy HTML.
for (const route of routes) {
  const dir = join(dist, route);
  if (route !== "/" && existsSync(dir) && statSync(dir).isDirectory()) {
    copyFileSync(join(dist, fileFor(route)), join(dir, "index.html"));
    console.log(`✓ ${route}/ → dist${route}/index.html`);
  }
}

// Sprawdza tłumaczenia podzielone na namespace'y (src/translations/<język>/<ns>.json):
//  - czy PL i EN mają te same pliki i te same klucze,
//  - czy każdy klucz użyty w kodzie ("ns:ścieżka") istnieje w obu językach.
// Użycie: npm run i18n:check
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const translationsDir = join(root, "src/translations");
const locales = ["pl", "en"];

const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? flatten(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

/** { pl: Set("common:navbar.contact", …), en: … } */
const dicts = Object.fromEntries(
  locales.map((lang) => {
    const dir = join(translationsDir, lang);
    const keys = readdirSync(dir)
      .filter((file) => file.endsWith(".json"))
      .flatMap((file) => {
        const ns = file.replace(/\.json$/, "");
        return flatten(JSON.parse(readFileSync(join(dir, file), "utf8"))).map((key) => `${ns}:${key}`);
      });
    return [lang, new Set(keys)];
  }),
);
const namespaces = new Set([...dicts[locales[0]]].map((key) => key.split(":")[0]));

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|jsx?)$/.test(name) ? [p] : [];
  });

/** Klucze użyte w kodzie: każdy literał "ns:ścieżka" ze znanym namespace'em. */
const used = new Map(); // klucz -> [plik:linia]
/** Klucze składane w szablonie, np. `contact:privacy.sections.${id}.title` → wzorzec. */
const patterns = [];

for (const file of walk(join(root, "src"))) {
  const src = readFileSync(file, "utf8");
  const rel = relative(root, file).replaceAll("\\", "/");
  const lineOf = (idx) => src.slice(0, idx).split("\n").length;
  for (const m of src.matchAll(/(["'`])(\w+):([\w.]+(?:\$\{[^}]+\}[\w.]*)*)\1/g)) {
    const [, quote, ns, path] = m;
    if (!namespaces.has(ns)) continue;
    const where = `${rel}:${lineOf(m.index)}`;
    if (quote === "`" && path.includes("${")) {
      const source = `${ns}:${path}`;
      const regex = new RegExp(
        `^${source
          .split(/\$\{[^}]+\}/)
          .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
          .join("\\w+")}$`,
      );
      patterns.push({ source, regex, where });
    } else {
      const key = `${ns}:${path}`;
      used.set(key, [...(used.get(key) ?? []), where]);
    }
  }
}

let problems = 0;
const report = (message) => {
  problems++;
  console.log(`✗ ${message}`);
};

for (const [key, places] of [...used].sort()) {
  const missing = locales.filter((lang) => !dicts[lang].has(key));
  if (missing.length) report(`${key} — brak w: ${missing.join(", ")} (${places.join(", ")})`);
}
for (const { source, regex, where } of patterns) {
  if (![...dicts[locales[0]]].some((key) => regex.test(key))) report(`${source} — żaden klucz nie pasuje (${where})`);
}
for (const lang of locales) {
  for (const other of locales.filter((x) => x !== lang)) {
    for (const key of dicts[lang]) {
      if (!dicts[other].has(key)) report(`${key} — jest w ${lang}/, brak w ${other}/`);
    }
  }
}

console.log(
  problems
    ? `\n${problems} problem(ów).`
    : `✓ ${dicts[locales[0]].size} kluczy w ${namespaces.size} namespace'ach, PL i EN spójne, wszystkie użyte klucze istnieją.`,
);
process.exit(problems ? 1 : 0);

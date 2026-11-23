// Sprawdza tłumaczenia podzielone na namespace'y (src/translations/<język>/<ns>.json):
//  - czy PL i EN mają te same pliki i te same klucze,
//  - czy każdy klucz użyty w kodzie ("ns:ścieżka") istnieje w obu językach,
//  - czy w plikach nie ma kluczy, których kod nigdzie nie używa.
// Użycie: npm run i18n:check            (raport, kod wyjścia 1 przy problemach)
//         npm run i18n:check -- --prune (dodatkowo usuwa nieużywane klucze z PL i EN)
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const translationsDir = join(root, "src/translations");
const locales = ["pl", "en"];
const prune = process.argv.includes("--prune");

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

/** Pliki źródłowe aplikacji — bez testów, żeby klucze użyte tylko w asercjach nie liczyły się jako „użyte”. */
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "test" ? [] : walk(p);
    return /\.(tsx?|jsx?)$/.test(name) && !/\.test\.\w+$/.test(name) ? [p] : [];
  });

/** Klucze użyte w kodzie: każdy literał "ns:ścieżka" ze znanym namespace'em. */
const used = new Map(); // klucz -> [plik:linia]
/** Klucze składane w szablonie, np. `contact:privacy.sections.${id}.title` → wzorzec. */
const patterns = [];

for (const file of walk(join(root, "src"))) {
  const src = readFileSync(file, "utf8");
  const rel = relative(root, file).replaceAll("\\", "/");
  const lineOf = (idx) => src.slice(0, idx).split("\n").length;
  for (const m of src.matchAll(/(["'`])(\w+):([\w.-]+(?:\$\{[^}]+\}[\w.-]*)*)\1/g)) {
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

// Nieużywane: klucz nie występuje jako literał i nie pasuje do żadnego szablonu.
const isUsed = (key) => used.has(key) || patterns.some(({ regex }) => regex.test(key));
const unused = [...dicts[locales[0]]].filter((key) => !isUsed(key)).sort();

if (prune && unused.length) {
  const removeKey = (obj, parts) => {
    const [head, ...rest] = parts;
    if (!rest.length) return void delete obj[head];
    if (!obj[head] || typeof obj[head] !== "object") return;
    removeKey(obj[head], rest);
    if (!Object.keys(obj[head]).length) delete obj[head];
  };
  const byNamespace = Map.groupBy(unused, (key) => key.split(":")[0]);
  for (const lang of locales) {
    for (const [ns, keys] of byNamespace) {
      const file = join(translationsDir, lang, `${ns}.json`);
      const data = JSON.parse(readFileSync(file, "utf8"));
      for (const key of keys) removeKey(data, key.split(":")[1].split("."));
      writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
    }
  }
  console.log(`− usunięto ${unused.length} nieużywanych kluczy z ${locales.join(" i ")}:`);
  unused.forEach((key) => console.log(`  ${key}`));
} else {
  unused.forEach((key) => report(`${key} — nieużywany (usuń: npm run i18n:check -- --prune)`));
}

console.log(
  problems
    ? `\n${problems} problem(ów).`
    : `✓ ${dicts[locales[0]].size - (prune ? unused.length : 0)} kluczy w ${namespaces.size} namespace'ach, PL i EN spójne, wszystkie użyte klucze istnieją, brak nieużywanych.`,
);
process.exit(problems ? 1 : 0);

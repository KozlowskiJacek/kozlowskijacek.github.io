// Sprawdza, czy każdy klucz użyty w t() istnieje w pl.json i en.json,
// oraz czy oba pliki tłumaczeń mają ten sam zestaw kluczy.
// Użycie: npm run i18n:check
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const locales = ["pl", "en"];

const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? flatten(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

const dicts = Object.fromEntries(
  locales.map((l) => [
    l,
    new Set(flatten(JSON.parse(readFileSync(join(root, `src/translations/${l}.json`), "utf8")))),
  ]),
);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|jsx?)$/.test(name) ? [p] : [];
  });

const used = new Map(); // key -> [file:line]
const add = (key, where) => used.set(key, [...(used.get(key) ?? []), where]);

for (const file of walk(join(root, "src"))) {
  const src = readFileSync(file, "utf8");
  const rel = relative(root, file).replaceAll("\\", "/");
  // Tablice stringów zdefiniowane w pliku (np. const links = [...]) do rozwinięcia `prefix.${link}`.
  const arrays = {};
  for (const m of src.matchAll(/const\s+(\w+)(?:\s*:[^=]+)?\s*=\s*\[([^\]]*)\]/g)) {
    const items = [...m[2].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
    if (items.length) arrays[m[1]] = items;
  }
  const lineOf = (idx) => src.slice(0, idx).split("\n").length;
  for (const m of src.matchAll(/\bt\(\s*(["'`])((?:(?!\1).)*)\1/g)) {
    const where = `${rel}:${lineOf(m.index)}`;
    const key = m[2];
    const dyn = key.match(/^(.*)\$\{(\w+)\}(.*)$/);
    if (m[1] === "`" && dyn) {
      // Zmienna z `${link}` pochodzi zwykle z `links.map((link) => ...)`.
      const source = src.match(new RegExp(String.raw`(\w+)\.map\(\(?\s*${dyn[2]}\b`))?.[1];
      const values = arrays[dyn[2]] ?? arrays[source];
      if (!values) {
        console.warn(`? nie można rozwinąć klucza dynamicznego ${key} (${where})`);
        continue;
      }
      values.forEach((v) => add(`${dyn[1]}${v}${dyn[3]}`, where));
    } else {
      add(key, where);
    }
  }
}

let problems = 0;
for (const [key, places] of [...used].sort()) {
  const missing = locales.filter((l) => !dicts[l].has(key));
  if (missing.length) {
    problems++;
    console.log(`✗ ${key} — brak w: ${missing.join(", ")} (${places.join(", ")})`);
  }
}
for (const l of locales) {
  for (const other of locales.filter((x) => x !== l)) {
    for (const key of dicts[l]) {
      if (!dicts[other].has(key)) {
        problems++;
        console.log(`✗ ${key} — jest w ${l}.json, brak w ${other}.json`);
      }
    }
  }
}

console.log(problems ? `\n${problems} problem(ów).` : `✓ ${used.size} kluczy, wszystkie obecne w ${locales.join(" i ")}.`);
process.exit(problems ? 1 : 0);

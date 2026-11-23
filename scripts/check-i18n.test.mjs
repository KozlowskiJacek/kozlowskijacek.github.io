import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const script = join(dirname(fileURLToPath(import.meta.url)), "check-i18n.mjs");
const projectRoot = join(dirname(script), "..");

/** Uruchamia skrypt w podanym katalogu (skrypt czyta src/ względem process.cwd()). */
const run = (cwd, ...args) => {
  const result = spawnSync(process.execPath, [script, ...args], { cwd, encoding: "utf8" });
  return { code: result.status, output: result.stdout + result.stderr };
};

let dirs = [];

/** Minimalny projekt: src/translations/{pl,en}/*.json + plik źródłowy używający kluczy. */
const fixture = ({ pl, en, code }) => {
  const root = mkdtempSync(join(tmpdir(), "i18n-check-"));
  dirs.push(root);
  for (const [lang, files] of Object.entries({ pl, en })) {
    mkdirSync(join(root, "src/translations", lang), { recursive: true });
    for (const [ns, content] of Object.entries(files)) {
      writeFileSync(join(root, "src/translations", lang, `${ns}.json`), JSON.stringify(content, null, 2));
    }
  }
  writeFileSync(join(root, "src/App.tsx"), code);
  return root;
};

const readJson = (root, lang, ns) =>
  JSON.parse(readFileSync(join(root, "src/translations", lang, `${ns}.json`), "utf8"));

afterEach(() => {
  dirs.forEach((dir) => rmSync(dir, { recursive: true, force: true }));
  dirs = [];
});

describe("scripts/check-i18n.mjs", () => {
  it("spójne tłumaczenia → kod 0", () => {
    const root = fixture({
      pl: { common: { nav: { home: "Start" } } },
      en: { common: { nav: { home: "Home" } } },
      code: `t("common:nav.home");`,
    });

    const { code, output } = run(root);

    expect(code).toBe(0);
    expect(output).toContain("PL i EN spójne");
  });

  it("klucz tylko w jednym języku → kod 1", () => {
    const root = fixture({
      pl: { common: { a: "A", b: "B" } },
      en: { common: { a: "A" } },
      code: `t("common:a"); t("common:b");`,
    });

    const { code, output } = run(root);

    expect(code).toBe(1);
    expect(output).toContain("common:b — jest w pl/, brak w en/");
  });

  it("klucz użyty w kodzie, którego nie ma w tłumaczeniach → kod 1 z miejscem użycia", () => {
    const root = fixture({
      pl: { common: { a: "A" } },
      en: { common: { a: "A" } },
      code: `t("common:a");\nt("common:missing");`,
    });

    const { code, output } = run(root);

    expect(code).toBe(1);
    expect(output).toContain("common:missing — brak w: pl, en (src/App.tsx:2)");
  });

  it("nieużywany klucz → kod 1, a klucze z szablonu `${…}` są traktowane jako użyte", () => {
    const root = fixture({
      pl: { home: { used: "U", unused: "X", items: { one: "1", two: "2" } } },
      en: { home: { used: "U", unused: "X", items: { one: "1", two: "2" } } },
      code: "t('home:used'); items.map((id) => t(`home:items.${id}`));",
    });

    const { code, output } = run(root);

    expect(code).toBe(1);
    expect(output).toContain("home:unused — nieużywany");
    expect(output).not.toContain("home:items.one");
  });

  it("--prune usuwa nieużywane klucze z obu języków", () => {
    const root = fixture({
      pl: { common: { keep: "K", drop: { nested: "D" } } },
      en: { common: { keep: "K", drop: { nested: "D" } } },
      code: `t("common:keep");`,
    });

    const { code } = run(root, "--prune");

    expect(code).toBe(0);
    expect(readJson(root, "pl", "common")).toEqual({ keep: "K" });
    expect(readJson(root, "en", "common")).toEqual({ keep: "K" });
    expect(run(root).code).toBe(0);
  });

  it("tłumaczenia projektu przechodzą sprawdzenie", () => {
    const { code, output } = run(projectRoot);

    expect(output).toContain("PL i EN spójne");
    expect(code).toBe(0);
  });
});

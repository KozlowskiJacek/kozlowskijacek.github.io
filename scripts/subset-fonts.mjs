// Generuje odchudzone fonty do src/assets/fonts (`npm run fonts:subset`).
// Źródło: pliki woff2 z @fontsource-variable (Inter, Space Grotesk). Dla każdej rodziny:
//  - zakres osi wght zawężony do wag używanych na stronie (400–600: font-normal/medium/semibold),
//  - plik "latin" (podstawowa łacina + interpunkcja) i mały plik "pl" z polskimi znakami
//    z Latin Extended-A — przeglądarka pobiera go tylko dla tekstu z tymi znakami (unicode-range).
// Wszystkie cechy OpenType (np. cv11, ss01 z index.css) zostają zachowane.
// Po zmianie zakresów zaktualizuj unicode-range w src/index.css.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import subsetFont from "subset-font";

const OUT = "src/assets/fonts";
const WEIGHTS = { min: 400, max: 600 };

/** Znaki z unicode-range: tablica [od, do] (włącznie). */
const ranges = {
  // Jak podzbiór "latin" Fontsource (bez rzadkich symboli matematycznych).
  latin: [
    [0x0000, 0x00ff],
    [0x0131, 0x0131],
    [0x0152, 0x0153],
    [0x02bb, 0x02bc],
    [0x02c6, 0x02c6],
    [0x02da, 0x02da],
    [0x02dc, 0x02dc],
    [0x0304, 0x0304],
    [0x0308, 0x0308],
    [0x0329, 0x0329],
    [0x2000, 0x206f],
    [0x20ac, 0x20ac],
    [0x2122, 0x2122],
    [0x2190, 0x2193],
    [0x2212, 0x2212],
    [0x2215, 0x2215],
  ],
  // Ą ą Ć ć Ę ę Ł ł Ń ń Ś ś Ź ź Ż ż
  pl: [
    [0x0104, 0x0107],
    [0x0118, 0x0119],
    [0x0141, 0x0144],
    [0x015a, 0x015b],
    [0x0179, 0x017c],
  ],
};

const families = [
  { name: "inter", source: "@fontsource-variable/inter/files/inter-{subset}-wght-normal.woff2" },
  {
    name: "space-grotesk",
    source: "@fontsource-variable/space-grotesk/files/space-grotesk-{subset}-wght-normal.woff2",
  },
];

/** Plik źródłowy Fontsource dla danego podzbioru ("pl" → latin-ext). */
const sourceSubset = { latin: "latin", pl: "latin-ext" };

const textFor = (subset) =>
  ranges[subset]
    .flatMap(([from, to]) => Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)))
    .join("");

mkdirSync(OUT, { recursive: true });

for (const family of families) {
  for (const subset of Object.keys(ranges)) {
    const file = `node_modules/${family.source.replace("{subset}", sourceSubset[subset])}`;
    const input = readFileSync(file);
    const output = await subsetFont(input, textFor(subset), {
      targetFormat: "woff2",
      variationAxes: { wght: WEIGHTS },
    });
    const target = `${OUT}/${family.name}-${subset}-wght.woff2`;
    writeFileSync(target, output);
    console.log(`✓ ${target}: ${(input.length / 1024).toFixed(1)} KB → ${(output.length / 1024).toFixed(1)} KB`);
  }
}

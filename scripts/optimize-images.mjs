// Konwersja obrazów źródłowych w src/assets/img do WebP (`npm run images:optimize [-- plik ...]`).
// Bez argumentów bierze wszystkie PNG/JPG/JFIF z katalogu. Dla każdego pliku:
//  - zmniejsza do max. MAX_SIZE px na dłuższym boku (wersje responsywne i AVIF generuje
//    przy buildzie vite-imagetools — zob. presety w vite.config.ts),
//  - zapisuje <nazwa-w-kebab-case>.webp (bez spacji i polskich znaków) i usuwa oryginał.
// Pixel art (mały PNG z kanałem alfa) zapisywany bezstratnie, żeby nie rozmyć krawędzi.
import { readdirSync, statSync, unlinkSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const DIR = "src/assets/img";
const MAX_SIZE = 1600;
const QUALITY = 80;
const LIMIT_KB = 200;
const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg", ".jfif"]);

/** "MainPhoto" → "main-photo", "Serwis Gąsiorek Logo_20250519_093746_0000" → "serwis-gasiorek-logo". */
export const slugify = (name) =>
  name
    .replace(/_\d{8}_\d{6}_\d{4}$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(DIR)
      .filter((file) => SOURCE_EXT.has(extname(file).toLowerCase()))
      .map((file) => join(DIR, file));

let failed = false;

for (const file of files) {
  const input = sharp(file);
  const meta = await input.metadata();
  const pixelArt = meta.format === "png" && meta.hasAlpha && statSync(file).size < 20 * 1024;
  const output = join(DIR, `${slugify(basename(file, extname(file)))}.webp`);

  const info = await input
    .rotate()
    .resize({ width: MAX_SIZE, height: MAX_SIZE, fit: "inside", withoutEnlargement: true })
    .webp(pixelArt ? { lossless: true } : { quality: QUALITY, effort: 6, smartSubsample: true })
    .toFile(output);

  const kb = Math.round(info.size / 1024);
  const before = Math.round(statSync(file).size / 1024);
  if (kb > LIMIT_KB) failed = true;
  console.log(
    `${kb > LIMIT_KB ? "!" : "✓"} ${basename(file)} (${before} KB) → ${basename(output)} ${info.width}×${info.height}, ${kb} KB`,
  );
  if (output !== file) unlinkSync(file);
}

if (failed) {
  console.error(`\nNiektóre pliki przekraczają ${LIMIT_KB} KB — rozważ niższe QUALITY lub MAX_SIZE.`);
  process.exitCode = 1;
}

import { existsSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import { visualizer } from "rollup-plugin-visualizer";

/** Oczekiwane pliki CV w public/cv/ (nazwy bez spacji i polskich znaków). */
const CV_FILES = {
  pl: "Jacek-Kozlowski-CV-PL.pdf",
  en: "Jacek-Kozlowski-CV-EN.pdf",
} as const;

/**
 * Adresy CV sprawdzane przy starcie serwera / buildzie — brak pliku → null
 * i przycisk „Pobierz CV” w danym języku nie jest renderowany (bez fetch w przeglądarce).
 * Po dodaniu pliku zrestartuj `npm run dev`.
 */
const findCvFiles = (dir = "public/cv") =>
  Object.fromEntries(
    Object.entries(CV_FILES).map(([lang, file]) => [lang, existsSync(`${dir}/${file}`) ? `/cv/${file}` : null]),
  );

/**
 * Presety obrazów (vite-imagetools): import `obraz.webp?photo` daje obiekt Picture
 * (AVIF + WebP w kilku szerokościach, fallback = największy WebP) dla komponentu <Img>.
 * Szerokości ≈ 1× i 2× rozmiaru wyświetlania.
 */
const imagePresets: Record<string, Record<string, string>> = {
  /** Zdjęcia osób w opiniach (56–80 px). */
  avatar: { w: "96;192" },
  /** Logotypy klientów (kafel 96 px). */
  logo: { w: "128;256" },
  /** Zdjęcie w hero, ilustracje na /o-mnie (do ~450 px). */
  photo: { w: "400;640;960" },
  /** Okładki realizacji: karty (~400 px) i hero case study (do ~1100 px). */
  cover: { w: "480;800;1200" },
  /** Pionowe miniatury rolek z Instagrama (9:16, kafel ~200–280 px). */
  reel: { w: "300;600" },
  /** Pixel art — skalowanie bez wygładzania i bez strat. */
  pixel: { w: "404;808", kernel: "nearest", lossless: "true" },
};

const imageDirectives = (url: URL) => {
  const preset = Object.keys(imagePresets).find((name) => url.searchParams.has(name));
  if (!preset) return new URLSearchParams();
  return new URLSearchParams({ ...imagePresets[preset], format: "avif;webp", as: "picture" });
};

/**
 * Vendor chunki ładowane na każdej stronie. Pozostałe zależności (react-icons, canvas-confetti,
 * @emailjs/browser) trafiają do chunków stron / dynamicznych importów, które ich używają.
 */
const vendorChunks: Record<string, string[]> = {
  react: [
    "react",
    "react-dom",
    "scheduler",
    "react-router",
    "react-router-dom",
    "react-helmet-async",
    "react-fast-compare",
    "shallowequal",
    "invariant",
    "cookie",
    "set-cookie-parser",
  ],
  motion: ["framer-motion", "motion-dom", "motion-utils"],
  i18n: ["i18next", "react-i18next", "i18next-browser-languagedetector", "html-parse-stringify", "void-elements"],
};

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild, mode }) => ({
  // Strona użytkownika GitHub Pages serwowana z katalogu głównego domeny.
  // Ścieżka względna ('./') psuła ładowanie zasobów na zagnieżdżonych trasach.
  base: "/",
  plugins: [
    react(),
    imagetools({ defaultDirectives: imageDirectives }),
    // `npm run analyze` — mapa rozmiaru bundla w stats.html (gzip/brotli).
    mode === "analyze" &&
      visualizer({ filename: "stats.html", template: "treemap", gzipSize: true, brotliSize: true, open: false }),
  ],
  build: {
    // Build SSR (dist-ssr/, tylko do prerenderingu w scripts/prerender.mjs) nie potrzebuje kopii public/.
    copyPublicDir: !isSsrBuild,
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            // Biblioteki rzadko się zmieniają — osobne chunki zostają w cache przeglądarki między deployami.
            manualChunks: (id: string) => {
              if (!id.includes("node_modules")) return undefined;
              return Object.entries(vendorChunks).find(([, packages]) =>
                packages.some((pkg) => id.includes(`/node_modules/${pkg}/`)),
              )?.[0];
            },
          },
        },
  },
  define: {
    __CV_FILES__: JSON.stringify(findCvFiles()),
  },
  json: {
    stringify: false,
  },
}));

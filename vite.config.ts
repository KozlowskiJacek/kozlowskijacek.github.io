import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { imagetools } from 'vite-imagetools'

/** Oczekiwane pliki CV w public/cv/ (nazwy bez spacji i polskich znaków). */
const CV_FILES = {
  pl: 'Jacek-Kozlowski-CV-PL.pdf',
  en: 'Jacek-Kozlowski-CV-EN.pdf',
} as const

/**
 * Adresy CV sprawdzane przy starcie serwera / buildzie — brak pliku → null
 * i przycisk „Pobierz CV” w danym języku nie jest renderowany (bez fetch w przeglądarce).
 * Po dodaniu pliku zrestartuj `npm run dev`.
 */
const findCvFiles = (dir = 'public/cv') =>
  Object.fromEntries(
    Object.entries(CV_FILES).map(([lang, file]) => [
      lang,
      existsSync(`${dir}/${file}`) ? `/cv/${file}` : null,
    ]),
  )

/**
 * Presety obrazów (vite-imagetools): import `obraz.webp?photo` daje obiekt Picture
 * (AVIF + WebP w kilku szerokościach, fallback = największy WebP) dla komponentu <Img>.
 * Szerokości ≈ 1× i 2× rozmiaru wyświetlania.
 */
const imagePresets: Record<string, Record<string, string>> = {
  /** Zdjęcia osób w opiniach (56–80 px). */
  avatar: { w: '96;192' },
  /** Logotypy klientów (kafel 96 px). */
  logo: { w: '128;256' },
  /** Zdjęcie w hero, ilustracje na /o-mnie (do ~450 px). */
  photo: { w: '400;640;960' },
  /** Okładki realizacji: karty (~400 px) i hero case study (do ~1100 px). */
  cover: { w: '480;800;1200' },
  /** Pixel art — skalowanie bez wygładzania i bez strat. */
  pixel: { w: '404;808', kernel: 'nearest', lossless: 'true' },
}

const imageDirectives = (url: URL) => {
  const preset = Object.keys(imagePresets).find((name) => url.searchParams.has(name))
  if (!preset) return new URLSearchParams()
  return new URLSearchParams({ ...imagePresets[preset], format: 'avif;webp', as: 'picture' })
}

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  // Strona użytkownika GitHub Pages serwowana z katalogu głównego domeny.
  // Ścieżka względna ('./') psuła ładowanie zasobów na zagnieżdżonych trasach.
  base: '/',
  plugins: [react(), imagetools({ defaultDirectives: imageDirectives })],
  build: {
    // Build SSR (dist-ssr/, tylko do prerenderingu w scripts/prerender.mjs) nie potrzebuje kopii public/.
    copyPublicDir: !isSsrBuild,
  },
  define: {
    __CV_FILES__: JSON.stringify(findCvFiles()),
  },
  json: {
    stringify: false,
  },
}));

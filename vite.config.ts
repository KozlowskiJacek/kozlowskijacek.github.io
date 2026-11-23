import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

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

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  // Strona użytkownika GitHub Pages serwowana z katalogu głównego domeny.
  // Ścieżka względna ('./') psuła ładowanie zasobów na zagnieżdżonych trasach.
  base: '/',
  plugins: [react()],
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

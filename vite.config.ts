import { existsSync, readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

/**
 * CV do pobrania: pierwszy plik PDF z public/cv/ (sprawdzany przy starcie serwera / buildzie).
 * Brak pliku → null i przycisk „Pobierz CV” nie jest renderowany.
 */
const findCv = (dir = 'public/cv'): string | null => {
  if (!existsSync(dir)) return null
  const file = readdirSync(dir).find((name) => name.toLowerCase().endsWith('.pdf'))
  return file ? `/cv/${encodeURIComponent(file)}` : null
}

// https://vite.dev/config/
export default defineConfig({
  // Strona użytkownika GitHub Pages serwowana z katalogu głównego domeny.
  // Ścieżka względna ('./') psuła ładowanie zasobów na zagnieżdżonych trasach.
  base: '/',
  plugins: [react()],
  define: {
    __CV_URL__: JSON.stringify(findCv()),
  },
  json: {
    stringify: false,
  },
});

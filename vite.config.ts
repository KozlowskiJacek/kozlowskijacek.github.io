import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  // Strona użytkownika GitHub Pages serwowana z katalogu głównego domeny.
  // Ścieżka względna ('./') psuła ładowanie zasobów na zagnieżdżonych trasach.
  base: '/',
  plugins: [react()],
  json: {
    stringify: false,
  },
});
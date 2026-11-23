import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import i18n from "./lib/i18n.ts";
import { defaultLanguage } from "./data/site.ts";

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)

// HTML z prerenderingu (scripts/prerender.mjs) jest po polsku i dla konkretnej trasy.
// Hydratujemy tylko, gdy zgadza się adres i język; w innym wypadku (np. ?lang=en, 404.html)
// renderujemy od zera — createRoot zastępuje statyczną treść.
const normalize = (path: string) => (path.length > 1 ? path.replace(/\/$/, '') : path)
const prerendered = container.dataset.prerendered
const canHydrate =
  prerendered !== undefined &&
  prerendered === normalize(window.location.pathname) &&
  (i18n.resolvedLanguage ?? defaultLanguage) === defaultLanguage

if (canHydrate) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

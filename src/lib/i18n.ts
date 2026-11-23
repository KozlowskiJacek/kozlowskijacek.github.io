import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/**
 * Tłumaczenia podzielone na namespace'y odpowiadające stronom:
 * src/translations/<język>/<namespace>.json. W kodzie klucze mają postać "namespace:ścieżka",
 * np. t("home:hero.title"). Spójność PL/EN i nieużywane klucze: npm run i18n:check.
 */
export const namespaces = ["common", "home", "services", "portfolio", "career", "contact"] as const;

const files = import.meta.glob<Record<string, unknown>>("../translations/*/*.json", {
  eager: true,
  import: "default",
});

const resources: Resource = {};
for (const [file, content] of Object.entries(files)) {
  const [, lang, ns] = file.match(/translations\/(\w+)\/(\w+)\.json$/) ?? [];
  if (lang && ns) (resources[lang] ??= {})[ns] = content;
}

/** false przy prerenderingu w Node (scripts/prerender.mjs) — tam zawsze język domyślny. */
const isBrowser = typeof window !== "undefined";

if (isBrowser) i18n.use(LanguageDetector);

i18n.use(initReactI18next).init({
  resources,
  ...(isBrowser ? {} : { lng: "pl" }),
  ns: namespaces,
  defaultNS: "common",
  fallbackLng: "pl",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    // ?lang=en (adresy z hreflang) ma pierwszeństwo przed zapamiętanym wyborem.
    order: ["querystring", "localStorage", "navigator"],
    lookupQuerystring: "lang",
    caches: ["localStorage"],
  },
});

// Atrybut lang w <html> podąża za aktywnym językiem (czytniki ekranu, SEO).
const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng.split("-")[0];
};
if (isBrowser) {
  syncHtmlLang(i18n.resolvedLanguage ?? i18n.language ?? "pl");
  i18n.on("languageChanged", syncHtmlLang);
}

export default i18n;

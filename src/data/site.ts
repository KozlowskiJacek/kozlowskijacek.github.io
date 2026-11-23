import { paths } from "./navigation";

/** Adres produkcyjny strony (bez końcowego ukośnika) — canonical, og:url, sitemap. */
export const siteUrl = "https://jacekkozlowski.github.io";

export const siteName = "Jacek Kozłowski";

/** Domyślny obraz Open Graph (1200×630), szablon: public/og/og-template.html. */
export const defaultOgImage = "/og/default.png";

export type SiteLanguage = "pl" | "en";

/** Język domyślny ma adresy bez parametru, pozostałe: ?lang=en. */
export const defaultLanguage: SiteLanguage = "pl";
export const siteLanguages: SiteLanguage[] = ["pl", "en"];

/** Parametr adresu wymuszający język (czyta go też detektor i18next). */
export const languageParam = "lang";

export const ogLocales: Record<SiteLanguage, string> = {
  pl: "pl_PL",
  en: "en_US",
};

/** Statyczne trasy do indeksowania (sitemap, prerendering). Case studies dochodzą ze slugów projektów. */
export const indexableRoutes: string[] = [
  paths.home,
  paths.servicesVideo,
  paths.servicesWeb,
  paths.portfolio,
  paths.employers,
  paths.about,
  paths.contact,
  paths.privacy,
];

/** Adres bezwzględny: ścieżka + opcjonalnie ?lang=… dla języka innego niż domyślny. */
export const absoluteUrl = (path: string, language: SiteLanguage = defaultLanguage) => {
  const url = `${siteUrl}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
  return language === defaultLanguage ? url : `${url}?${languageParam}=${language}`;
};

/** Zasób z `public/` lub zaimportowany obraz (ścieżka zaczyna się od /) → adres bezwzględny. */
export const absoluteAsset = (src: string) => (/^https?:\/\//.test(src) ? src : `${siteUrl}${src}`);

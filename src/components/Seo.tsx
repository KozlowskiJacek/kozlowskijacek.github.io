import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  absoluteAsset,
  absoluteUrl,
  defaultLanguage,
  defaultOgImage,
  ogLocales,
  siteLanguages,
  siteName,
  type SiteLanguage,
} from "../data/site";

type SeoProps = {
  /** Klucz tłumaczenia tytułu (bez sufiksu „| Jacek Kozłowski” — dokleja go komponent). */
  titleKey?: string;
  descriptionKey?: string;
  /** Gotowy tekst zamiast klucza (np. nazwa projektu w case study). */
  title?: string;
  description?: string;
  /** Ścieżka obrazu OG (z `public/` albo import z `src/assets`). */
  image?: string;
  type?: "website" | "article" | "profile";
  /** Tytuł bez sufiksu z nazwą strony (strona główna). */
  bareTitle?: boolean;
  noindex?: boolean;
  /** Dane strukturalne schema.org — każdy obiekt trafia do osobnego <script type="application/ld+json">. */
  jsonLd?: object[];
};

/** `<` w JSON-ie wewnątrz <script> mogłoby zamknąć tag — zamiana na sekwencję unicode. */
const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

/** Meta tagi strony: title, description, canonical, Open Graph, Twitter Card, hreflang i JSON-LD. */
const Seo = ({
  titleKey,
  descriptionKey,
  title,
  description,
  image = defaultOgImage,
  type = "website",
  bareTitle = false,
  noindex = false,
  jsonLd = [],
}: SeoProps) => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const language: SiteLanguage = i18n.resolvedLanguage === "en" ? "en" : defaultLanguage;

  const pageTitle = title ?? (titleKey ? t(titleKey) : siteName);
  const fullTitle = bareTitle || pageTitle === siteName ? pageTitle : `${pageTitle} | ${siteName}`;
  const pageDescription = description ?? (descriptionKey ? t(descriptionKey) : undefined);
  const url = absoluteUrl(pathname, language);
  const imageUrl = absoluteAsset(image);

  return (
    // defer={false}: aktualizacja od razu, bez requestAnimationFrame (który w kartach w tle stoi).
    <Helmet defer={false} htmlAttributes={{ lang: language }}>
      <title>{fullTitle}</title>
      {pageDescription && <meta name="description" content={pageDescription} />}
      {noindex && <meta name="robots" content="noindex" />}
      {!noindex && <link rel="canonical" href={url} />}
      {!noindex &&
        siteLanguages.map((lng) => <link key={lng} rel="alternate" hrefLang={lng} href={absoluteUrl(pathname, lng)} />)}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={absoluteUrl(pathname)} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      {pageDescription && <meta property="og:description" content={pageDescription} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={ogLocales[language]} />
      {siteLanguages
        .filter((lng) => lng !== language)
        .map((lng) => (
          <meta key={lng} property="og:locale:alternate" content={ogLocales[lng]} />
        ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {pageDescription && <meta name="twitter:description" content={pageDescription} />}
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd.map((data, index) => (
        <script key={index} type="application/ld+json">
          {serializeJsonLd(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;

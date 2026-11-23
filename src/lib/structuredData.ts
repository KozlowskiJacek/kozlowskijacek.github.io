import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import mainPhoto from "../assets/img/MainPhoto.png";
import { career } from "../data/career";
import { socials } from "../data/socials";
import { absoluteAsset, absoluteUrl, siteUrl, type SiteLanguage } from "../data/site";
import type { ServicePackage } from "../data/services/types";

/** Dane strukturalne schema.org (JSON-LD) dla komponentu <Seo />. */

const personId = `${siteUrl}/#person`;

/** Profile w innych serwisach — tylko te, których adres jest znany. */
const sameAs = [
  career.links.linkedin,
  career.links.github,
  socials.find((social) => social.id === "youtube")?.href,
].filter((href): href is string => Boolean(href));

/** Osoba: strona główna i /dla-pracodawcow. */
export const personJsonLd = (t: TFunction) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: career.name,
  url: `${siteUrl}/`,
  image: absoluteAsset(mainPhoto),
  jobTitle: t("common.seo.job_title"),
  description: t("career.headline"),
  sameAs,
});

type ServiceJsonLdInput = {
  path: string;
  nameKey: string;
  descriptionKey: string;
  serviceType: string;
  packages: ServicePackage[];
};

/** Usługa świadczona przez osobę (Person jako provider) + katalog pakietów z ceną „od”, jeśli jest znana. */
export const serviceJsonLd = (
  t: TFunction,
  language: SiteLanguage,
  { path, nameKey, descriptionKey, serviceType, packages }: ServiceJsonLdInput,
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}${path}#service`,
  name: t(nameKey),
  description: t(descriptionKey),
  serviceType,
  url: absoluteUrl(path, language),
  areaServed: { "@type": "Country", name: "Poland" },
  availableLanguage: ["pl", "en"],
  provider: {
    "@type": "Person",
    "@id": personId,
    name: career.name,
    url: siteUrl,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: t(nameKey),
    itemListElement: packages.map((pkg) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: t(pkg.titleKey),
        description: t(pkg.textKey),
      },
      ...(pkg.price && {
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: pkg.price.from,
          priceCurrency: "PLN",
        },
      }),
    })),
  },
});

const useSiteLanguage = () => {
  const { t, i18n } = useTranslation();
  const language: SiteLanguage = i18n.resolvedLanguage === "en" ? "en" : "pl";
  return { t, language };
};

export const usePersonJsonLd = () => {
  const { t } = useTranslation();
  return personJsonLd(t);
};

export const useServiceJsonLd = (input: ServiceJsonLdInput) => {
  const { t, language } = useSiteLanguage();
  return serviceJsonLd(t, language, input);
};

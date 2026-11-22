/** Adresy podstron — jedno źródło prawdy dla tras, nawigacji i linków. */
export const paths = {
  home: "/",
  servicesVideo: "/uslugi/wideo",
  servicesWeb: "/uslugi/web",
  portfolio: "/portfolio",
  caseStudy: "/portfolio/:slug",
  employers: "/dla-pracodawcow",
  about: "/o-mnie",
  contact: "/kontakt",
} as const;

/** Prefiks tras usług — aktywny stan przycisku „Usługi”. */
export const servicesPrefix = "/uslugi";

export const caseStudyPath = (slug: string) => `${paths.portfolio}/${slug}`;

export type NavItem = {
  to: string;
  /** Klucz tłumaczenia etykiety. */
  labelKey: string;
  /** Klucz tłumaczenia krótkiego opisu (dropdown). */
  descriptionKey?: string;
};

/** Pozycje rozwijanego menu „Usługi”. */
export const serviceLinks: NavItem[] = [
  {
    to: paths.servicesVideo,
    labelKey: "navbar.services_video",
    descriptionKey: "navbar.services_video_desc",
  },
  {
    to: paths.servicesWeb,
    labelKey: "navbar.services_web",
    descriptionKey: "navbar.services_web_desc",
  },
];

/** Linki głównej nawigacji (po dropdownie „Usługi”). */
export const mainLinks: NavItem[] = [
  { to: paths.portfolio, labelKey: "navbar.portfolio" },
  { to: paths.employers, labelKey: "navbar.employers" },
  { to: paths.about, labelKey: "navbar.about" },
];

export const contactLink: NavItem = { to: paths.contact, labelKey: "navbar.contact" };

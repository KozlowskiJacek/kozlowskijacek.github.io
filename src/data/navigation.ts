/** Adresy podstron — jedno źródło prawdy dla tras, nawigacji i linków. */
export const paths = {
  home: "/",
  servicesVideo: "/uslugi/wideo",
  servicesWeb: "/uslugi/web",
  portfolio: "/portfolio",
  caseStudy: "/portfolio/:slug",
  employers: "/doswiadczenie",
  about: "/o-mnie",
  contact: "/kontakt",
  privacy: "/polityka-prywatnosci",
} as const;

/** Prefiks tras usług — aktywny stan przycisku „Usługi”. */
export const servicesPrefix = "/uslugi";

export const caseStudyPath = (slug: string) => `${paths.portfolio}/${slug}`;

/** Stare adresy → nowe (przekierowanie z `replace`). */
export const legacyRedirects: { from: string; to: string }[] = [
  { from: "/about", to: paths.about },
  { from: "/web-apps", to: paths.servicesWeb },
  { from: "/social-video", to: paths.servicesVideo },
  { from: "/dla-pracodawcow", to: paths.employers },
];

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
    labelKey: "common:navbar.services_video",
    descriptionKey: "common:navbar.services_video_desc",
  },
  {
    to: paths.servicesWeb,
    labelKey: "common:navbar.services_web",
    descriptionKey: "common:navbar.services_web_desc",
  },
];

/** Linki głównej nawigacji (po dropdownie „Usługi”). */
export const mainLinks: NavItem[] = [
  { to: paths.portfolio, labelKey: "common:navbar.portfolio" },
  { to: paths.employers, labelKey: "common:navbar.employers" },
  { to: paths.about, labelKey: "common:navbar.about" },
];

export const contactLink: NavItem = { to: paths.contact, labelKey: "common:navbar.contact" };

export type FooterColumn = {
  titleKey: string;
  links: NavItem[];
};

export const footerColumns: FooterColumn[] = [
  {
    titleKey: "common:footer.services",
    links: serviceLinks.map(({ to, labelKey }) => ({ to, labelKey })),
  },
  {
    titleKey: "common:footer.portfolio",
    links: [{ to: paths.portfolio, labelKey: "common:footer.portfolio_all" }],
  },
  {
    titleKey: "common:footer.employers",
    links: [
      { to: paths.employers, labelKey: "common:footer.employers_profile" },
      { to: paths.about, labelKey: "common:footer.about" },
    ],
  },
  {
    titleKey: "common:footer.contact",
    links: [{ to: paths.contact, labelKey: "common:footer.contact_form" }],
  },
];

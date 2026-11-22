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

/** Stare adresy → nowe (przekierowanie z `replace`). */
export const legacyRedirects: { from: string; to: string }[] = [
  { from: "/about", to: paths.about },
  { from: "/web-apps", to: paths.servicesWeb },
  { from: "/social-video", to: paths.servicesVideo },
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

export type FooterColumn = {
  titleKey: string;
  links: NavItem[];
};

export const footerColumns: FooterColumn[] = [
  {
    titleKey: "footer.services",
    links: serviceLinks.map(({ to, labelKey }) => ({ to, labelKey })),
  },
  {
    titleKey: "footer.portfolio",
    links: [{ to: paths.portfolio, labelKey: "footer.portfolio_all" }],
  },
  {
    titleKey: "footer.employers",
    links: [
      { to: paths.employers, labelKey: "footer.employers_profile" },
      { to: paths.about, labelKey: "footer.about" },
    ],
  },
  {
    titleKey: "footer.contact",
    links: [{ to: paths.contact, labelKey: "footer.contact_form" }],
  },
];

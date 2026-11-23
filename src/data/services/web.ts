import {
  FaGaugeHigh,
  FaGears,
  FaGlobe,
  FaHeadset,
  FaLaptopCode,
  FaMagnifyingGlass,
  FaMobileScreen,
  FaPenRuler,
} from "react-icons/fa6";
import type {
  ContactTopic,
  FaqItem,
  SectionCopy,
  ServiceCtaData,
  ServiceHeroData,
  ServiceItem,
  ServicePackage,
  ServicePortfolioData,
  ServiceStep,
  ServiceTone,
  TechGroup,
} from "./types";

export const webTone: ServiceTone = "accent";
export const webTopic: ContactTopic = "web";

export const webHero: ServiceHeroData = {
  eyebrowKey: "web_app.hero.eyebrow",
  titleKey: "web_app.hero.title",
  accentKey: "web_app.hero.accent",
  textKey: "web_app.hero.text",
};

export const webServicesCopy: SectionCopy = {
  titleKey: "web_app.services.title",
  accentKey: "web_app.services.accent",
  textKey: "web_app.services.text",
};

export const webServices: ServiceItem[] = [
  {
    id: "websites",
    icon: FaGlobe,
    titleKey: "web_app.services.websites.title",
    textKey: "web_app.services.websites.text",
    pointKeys: ["web_app.services.websites.p1", "web_app.services.websites.p2"],
  },
  {
    id: "webapps",
    icon: FaLaptopCode,
    titleKey: "web_app.services.webapps.title",
    textKey: "web_app.services.webapps.text",
    pointKeys: ["web_app.services.webapps.p1", "web_app.services.webapps.p2"],
  },
  {
    id: "uiux",
    icon: FaPenRuler,
    titleKey: "web_app.services.uiux.title",
    textKey: "web_app.services.uiux.text",
    pointKeys: ["web_app.services.uiux.p1", "web_app.services.uiux.p2"],
  },
  {
    id: "automation",
    icon: FaGears,
    titleKey: "web_app.services.automation.title",
    textKey: "web_app.services.automation.text",
    pointKeys: ["web_app.services.automation.p1", "web_app.services.automation.p2"],
    example: {
      labelKey: "web_app.services.automation.example_label",
      textKey: "web_app.services.automation.example",
    },
  },
];

export const webProcessCopy: SectionCopy = {
  titleKey: "web_app.process.title",
  accentKey: "web_app.process.accent",
  textKey: "web_app.process.text",
};

export const webProcess: ServiceStep[] = [
  { id: "talk", titleKey: "web_app.process.talk.title", textKey: "web_app.process.talk.text" },
  { id: "design", titleKey: "web_app.process.design.title", textKey: "web_app.process.design.text" },
  { id: "build", titleKey: "web_app.process.build.title", textKey: "web_app.process.build.text" },
  { id: "review", titleKey: "web_app.process.review.title", textKey: "web_app.process.review.text" },
  { id: "support", titleKey: "web_app.process.support.title", textKey: "web_app.process.support.text" },
];

export const webTechCopy: SectionCopy = {
  titleKey: "web_app.tech.title",
  accentKey: "web_app.tech.accent",
};

/** Nazwy technologii to nazwy własne — bez tłumaczenia. */
export const webTech: TechGroup[] = [
  {
    id: "frontend",
    labelKey: "web_app.tech.frontend",
    items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
  },
  {
    id: "backend",
    labelKey: "web_app.tech.backend",
    items: ["Python", "Django", "REST API", "SQL", "MongoDB"],
  },
  {
    id: "automation",
    labelKey: "web_app.tech.automation",
    items: ["Python", "pandas", "Web scraping"],
  },
  {
    id: "design",
    labelKey: "web_app.tech.design",
    items: ["Figma", "Git", "GitHub"],
  },
];

export const webPackagesCopy: SectionCopy = {
  titleKey: "web_app.packages.title",
  accentKey: "web_app.packages.accent",
  textKey: "web_app.packages.text",
};

export const webPackages: ServicePackage[] = [
  {
    id: "business-card",
    titleKey: "web_app.packages.card.title",
    textKey: "web_app.packages.card.text",
    // TODO: cena pakietu „Strona wizytówka”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "web_app.packages.card.f1",
      "web_app.packages.card.f2",
      "web_app.packages.card.f3",
    ],
  },
  {
    id: "landing",
    titleKey: "web_app.packages.landing.title",
    textKey: "web_app.packages.landing.text",
    // TODO: cena pakietu „Landing page”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "web_app.packages.landing.f1",
      "web_app.packages.landing.f2",
      "web_app.packages.landing.f3",
    ],
    highlighted: true,
  },
  {
    id: "custom-app",
    titleKey: "web_app.packages.app.title",
    textKey: "web_app.packages.app.text",
    // TODO: cena pakietu „Aplikacja na zamówienie”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "web_app.packages.app.f1",
      "web_app.packages.app.f2",
      "web_app.packages.app.f3",
    ],
  },
];

export const webBenefitsCopy: SectionCopy = {
  titleKey: "web_app.benefits.title",
  accentKey: "web_app.benefits.accent",
};

export const webBenefits: ServiceItem[] = [
  {
    id: "responsive",
    icon: FaMobileScreen,
    titleKey: "web_app.benefits.responsive.title",
    textKey: "web_app.benefits.responsive.text",
  },
  {
    id: "seo",
    icon: FaMagnifyingGlass,
    titleKey: "web_app.benefits.seo.title",
    textKey: "web_app.benefits.seo.text",
  },
  {
    id: "speed",
    icon: FaGaugeHigh,
    titleKey: "web_app.benefits.speed.title",
    textKey: "web_app.benefits.speed.text",
  },
  {
    id: "support",
    icon: FaHeadset,
    titleKey: "web_app.benefits.support.title",
    textKey: "web_app.benefits.support.text",
  },
];

export const webPortfolio: ServicePortfolioData = {
  titleKey: "web_app.portfolio.title",
  accentKey: "web_app.portfolio.accent",
  textKey: "web_app.portfolio.text",
  categories: ["website", "webapp", "automation"],
};

export const webFaqCopy: SectionCopy = {
  titleKey: "web_app.faq.title",
  accentKey: "web_app.faq.accent",
};

export const webFaq: FaqItem[] = [
  { id: "hosting", questionKey: "web_app.faq.hosting.q", answerKey: "web_app.faq.hosting.a" },
  { id: "domain", questionKey: "web_app.faq.domain.q", answerKey: "web_app.faq.domain.a" },
  { id: "content", questionKey: "web_app.faq.content.q", answerKey: "web_app.faq.content.a" },
  { id: "time", questionKey: "web_app.faq.time.q", answerKey: "web_app.faq.time.a" },
];

export const webCta: ServiceCtaData = {
  titleKey: "web_app.cta.title",
  accentKey: "web_app.cta.accent",
  textKey: "web_app.cta.text",
};

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
  eyebrowKey: "services:web.hero.eyebrow",
  titleKey: "services:web.hero.title",
  accentKey: "services:web.hero.accent",
  textKey: "services:web.hero.text",
};

export const webServicesCopy: SectionCopy = {
  titleKey: "services:web.services.title",
  accentKey: "services:web.services.accent",
  textKey: "services:web.services.text",
};

export const webServices: ServiceItem[] = [
  {
    id: "websites",
    icon: FaGlobe,
    titleKey: "services:web.services.websites.title",
    textKey: "services:web.services.websites.text",
    pointKeys: ["services:web.services.websites.p1", "services:web.services.websites.p2"],
  },
  {
    id: "webapps",
    icon: FaLaptopCode,
    titleKey: "services:web.services.webapps.title",
    textKey: "services:web.services.webapps.text",
    pointKeys: ["services:web.services.webapps.p1", "services:web.services.webapps.p2"],
  },
  {
    id: "uiux",
    icon: FaPenRuler,
    titleKey: "services:web.services.uiux.title",
    textKey: "services:web.services.uiux.text",
    pointKeys: ["services:web.services.uiux.p1", "services:web.services.uiux.p2"],
  },
  {
    id: "automation",
    icon: FaGears,
    titleKey: "services:web.services.automation.title",
    textKey: "services:web.services.automation.text",
    pointKeys: ["services:web.services.automation.p1", "services:web.services.automation.p2"],
    example: {
      labelKey: "services:web.services.automation.example_label",
      textKey: "services:web.services.automation.example",
    },
  },
];

export const webProcessCopy: SectionCopy = {
  titleKey: "services:web.process.title",
  accentKey: "services:web.process.accent",
  textKey: "services:web.process.text",
};

export const webProcess: ServiceStep[] = [
  { id: "talk", titleKey: "services:web.process.talk.title", textKey: "services:web.process.talk.text" },
  { id: "design", titleKey: "services:web.process.design.title", textKey: "services:web.process.design.text" },
  { id: "build", titleKey: "services:web.process.build.title", textKey: "services:web.process.build.text" },
  { id: "review", titleKey: "services:web.process.review.title", textKey: "services:web.process.review.text" },
  { id: "support", titleKey: "services:web.process.support.title", textKey: "services:web.process.support.text" },
];

export const webTechCopy: SectionCopy = {
  titleKey: "services:web.tech.title",
  accentKey: "services:web.tech.accent",
};

/** Nazwy technologii to nazwy własne — bez tłumaczenia. */
export const webTech: TechGroup[] = [
  {
    id: "frontend",
    labelKey: "services:web.tech.frontend",
    items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
  },
  {
    id: "backend",
    labelKey: "services:web.tech.backend",
    items: ["Python", "Django", "REST API", "SQL", "MongoDB"],
  },
  {
    id: "automation",
    labelKey: "services:web.tech.automation",
    items: ["Python", "pandas", "Web scraping"],
  },
  {
    id: "design",
    labelKey: "services:web.tech.design",
    items: ["Figma", "Git", "GitHub"],
  },
];

export const webPackagesCopy: SectionCopy = {
  titleKey: "services:web.packages.title",
  accentKey: "services:web.packages.accent",
  textKey: "services:web.packages.text",
};

export const webPackages: ServicePackage[] = [
  {
    id: "business-card",
    titleKey: "services:web.packages.card.title",
    textKey: "services:web.packages.card.text",
    // TODO: cena pakietu „Strona wizytówka”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "services:web.packages.card.f1",
      "services:web.packages.card.f2",
      "services:web.packages.card.f3",
    ],
  },
  {
    id: "landing",
    titleKey: "services:web.packages.landing.title",
    textKey: "services:web.packages.landing.text",
    // TODO: cena pakietu „Landing page”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "services:web.packages.landing.f1",
      "services:web.packages.landing.f2",
      "services:web.packages.landing.f3",
    ],
    highlighted: true,
  },
  {
    id: "custom-app",
    titleKey: "services:web.packages.app.title",
    textKey: "services:web.packages.app.text",
    // TODO: cena pakietu „Aplikacja na zamówienie”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "services:web.packages.app.f1",
      "services:web.packages.app.f2",
      "services:web.packages.app.f3",
    ],
  },
];

export const webBenefitsCopy: SectionCopy = {
  titleKey: "services:web.benefits.title",
  accentKey: "services:web.benefits.accent",
};

export const webBenefits: ServiceItem[] = [
  {
    id: "responsive",
    icon: FaMobileScreen,
    titleKey: "services:web.benefits.responsive.title",
    textKey: "services:web.benefits.responsive.text",
  },
  {
    id: "seo",
    icon: FaMagnifyingGlass,
    titleKey: "services:web.benefits.seo.title",
    textKey: "services:web.benefits.seo.text",
  },
  {
    id: "speed",
    icon: FaGaugeHigh,
    titleKey: "services:web.benefits.speed.title",
    textKey: "services:web.benefits.speed.text",
  },
  {
    id: "support",
    icon: FaHeadset,
    titleKey: "services:web.benefits.support.title",
    textKey: "services:web.benefits.support.text",
  },
];

export const webPortfolio: ServicePortfolioData = {
  titleKey: "services:web.portfolio.title",
  accentKey: "services:web.portfolio.accent",
  textKey: "services:web.portfolio.text",
  categories: ["website", "webapp", "automation"],
};

export const webFaqCopy: SectionCopy = {
  titleKey: "services:web.faq.title",
  accentKey: "services:web.faq.accent",
};

export const webFaq: FaqItem[] = [
  { id: "hosting", questionKey: "services:web.faq.hosting.q", answerKey: "services:web.faq.hosting.a" },
  { id: "domain", questionKey: "services:web.faq.domain.q", answerKey: "services:web.faq.domain.a" },
  { id: "content", questionKey: "services:web.faq.content.q", answerKey: "services:web.faq.content.a" },
  { id: "time", questionKey: "services:web.faq.time.q", answerKey: "services:web.faq.time.a" },
];

export const webCta: ServiceCtaData = {
  titleKey: "services:web.cta.title",
  accentKey: "services:web.cta.accent",
  textKey: "services:web.cta.text",
};

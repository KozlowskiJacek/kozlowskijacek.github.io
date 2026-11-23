import {
  FaBuilding,
  FaImage,
  FaScissors,
  FaUserTie,
  FaVideo,
  FaWandMagicSparkles,
  FaYoutube,
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
  ServiceTone,
} from "./types";

export const videoTone: ServiceTone = "video";
export const videoTopic: ContactTopic = "wideo";

/** Showreel w hero. null → sekcja wideo jest ukryta. */
// TODO: podać link do showreela na YouTube.
export const videoShowreelUrl: string | null = null;

export const videoHero: ServiceHeroData = {
  eyebrowKey: "services:video.hero.eyebrow",
  titleKey: "services:video.hero.title",
  accentKey: "services:video.hero.accent",
  textKey: "services:video.hero.text",
};

export const videoServicesCopy: SectionCopy = {
  titleKey: "services:video.services.title",
  accentKey: "services:video.services.accent",
  textKey: "services:video.services.text",
};

export const videoServices: ServiceItem[] = [
  {
    id: "recording",
    icon: FaVideo,
    titleKey: "services:video.services.recording.title",
    textKey: "services:video.services.recording.text",
    pointKeys: [
      "services:video.services.recording.script",
      "services:video.services.recording.shotlist",
      "services:video.services.recording.light",
      "services:video.services.recording.framing",
    ],
  },
  {
    id: "editing",
    icon: FaScissors,
    titleKey: "services:video.services.editing.title",
    textKey: "services:video.services.editing.text",
    pointKeys: [
      "services:video.services.editing.ads",
      "services:video.services.editing.vlogs",
      "services:video.services.editing.gaming",
      "services:video.services.editing.shorts",
    ],
  },
  {
    id: "graphics",
    icon: FaImage,
    titleKey: "services:video.services.graphics.title",
    textKey: "services:video.services.graphics.text",
    pointKeys: [
      "services:video.services.graphics.thumbnails",
      "services:video.services.graphics.social",
      "services:video.services.graphics.promo",
    ],
  },
  {
    id: "animation",
    icon: FaWandMagicSparkles,
    titleKey: "services:video.services.animation.title",
    textKey: "services:video.services.animation.text",
    pointKeys: [
      "services:video.services.animation.motion",
      "services:video.services.animation.captions",
      "services:video.services.animation.intro",
      "services:video.services.animation.logo",
    ],
  },
];

export const videoAudienceCopy: SectionCopy = {
  titleKey: "services:video.audience.title",
  accentKey: "services:video.audience.accent",
};

export const videoAudience: ServiceItem[] = [
  {
    id: "companies",
    icon: FaBuilding,
    titleKey: "services:video.audience.companies.title",
    textKey: "services:video.audience.companies.text",
  },
  {
    id: "creators",
    icon: FaYoutube,
    titleKey: "services:video.audience.creators.title",
    textKey: "services:video.audience.creators.text",
  },
  {
    id: "personal",
    icon: FaUserTie,
    titleKey: "services:video.audience.personal.title",
    textKey: "services:video.audience.personal.text",
  },
];

export const videoPackagesCopy: SectionCopy = {
  titleKey: "services:video.packages.title",
  accentKey: "services:video.packages.accent",
  textKey: "services:video.packages.text",
};

export const videoPackages: ServicePackage[] = [
  {
    id: "reels",
    titleKey: "services:video.packages.reels.title",
    textKey: "services:video.packages.reels.text",
    // TODO: cena pakietu „Rolki”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "services:video.packages.reels.f1",
      "services:video.packages.reels.f2",
      "services:video.packages.reels.f3",
    ],
  },
  {
    id: "recurring",
    titleKey: "services:video.packages.recurring.title",
    textKey: "services:video.packages.recurring.text",
    // TODO: cena pakietu „Montaż cykliczny”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "services:video.packages.recurring.f1",
      "services:video.packages.recurring.f2",
      "services:video.packages.recurring.f3",
    ],
    highlighted: true,
  },
  {
    id: "ad",
    titleKey: "services:video.packages.ad.title",
    textKey: "services:video.packages.ad.text",
    // TODO: cena pakietu „Film reklamowy od A do Z”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "services:video.packages.ad.f1",
      "services:video.packages.ad.f2",
      "services:video.packages.ad.f3",
    ],
  },
];

export const videoPortfolio: ServicePortfolioData = {
  titleKey: "services:video.portfolio.title",
  accentKey: "services:video.portfolio.accent",
  textKey: "services:video.portfolio.text",
  categories: ["video", "graphics", "animation"],
};

export const videoFaqCopy: SectionCopy = {
  titleKey: "services:video.faq.title",
  accentKey: "services:video.faq.accent",
};

export const videoFaq: FaqItem[] = [
  { id: "time", questionKey: "services:video.faq.time.q", answerKey: "services:video.faq.time.a" },
  { id: "revisions", questionKey: "services:video.faq.revisions.q", answerKey: "services:video.faq.revisions.a" },
  { id: "formats", questionKey: "services:video.faq.formats.q", answerKey: "services:video.faq.formats.a" },
  { id: "recording", questionKey: "services:video.faq.recording.q", answerKey: "services:video.faq.recording.a" },
];

export const videoCta: ServiceCtaData = {
  titleKey: "services:video.cta.title",
  accentKey: "services:video.cta.accent",
  textKey: "services:video.cta.text",
};

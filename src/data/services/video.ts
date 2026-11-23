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
  eyebrowKey: "video.hero.eyebrow",
  titleKey: "video.hero.title",
  accentKey: "video.hero.accent",
  textKey: "video.hero.text",
};

export const videoServicesCopy: SectionCopy = {
  titleKey: "video.services.title",
  accentKey: "video.services.accent",
  textKey: "video.services.text",
};

export const videoServices: ServiceItem[] = [
  {
    id: "recording",
    icon: FaVideo,
    titleKey: "video.services.recording.title",
    textKey: "video.services.recording.text",
    pointKeys: [
      "video.services.recording.script",
      "video.services.recording.shotlist",
      "video.services.recording.light",
      "video.services.recording.framing",
    ],
  },
  {
    id: "editing",
    icon: FaScissors,
    titleKey: "video.services.editing.title",
    textKey: "video.services.editing.text",
    pointKeys: [
      "video.services.editing.ads",
      "video.services.editing.vlogs",
      "video.services.editing.gaming",
      "video.services.editing.shorts",
    ],
  },
  {
    id: "graphics",
    icon: FaImage,
    titleKey: "video.services.graphics.title",
    textKey: "video.services.graphics.text",
    pointKeys: [
      "video.services.graphics.thumbnails",
      "video.services.graphics.social",
      "video.services.graphics.promo",
    ],
  },
  {
    id: "animation",
    icon: FaWandMagicSparkles,
    titleKey: "video.services.animation.title",
    textKey: "video.services.animation.text",
    pointKeys: [
      "video.services.animation.motion",
      "video.services.animation.captions",
      "video.services.animation.intro",
      "video.services.animation.logo",
    ],
  },
];

export const videoAudienceCopy: SectionCopy = {
  titleKey: "video.audience.title",
  accentKey: "video.audience.accent",
};

export const videoAudience: ServiceItem[] = [
  {
    id: "companies",
    icon: FaBuilding,
    titleKey: "video.audience.companies.title",
    textKey: "video.audience.companies.text",
  },
  {
    id: "creators",
    icon: FaYoutube,
    titleKey: "video.audience.creators.title",
    textKey: "video.audience.creators.text",
  },
  {
    id: "personal",
    icon: FaUserTie,
    titleKey: "video.audience.personal.title",
    textKey: "video.audience.personal.text",
  },
];

export const videoPackagesCopy: SectionCopy = {
  titleKey: "video.packages.title",
  accentKey: "video.packages.accent",
  textKey: "video.packages.text",
};

export const videoPackages: ServicePackage[] = [
  {
    id: "reels",
    titleKey: "video.packages.reels.title",
    textKey: "video.packages.reels.text",
    // TODO: cena pakietu „Rolki”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "video.packages.reels.f1",
      "video.packages.reels.f2",
      "video.packages.reels.f3",
    ],
  },
  {
    id: "recurring",
    titleKey: "video.packages.recurring.title",
    textKey: "video.packages.recurring.text",
    // TODO: cena pakietu „Montaż cykliczny”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "video.packages.recurring.f1",
      "video.packages.recurring.f2",
      "video.packages.recurring.f3",
    ],
    highlighted: true,
  },
  {
    id: "ad",
    titleKey: "video.packages.ad.title",
    textKey: "video.packages.ad.text",
    // TODO: cena pakietu „Film reklamowy od A do Z”, np. { from: 0 }. null = wycena indywidualna.
    price: null,
    featureKeys: [
      "video.packages.ad.f1",
      "video.packages.ad.f2",
      "video.packages.ad.f3",
    ],
  },
];

export const videoPortfolio: ServicePortfolioData = {
  titleKey: "video.portfolio.title",
  accentKey: "video.portfolio.accent",
  textKey: "video.portfolio.text",
  categories: ["video", "graphics", "animation"],
};

export const videoFaqCopy: SectionCopy = {
  titleKey: "video.faq.title",
  accentKey: "video.faq.accent",
};

export const videoFaq: FaqItem[] = [
  { id: "time", questionKey: "video.faq.time.q", answerKey: "video.faq.time.a" },
  { id: "revisions", questionKey: "video.faq.revisions.q", answerKey: "video.faq.revisions.a" },
  { id: "formats", questionKey: "video.faq.formats.q", answerKey: "video.faq.formats.a" },
  { id: "recording", questionKey: "video.faq.recording.q", answerKey: "video.faq.recording.a" },
];

export const videoCta: ServiceCtaData = {
  titleKey: "video.cta.title",
  accentKey: "video.cta.accent",
  textKey: "video.cta.text",
};

import type { IconType } from "react-icons";
import type { ProjectCategory } from "../projects";

/** Kolor akcentu podstrony: `video` (pomarańcz) lub `accent` (mięta). */
export type ServiceTone = "video" | "accent";

/** Temat zapytania przekazywany do formularza: /kontakt?temat=… */
export type ContactTopic = "wideo" | "web" | "praca";

/** Nagłówek sekcji: tytuł + wyróżniony akcent + opcjonalny opis. */
export type SectionCopy = {
  titleKey: string;
  accentKey: string;
  textKey?: string;
};

/** Karta usługi / grupy docelowej / korzyści. */
export type ServiceItem = {
  id: string;
  icon: IconType;
  titleKey: string;
  textKey: string;
  /** Klucze tłumaczeń punktów listy pod opisem. */
  pointKeys?: string[];
  /** Wyróżniony przykład realizacji (np. efekt automatyzacji). */
  example?: { labelKey: string; textKey: string };
};

/**
 * Cena pakietu:
 * - `{ from: 500 }` → „od 500 zł”,
 * - `null` → „wycena indywidualna”.
 */
export type PackagePrice = { from: number } | null;

export type ServicePackage = {
  id: string;
  titleKey: string;
  textKey: string;
  price: PackagePrice;
  featureKeys: string[];
  /** Pakiet wyróżniony (np. najczęściej wybierany). */
  highlighted?: boolean;
};

export type ServiceStep = {
  id: string;
  titleKey: string;
  textKey: string;
};

export type FaqItem = {
  id: string;
  questionKey: string;
  answerKey: string;
};

export type ServiceHeroData = {
  eyebrowKey: string;
  titleKey: string;
  accentKey: string;
  textKey: string;
};

export type ServiceCtaData = {
  titleKey: string;
  accentKey: string;
  textKey: string;
};

/** Mini-portfolio: realizacje z wybranych kategorii projects.ts. */
export type ServicePortfolioData = SectionCopy & {
  categories: ProjectCategory[];
};

/** Grupa technologii (np. frontend) — nazwy własne bez tłumaczenia. */
export type TechGroup = {
  id: string;
  labelKey: string;
  items: string[];
};

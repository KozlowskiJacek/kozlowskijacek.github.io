export type ProcessStep = {
  id: string;
  titleKey: string;
  /** Klucz tłumaczenia opisu (1–2 zdania). */
  textKey: string;
};

/** Etapy współpracy — sekcja „Jak pracuję” na stronie głównej. */
export const processSteps: ProcessStep[] = [
  { id: "talk", titleKey: "home:process.talk.title", textKey: "home:process.talk.text" },
  { id: "concept", titleKey: "home:process.concept.title", textKey: "home:process.concept.text" },
  { id: "build", titleKey: "home:process.build.title", textKey: "home:process.build.text" },
  { id: "review", titleKey: "home:process.review.title", textKey: "home:process.review.text" },
  { id: "support", titleKey: "home:process.support.title", textKey: "home:process.support.text" },
];

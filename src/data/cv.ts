export type CvLanguage = "pl" | "en";

/**
 * CV w PDF: public/cv/Jacek-Kozlowski-CV-PL.pdf i -EN.pdf.
 * Obecność plików sprawdza vite.config.ts przy buildzie; null = brak pliku, przycisk jest ukryty.
 */
export const cvFiles: Record<CvLanguage, string | null> = __CV_FILES__;

export const cvLanguages: CvLanguage[] = ["pl", "en"];

/** CV w języku interfejsu, a gdy go brak — w drugim języku (albo null). */
export const cvUrlFor = (language: string): string | null => {
  const preferred: CvLanguage = language.startsWith("en") ? "en" : "pl";
  const other: CvLanguage = preferred === "pl" ? "en" : "pl";
  return cvFiles[preferred] ?? cvFiles[other];
};

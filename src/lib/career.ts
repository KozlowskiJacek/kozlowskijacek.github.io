import type { CareerDate, Period } from "../data/career";

/** „2023” → „2023”, „2023-09” → „wrz 2023” / „Sep 2023”. */
export const formatCareerDate = (date: CareerDate, language: string) => {
  const [year, month] = date.split("-").map(Number);
  if (!month) return String(year);
  return new Intl.DateTimeFormat(language, { month: "short", year: "numeric" }).format(
    new Date(year, month - 1),
  );
};

/** Okres „od – do”; brak daty końcowej = `presentLabel` („obecnie”). */
export const formatPeriod = (period: Period, language: string, presentLabel: string) =>
  `${formatCareerDate(period.from, language)} – ${
    period.to ? formatCareerDate(period.to, language) : presentLabel
  }`;

export type Stat = {
  id: string;
  /** Wartość wyświetlana jako duża liczba (np. „30+”). */
  value: string;
  /** Klucz tłumaczenia podpisu. */
  labelKey: string;
};

export const stats: Stat[] = [
  { id: "projects", value: "10+", labelKey: "home:trust.stats.projects" },
  { id: "videos", value: "100+", labelKey: "home:trust.stats.videos" },
  { id: "years", value: "5", labelKey: "home:trust.stats.years" },
];

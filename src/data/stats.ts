export type Stat = {
  id: string;
  /** Wartość wyświetlana jako duża liczba (np. „30+”). */
  value: string;
  /** Klucz tłumaczenia podpisu. */
  labelKey: string;
};

// TODO: wartości są placeholderami — podmienić na prawdziwe liczby przed publikacją.
export const stats: Stat[] = [
  { id: "projects", value: "20+", labelKey: "home.trust.stats.projects" },
  { id: "videos", value: "100+", labelKey: "home.trust.stats.videos" },
  { id: "years", value: "3", labelKey: "home.trust.stats.years" },
];

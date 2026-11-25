import { useTranslation } from "react-i18next";
import { projectCategories, projectCategoryLabelKeys, type ProjectCategory } from "../../data/projects";

export type PortfolioFilter = ProjectCategory | "all";

type PortfolioFiltersProps = {
  value: PortfolioFilter;
  onChange: (value: PortfolioFilter) => void;
  /** Liczba realizacji w każdym filtrze. */
  counts: Record<PortfolioFilter, number>;
};

const filters: PortfolioFilter[] = ["all", ...projectCategories];

/** Przełączniki kategorii: zwykłe przyciski z `aria-pressed` (stan zaznaczenia ogłaszany przez czytnik). */
const PortfolioFilters = ({ value, onChange, counts }: PortfolioFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t("portfolio:page.filters_label")}
      // Telefon: jeden przewijany poziomo rząd od krawędzi do krawędzi ekranu; od `sm` zawijane i wyśrodkowane.
      className="-mx-5 flex w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:w-full sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
    >
      {/* Puste kategorie (0 realizacji) nie mają czego pokazać — chowamy je, chyba że są wybrane z adresu. */}
      {filters
        .filter((filter) => counts[filter] > 0 || filter === value)
        .map((filter) => {
          const active = filter === value;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(filter)}
              className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-small font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                active
                  ? "border-accent bg-accent text-accent-contrast"
                  : "border-border-strong bg-surface/60 text-fg-secondary hover:border-accent/50 hover:text-fg"
              }`}
            >
              {filter === "all" ? t("portfolio:page.all") : t(projectCategoryLabelKeys[filter])}
              <span
                aria-hidden="true"
                className={`text-xs tabular-nums ${active ? "text-accent-contrast/70" : "text-fg-muted"}`}
              >
                {counts[filter]}
              </span>
            </button>
          );
        })}
    </div>
  );
};

export default PortfolioFilters;

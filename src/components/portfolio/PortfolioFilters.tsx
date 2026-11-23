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
      className="flex w-full flex-wrap justify-center gap-2"
    >
      {filters.map((filter) => {
        const active = filter === value;
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(filter)}
            className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-small font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
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

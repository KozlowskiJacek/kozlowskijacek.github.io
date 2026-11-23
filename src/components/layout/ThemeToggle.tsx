import { useTranslation } from "react-i18next";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "../../lib/theme";

/**
 * Przełącznik jasny/ciemny motyw. Ikona zależy od `data-theme` na <html> przez CSS,
 * więc jest poprawna już w HTML z prerenderingu, zanim React odczyta motyw.
 */
const ThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const label = t(theme === "dark" ? "common:navbar.theme_to_light" : "common:navbar.theme_to_dark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full text-lg text-fg-secondary transition-colors hover:bg-surface-elevated hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* W ciemnym motywie słońce („włącz jasny”), w jasnym księżyc. */}
      <FaSun aria-hidden="true" className="[[data-theme=light]_&]:hidden" />
      <FaMoon aria-hidden="true" className="hidden [[data-theme=light]_&]:block" />
    </button>
  );
};

export default ThemeToggle;

import { useTranslation } from "react-i18next";

const languages = ["pl", "en"] as const;

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage === "en" ? "en" : "pl";

  const toggleLanguage = () => {
    i18n.changeLanguage(current === "pl" ? "en" : "pl");
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      title={t("common:navbar.switch_language")}
      className="-m-2 rounded-sm p-2 text-small font-semibold tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {languages.map((lang, i) => (
        <span key={lang}>
          {i > 0 && <span className="text-fg-muted"> / </span>}
          <span
            className={`transition-colors ${
              lang === current ? "text-accent" : "text-fg-secondary hover:text-fg"
            }`}
          >
            {lang.toUpperCase()}
          </span>
        </span>
      ))}
      {/* Nazwa dostępna = widoczny tekst („PL / EN”) + opis akcji. */}
      <span className="sr-only"> – {t("common:navbar.switch_language")}</span>
    </button>
  );
};

export default LanguageSwitcher;

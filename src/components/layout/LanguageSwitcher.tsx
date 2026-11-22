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
      aria-label={t("navbar.switch_language")}
      className="font-semibold tracking-wide"
    >
      {languages.map((lang, i) => (
        <span key={lang}>
          {i > 0 && <span className="text-gray_400"> / </span>}
          <span
            className={`transition-colors ${
              lang === current ? "text-main_accent" : "hover:text-main_accent"
            }`}
          >
            {lang.toUpperCase()}
          </span>
        </span>
      ))}
    </button>
  );
};

export default LanguageSwitcher;

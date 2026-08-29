import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n 
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "pl",
    debug: true,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/portfolio-web-react/translations/{{lng}}.json"
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    }
  })


  export default i18n
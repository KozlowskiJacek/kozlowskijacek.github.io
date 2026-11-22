import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationPL from '../translations/pl.json';
import translationEN from '../translations/en.json';

i18n 
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pl: { translation: translationPL },
      en: { translation: translationEN },
    },
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Atrybut lang w <html> podąża za aktywnym językiem (czytniki ekranu, SEO).
const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng.split("-")[0];
};
syncHtmlLang(i18n.resolvedLanguage ?? i18n.language ?? "pl");
i18n.on("languageChanged", syncHtmlLang);

export default i18n
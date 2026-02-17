import dayjs from "dayjs";
import i18n, { type Resource } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import esTranslation from "./locales/es/translation.json";
import frTranslation from "./locales/fr/translation.json";

export const resources: Resource = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources,
    showSupportNotice: false,
  })
  .then(() => {
    dayjs.locale(i18n.resolvedLanguage);
    document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
  });

i18n.on("languageChanged", (language) => {
  dayjs.locale(language);
  document.documentElement.lang = language;
});

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./fr.json";
import en from "./en.json";
import ar from "./ar.json";

const savedLang = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
const initialLang = savedLang || "fr";

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ar: { translation: ar }
  },
  lng: initialLang,
  fallbackLng: "fr",
  interpolation: { escapeValue: false }
});

if (typeof document !== "undefined") {
  document.body.dir = initialLang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = initialLang;
  document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
}

export default i18n;

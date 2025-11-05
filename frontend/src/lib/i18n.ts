import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "../i18n/locales/fr/common.json";
import en from "../i18n/locales/en/common.json";
import ar from "../i18n/locales/ar/common.json";

const STORAGE_KEY = "marhaban-lang";
const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE ?? "fr";

const detectLocale = (): "fr" | "en" | "ar" => {
  if (typeof window === "undefined") {
    return defaultLocale === "en" ? "en" : defaultLocale === "ar" ? "ar" : "fr";
  }

  const persisted = window.localStorage.getItem(STORAGE_KEY);
  if (persisted === "fr" || persisted === "en" || persisted === "ar") {
    return persisted as "fr" | "en" | "ar";
  }

  const browserLang = window.navigator.language.toLowerCase();
  if (browserLang.startsWith("ar")) return "ar";
  if (browserLang.startsWith("en")) return "en";
  return "fr";
};

const initialLocale = detectLocale();

void i18n.use(initReactI18next).init({
  resources: {
    fr: { common: fr },
    en: { common: en },
    ar: { common: ar }
  },
  lng: initialLocale,
  fallbackLng: "fr",
  defaultNS: "common",
  interpolation: {
    escapeValue: false
  }
});

export const changeAppLanguage = (lang: "fr" | "en" | "ar") => {
  void i18n.changeLanguage(lang);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    // Set RTL for Arabic
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }
};

if (typeof document !== "undefined") {
  document.documentElement.lang = initialLocale;
  document.documentElement.dir = initialLocale === "ar" ? "rtl" : "ltr";
}

export default i18n;

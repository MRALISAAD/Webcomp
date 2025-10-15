import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "../i18n/locales/fr/common.json";
import en from "../i18n/locales/en/common.json";

const STORAGE_KEY = "marhaban-lang";
const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE ?? "fr";

const detectLocale = (): "fr" | "en" => {
  if (typeof window === "undefined") return defaultLocale === "en" ? "en" : "fr";

  const persisted = window.localStorage.getItem(STORAGE_KEY);
  if (persisted === "fr" || persisted === "en") {
    return persisted;
  }

  const browserLang = window.navigator.language.startsWith("en") ? "en" : "fr";
  return browserLang;
};

const initialLocale = detectLocale();

void i18n.use(initReactI18next).init({
  resources: {
    fr: { common: fr },
    en: { common: en }
  },
  lng: initialLocale,
  fallbackLng: "fr",
  defaultNS: "common",
  interpolation: {
    escapeValue: false
  }
});

export const changeAppLanguage = (lang: "fr" | "en") => {
  void i18n.changeLanguage(lang);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
  }
};

if (typeof document !== "undefined") {
  document.documentElement.lang = initialLocale;
  document.documentElement.dir = "ltr";
}

export default i18n;

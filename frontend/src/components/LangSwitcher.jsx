import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
];

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return i18n.language || "fr";
    return localStorage.getItem("lang") || i18n.language || "fr";
  });

  useEffect(() => {
    if (i18n.language && i18n.language !== lang) {
      setLang(i18n.language);
    }
  }, [i18n.language, lang]);

  useEffect(() => {
    const direction = lang === "ar" ? "rtl" : "ltr";

    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
    document.body.dir = direction;
    localStorage.setItem("lang", lang);
  }, [lang, i18n]);

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
      {LANGS.map(({ code, label }) => (
        <button
          type="button"
          key={code}
          onClick={() => setLang(code)}
          className={`px-3 py-1 rounded-full text-sm transition ${
            lang === code
              ? "bg-primary text-white shadow-sm"
              : "text-slate-600 dark:text-slate-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

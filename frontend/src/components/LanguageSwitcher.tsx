import { useEffect } from "react";
import { LanguagesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { changeAppLanguage } from "../lib/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const languages: Array<{ value: "fr" | "en" | "ar"; labelKey: string; flag: string }> = [
  { value: "fr", labelKey: "language.fr", flag: "🇫🇷" },
  { value: "en", labelKey: "language.en", flag: "🇨🇦" },
  { value: "ar", labelKey: "language.ar", flag: "🇲🇦" }
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const current = languages.find((lang) => lang.value === i18n.language) ? (i18n.language as "fr" | "en" | "ar") : "fr";

  useEffect(() => {
    document.documentElement.setAttribute("lang", current);
    document.documentElement.setAttribute("dir", current === "ar" ? "rtl" : "ltr");
  }, [current]);

  const handleChange = (value: string) => {
    const lang = languages.find((item) => item.value === value);
    if (lang) {
      changeAppLanguage(lang.value);
      document.documentElement.setAttribute("lang", lang.value);
      document.documentElement.setAttribute("dir", lang.value === "ar" ? "rtl" : "ltr");
    }
  };

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="flex h-10 w-[150px] items-center justify-between rounded-full border border-[#B23A48]/40 bg-white/70 px-4 text-sm font-semibold text-[#002B5B] shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B23A48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E6] dark:border-[#B23A48]/50 dark:bg-[#0F2E56]/80 dark:text-[#E5EAF1] dark:hover:bg-[#103668] dark:focus-visible:ring-offset-[#0B2447]">
        <div className="flex items-center gap-2">
          <LanguagesIcon className="h-4 w-4" aria-hidden="true" />
          <SelectValue placeholder={t("language.label", "Langue")} />
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-2xl border border-[#B23A48]/20 bg-white/95 shadow-lg dark:border-[#B23A48]/30 dark:bg-[#0F2E56]/95">
        {languages.map((lang) => (
          <SelectItem
            key={lang.value}
            value={lang.value}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[#002B5B] transition hover:bg-[#F5F0E6] dark:text-[#E5EAF1] dark:hover:bg-[#0B2E55]"
          >
            <span role="img" aria-hidden="true">
              {lang.flag}
            </span>
            {t(lang.labelKey)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;

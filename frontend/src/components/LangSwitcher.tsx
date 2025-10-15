import { ListFilterIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { changeAppLanguage } from "../lib/i18n";

const LangSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (lang: "fr" | "en") => () => {
    changeAppLanguage(lang);
  };

  return (
    <div className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
      <ListFilterIcon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{t("language.label")}</span>
      <button
        type="button"
        onClick={handleChange("fr")}
        className={`rounded-md px-2 py-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
          i18n.language === "fr"
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
      >
        {t("language.fr")}
      </button>
      <button
        type="button"
        onClick={handleChange("en")}
        className={`rounded-md px-2 py-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
          i18n.language === "en"
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
        }`}
      >
        {t("language.en")}
      </button>
    </div>
  );
};

export default LangSwitcher;

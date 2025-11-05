import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "marhaban-theme";

const ThemeToggle = () => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      window.localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem(STORAGE_KEY, "light");
    }
  }, [isDark]);

  return (
    <button
      type="button"
      aria-label={isDark ? t("theme.light", "Mode clair") : t("theme.dark", "Mode sombre")}
      aria-pressed={isDark}
      onClick={() => setIsDark((prev) => !prev)}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B23A48]/30 bg-white text-[#B23A48] shadow-sm transition duration-300 hover:scale-105 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B23A48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0E6] dark:border-[#B23A48]/40 dark:bg-[#002B5B] dark:text-[#F5F0E6] dark:hover:scale-105 dark:hover:shadow-lg dark:focus-visible:ring-offset-[#002B5B]"
    >
      {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;

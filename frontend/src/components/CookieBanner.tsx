import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const STORAGE_KEY = "marhaban-cookie";

const CookieBanner = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = window.localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl rounded-t-2xl border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">{t("cookie.message")}</p>
      <div className="mt-3 flex justify-end">
        <Button size="sm" onClick={accept}>
          {t("cookie.accept")}
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;

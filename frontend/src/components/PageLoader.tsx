import { Loader2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

const PageLoader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2Icon className="h-12 w-12 animate-spin text-primary" />
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {t("common.loading", "Loading...")}
        </p>
      </div>
    </div>
  );
};

export default PageLoader;


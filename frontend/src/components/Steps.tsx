import { useTranslation } from "react-i18next";
import { Card } from "./ui/card";

const Steps = () => {
  const { t } = useTranslation();
  const steps = t("steps.items", { returnObjects: true }) as string[];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-ink dark:text-textLight">{t("steps.title")}</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={step} className="h-full space-y-3 border-none bg-zinc-50/80 p-6 dark:bg-zinc-900/80">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-lg font-semibold">
              {index + 1}
            </span>
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{step}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Steps;

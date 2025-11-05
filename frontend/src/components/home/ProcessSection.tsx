import { ArrowRightIcon, CalendarIcon, FileCheckIcon, PlaneIcon, CheckCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import { Button } from "../ui/button";

const ProcessSection = () => {
  const { t } = useTranslation();
  const steps = t("process.steps", { returnObjects: true }) as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  const icons = [
    { Icon: CalendarIcon, color: "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300" },
    { Icon: FileCheckIcon, color: "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300" },
    { Icon: PlaneIcon, color: "text-primary bg-red-100 dark:bg-red-900 dark:text-red-300" },
    { Icon: CheckCircleIcon, color: "text-secondary bg-green-100 dark:bg-green-900 dark:text-green-300" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950">
      <Container>
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-ink dark:text-white">
              {t("process.title")}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-300">
              {t("process.subtitle")}
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const IconComponent = icons[index]?.Icon;
              const iconColor = icons[index]?.color;

              return (
                <div key={step.number} className="relative">
                  {/* Step Card */}
                  <div className="relative h-full rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-zinc-700">
                    {/* Icon */}
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${iconColor} mb-4`}>
                      {IconComponent && <IconComponent className="h-7 w-7" />}
                    </div>

                    {/* Number Badge */}
                    <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                      {step.number}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-ink dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRightIcon className="h-6 w-6 text-zinc-400 dark:text-zinc-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link to="/processus">
                {t("process.cta")}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProcessSection;


import { ArrowRightIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-white to-secondary/10 p-8 shadow-xl dark:from-primary/20 dark:via-zinc-950 dark:to-secondary/10 sm:p-12">
      <div className="grid gap-10 md:grid-cols-[1.4fr,1fr] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Marhaban Canada
          </span>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink dark:text-white sm:text-4xl lg:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="max-w-xl text-lg text-zinc-700 dark:text-zinc-300">{t("hero.subtitle")}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/packs">
                {t("hero.ctaPrimary")}
                <ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? ""}`} target="_blank" rel="noopener noreferrer">
                <MessageCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                {t("hero.ctaSecondary")}
              </a>
            </Button>
          </div>
        </div>
        <figure className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-900">
          <img
            src="/images/hero.jpg"
            alt="Accueil chaleureux à l'aéroport de Montréal"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
};

export default Hero;

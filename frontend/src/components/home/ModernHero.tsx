import { ArrowRightIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import Container from "../Container";
import { MapPinIcon } from "lucide-react";

const ModernHero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20">
              <MapPinIcon className="h-4 w-4" />
              <span>{t("trust.badge")}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink dark:text-white md:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>

            {/* Subtitle */}
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-xl">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primaryDark">
                <Link to="/packs">
                  {t("hero.ctaPrimary")}
                  <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-secondary text-secondary transition hover:-translate-y-0.5 hover:bg-secondary hover:text-primary"
                asChild
              >
                <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? ""}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t("hero.ctaSecondary")}
                </a>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/images/hero.jpg"
                alt="Accueil chaleureux à l'aéroport de Montréal"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ModernHero;


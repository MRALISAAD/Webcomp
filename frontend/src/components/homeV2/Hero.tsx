import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import Container from "../Container";
import { marhabanImages } from "../../lib/media";

const Hero = () => {
  const { t } = useTranslation();
  const heroPoints = t("home.hero.points", { returnObjects: true }) as string[];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5EF] via-white to-[#E8DFCF] py-24 text-textDark transition-colors duration-300 ease-out dark:from-[#0B2139] dark:via-[#0A2239] dark:to-[#091c31] dark:text-textLight">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_55%)]" />
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center rounded-full bg-[#D4AF37]/15 px-4 py-1 text-sm font-semibold text-[#D4AF37]">
            {t("home.hero.badge")}
          </span>
          <h1
            className="text-4xl font-bold leading-tight tracking-tight text-[#0A2239] dark:text-[#EAEAEA] md:text-5xl lg:text-6xl"
            dangerouslySetInnerHTML={{ __html: t("home.hero.title") }}
          />
          <p className="max-w-2xl text-lg text-mutedLight dark:text-[#AAB4C2]">
            {t("home.hero.subtitle")}
          </p>
          <ul className="grid gap-3 text-sm text-mutedLight dark:text-[#AAB4C2] sm:grid-cols-2">
            {heroPoints.map((point, index) => (
              <li
                key={index}
                className="inline-flex items-center gap-3 rounded-xl bg-white/80 px-4 py-2 shadow-sm ring-1 ring-[#D4AF37]/15 transition-colors duration-300 dark:bg-[#112A46]/80 dark:ring-[#D4AF37]/25"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#D4AF37] px-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#C39D2C] hover:shadow-xl"
            >
              <Link to="/packs">
                {t("home.hero.cta")}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-sm text-mutedLight dark:text-[#AAB4C2]">{t("home.hero.note")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 hidden h-28 w-28 rounded-full bg-[#D4AF37]/25 blur-3xl md:block" />
          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-white shadow-2xl">
            <img
              src={marhabanImages.montreal}
              alt={t("home.hero.imageAlt")}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;

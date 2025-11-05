import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Container from "../Container";
import SectionShell from "../layout/SectionShell";
import { marhabanImages } from "../../lib/media";

const WelcomeMontreal = () => {
  const { t } = useTranslation();

  return (
    <SectionShell
      tone="solid"
      className="relative overflow-hidden text-textDark transition-colors duration-300 ease-out dark:text-textLight"
    >
      <div
        className="absolute inset-0 -z-10 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${marhabanImages.montreal})` }}
      >
        <div className="absolute inset-0 bg-white/75 backdrop-blur-sm dark:bg-navy/80" />
      </div>

      <Container className="grid gap-10 lg:grid-cols-[1.2fr_minmax(0,0.8fr)] lg:items-center">
        <div className="space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center rounded-full bg-gold/15 px-4 py-1 text-sm font-semibold text-gold"
          >
            {t("home.montreal.badge", "Bienvenue à Montréal")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold leading-tight md:text-4xl"
          >
            {t("home.montreal.title", "Votre nouvelle vie commence ici")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-mutedLight dark:text-mutedDark"
          >
            {t(
              "home.montreal.subtitle",
              "Logement, démarches administratives et intégration culturelle : notre équipe est basée à Montréal pour vous guider à chaque pas."
            )}
          </motion.p>
        </div>

        <motion.img
          src={marhabanImages.montreal}
          alt={t("home.alt.montreal")}
          loading="lazy"
          className="h-72 w-full rounded-2xl object-cover shadow-md opacity-95 dark:opacity-90 lg:h-80"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
      </Container>
    </SectionShell>
  );
};

export default WelcomeMontreal;

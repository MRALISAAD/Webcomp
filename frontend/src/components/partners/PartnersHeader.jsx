import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";
import { marhabanImages } from "../../lib/media";
import { useTranslation } from "react-i18next";

export default function PartnersHeader({ title, subtitle, intro, isRTL }) {
  const { t } = useTranslation();

  return (
    <motion.section
      className="section-shell section-gradient-light font-poppins text-textDark transition-colors duration-300 ease-out dark:section-gradient-dark dark:text-textLight"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className={clsx("mx-auto max-w-5xl space-y-6 text-center", isRTL && "text-right md:text-center")}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Réseau premium</p>
        <h1 className="text-4xl font-bold text-textDark dark:text-textLight">{title}</h1>
        <p className="text-lg leading-relaxed text-mutedLight dark:text-mutedDark">{subtitle}</p>
        <p className="text-base leading-relaxed text-mutedLight dark:text-mutedDark">{intro}</p>
        <img
          src={marhabanImages.handshake}
          alt={t("partners.alt.handshake")}
          loading="lazy"
          className="mx-auto mt-8 max-h-80 w-full rounded-2xl object-cover shadow-md opacity-95 dark:opacity-90"
        />
      </Container>
    </motion.section>
  );
}

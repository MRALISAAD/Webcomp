import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";
import { marhabanImages } from "../../lib/media";
import { useTranslation } from "react-i18next";

export default function PartnersCTA({ data, isRTL, onOpen }) {
  if (!data) return null;
  const { t } = useTranslation();

  return (
    <motion.section
      className="section-shell section-gradient-light text-textDark dark:section-gradient-dark dark:text-textLight"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className={clsx("space-y-6 text-center", isRTL && "text-right md:text-center")}>
        <h2 className="text-3xl font-bold md:text-4xl">{data.title}</h2>
        <p className="mt-4 text-lg text-mutedLight dark:text-mutedDark">{data.text}</p>
        <img
          src={marhabanImages.meeting}
          alt={t("partners.alt.meeting")}
          loading="lazy"
          className="mx-auto max-h-72 w-full rounded-2xl object-cover shadow-md opacity-95 dark:opacity-90"
        />
        {onOpen ? (
          <button
            type="button"
            onClick={onOpen}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-sm font-semibold text-navy shadow-xl transition hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-gold-hover hover:shadow-2xl"
          >
            {data.button}
          </button>
        ) : (
          <a
            href={data.href}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-sm font-semibold text-navy shadow-xl transition hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-gold-hover hover:shadow-2xl"
          >
            {data.button}
          </a>
        )}
      </Container>
    </motion.section>
  );
}

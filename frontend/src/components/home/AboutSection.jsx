import { memo } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";
import buttonVariants, { getButtonClasses } from "../../utils/buttonVariants.js";

const AboutSection = memo(function AboutSection({ data, isRTL }) {
  if (!data) return null;

  const ctaVariant = data.cta?.variant || "outlineGreen";

  return (
    <motion.section
      id="about"
      aria-label={data.title}
      role="region"
      className="bg-white py-20 font-inter dark:bg-slate-950 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className={clsx("space-y-8", isRTL && "text-right")}>
        <motion.h2 className="text-3xl font-semibold text-primary dark:text-rose-200" variants={sectionVariants}>
          {data.title}
        </motion.h2>
        <motion.p className="text-lg leading-relaxed text-grayText dark:text-slate-300" variants={sectionVariants}>
          {data.text}
        </motion.p>
        {data.highlights?.length ? (
          <motion.ul className="space-y-3 text-sm text-gray-800 dark:text-slate-200" variants={sectionVariants}>
            {data.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span aria-hidden="true" className="text-secondary dark:text-emerald-300">
                  ◆
                </span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        ) : null}
        <motion.div
          className={clsx(
            "flex flex-wrap items-center gap-4 text-sm font-semibold text-grayText dark:text-slate-300",
            isRTL ? "justify-end" : "justify-start"
          )}
          variants={sectionVariants}
        >
          {data.cta ? (
            <a href={data.cta.href} className={getButtonClasses(ctaVariant)}>
              {data.cta.label}
            </a>
          ) : null}
          {data.contactLabel ? (
            <a href={`mailto:${data.contactLabel}`} className={buttonVariants.ghost}>
              {data.contactLabel}
            </a>
          ) : null}
        </motion.div>
      </Container>
    </motion.section>
  );
});

export default AboutSection;

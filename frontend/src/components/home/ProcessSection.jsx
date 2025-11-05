import { memo } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants, staggerChildren } from "../../utils/animations.js";
import { getButtonClasses } from "../../utils/buttonVariants.js";

const ProcessSection = memo(function ProcessSection({ data, isRTL }) {
  if (!data) return null;

  return (
    <motion.section
      id="processus"
      aria-label={data.title}
      role="region"
      className="bg-white py-20 font-inter dark:bg-slate-950 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container>
        <motion.h2
          className={clsx("text-3xl font-semibold text-primary dark:text-rose-200", isRTL && "text-right")}
          variants={sectionVariants}
        >
          {data.title}
        </motion.h2>
        <motion.p
          className={clsx(
            "mt-4 max-w-3xl text-lg leading-relaxed text-grayText dark:text-slate-300",
            isRTL ? "ml-auto text-right" : "text-left"
          )}
          variants={sectionVariants}
        >
          {data.subtitle}
        </motion.p>
        <motion.ol
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          {data.steps?.map((step, index) => (
            <motion.li
              key={step}
              className={clsx(
                "rounded-3xl border border-beige bg-beige p-5 text-sm font-medium text-grayText dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
                isRTL && "text-right"
              )}
              custom={index}
              variants={staggerChildren}
            >
              {step}
            </motion.li>
          ))}
        </motion.ol>
        {data.cta ? (
          <motion.div className="mt-12 flex justify-center" variants={sectionVariants}>
            <a href={data.cta.href} className={getButtonClasses(data.cta.variant)}>
              {data.cta.label}
            </a>
          </motion.div>
        ) : null}
      </Container>
    </motion.section>
  );
});

export default ProcessSection;

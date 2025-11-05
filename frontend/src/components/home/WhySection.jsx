import { memo } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants, staggerChildren } from "../../utils/animations.js";

const WhySection = memo(function WhySection({ data, isRTL }) {
  if (!data) return null;

  return (
    <motion.section
      id="why"
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
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {data.cards?.map((card, index) => (
            <motion.article
              key={card.title}
              className={clsx(
                "rounded-3xl border border-beige bg-beige p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800",
                isRTL && "text-right"
              )}
              custom={index}
              variants={staggerChildren}
            >
              <div aria-hidden="true" className="text-4xl">
                {card.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-secondary dark:text-emerald-300">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-grayText dark:text-slate-300">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </motion.section>
  );
});

export default WhySection;

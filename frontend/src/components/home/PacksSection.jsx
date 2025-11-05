import { memo } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants, staggerChildren } from "../../utils/animations.js";
import { getButtonClasses } from "../../utils/buttonVariants.js";

const PacksSection = memo(function PacksSection({ data, isRTL }) {
  if (!data) return null;

  return (
    <motion.section
      id="packs"
      aria-label={data.title}
      role="region"
      className="bg-beige py-20 font-inter dark:bg-slate-900 md:py-24"
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
          {data.intro}
        </motion.p>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {data.cards?.map((pack, index) => (
            <motion.article
              key={pack.name}
              className={clsx(
                "rounded-3xl border border-white bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800",
                isRTL && "text-right"
              )}
              custom={index}
              variants={staggerChildren}
            >
              <h3 className="text-xl font-semibold text-secondary dark:text-emerald-300">{pack.name}</h3>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-grayText dark:text-slate-300">
                {pack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
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

export default PacksSection;

import { memo } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants, staggerChildren } from "../../utils/animations.js";

const TechnologySection = memo(function TechnologySection({ data, isRTL }) {
  if (!data) return null;

  return (
    <motion.section
      id="technology"
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
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {data.items?.map((item, index) => (
            <motion.div
              key={item}
              className={clsx(
                "rounded-3xl border border-beige bg-beige p-6 text-sm font-medium text-grayText dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
                isRTL && "text-right"
              )}
              custom={index}
              variants={staggerChildren}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  );
});

export default TechnologySection;

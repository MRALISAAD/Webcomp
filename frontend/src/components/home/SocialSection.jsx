import { memo } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";

const SocialSection = memo(function SocialSection({ data, isRTL }) {
  if (!data) return null;

  return (
    <motion.section
      id="social"
      aria-label={data.title}
      role="region"
      className="bg-beige py-20 font-inter dark:bg-slate-900 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className={clsx("space-y-6", isRTL ? "text-right" : "text-center")}>
        <motion.h2 className="text-3xl font-semibold text-primary dark:text-rose-200" variants={sectionVariants}>
          {data.title}
        </motion.h2>
        <motion.p className="text-lg text-grayText dark:text-slate-300" variants={sectionVariants}>
          {data.text}
        </motion.p>
      </Container>
    </motion.section>
  );
});

export default SocialSection;

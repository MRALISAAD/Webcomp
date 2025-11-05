import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";

export default function PackHeader({ title, subtitle, isRTL }) {
  return (
    <motion.section
      id="packs-hero"
      aria-label={title}
      className="bg-white py-20 font-poppins dark:bg-slate-900 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className={clsx("mx-auto max-w-3xl", isRTL ? "text-right md:text-center" : "text-center")}>
        <h1 className="text-4xl font-bold text-primary dark:text-rose-200">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-grayText dark:text-slate-300">{subtitle}</p>
      </Container>
    </motion.section>
  );
}

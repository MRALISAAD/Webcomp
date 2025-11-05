import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";

export default function ProcessHeader({ title, subtitle, isRTL }) {
  return (
    <motion.section
      className="section-shell section-gradient-light text-center font-poppins dark:section-gradient-dark"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className={clsx("mx-auto max-w-3xl space-y-4", isRTL && "text-right md:text-center")}>
        <h1 className="text-4xl font-bold text-textDark dark:text-textLight">{title}</h1>
        <p className="mx-auto text-lg leading-relaxed text-mutedLight dark:text-mutedDark">{subtitle}</p>
      </Container>
    </motion.section>
  );
}

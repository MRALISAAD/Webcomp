import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";

export default function ProcessCTA({ data, isRTL }) {
  if (!data) return null;

  return (
    <motion.section
      className="section-shell section-gradient-light text-textDark dark:section-gradient-dark dark:text-textLight"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className={clsx("text-center", isRTL && "text-right")}> 
        <h2 className="text-3xl font-bold md:text-4xl">{data.title}</h2>
        <a
          href={data.href}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-10 py-3 text-base font-semibold text-navy shadow-lg transition hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-gold-hover hover:shadow-2xl"
        >
          {data.button}
        </a>
      </Container>
    </motion.section>
  );
}

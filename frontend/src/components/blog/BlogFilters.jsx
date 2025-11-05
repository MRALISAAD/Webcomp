import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";

export default function BlogFilters({ categories = [], active = "Tous", onChange }) {
  if (!categories.length) return null;

  return (
    <motion.section
      className="bg-beige py-6 dark:bg-slate-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onChange?.(category)}
            className={clsx(
              "rounded-full border px-5 py-2 text-sm font-semibold transition",
              active === category
                ? "border-primary bg-primary text-white shadow-md"
                : "border-primary/30 bg-white text-primary hover:border-primary"
            )}
          >
            {category}
          </button>
        ))}
      </Container>
    </motion.section>
  );
}

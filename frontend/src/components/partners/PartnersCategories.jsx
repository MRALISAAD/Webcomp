import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants, staggerChildren } from "../../utils/animations.js";

export default function PartnersCategories({ categories = [], isRTL }) {
  if (!categories.length) return null;

  return (
    <motion.section
      className="section-shell section-gradient-light dark:section-gradient-dark"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.article
              key={category.title}
              className={clsx(
                "flex h-full flex-col rounded-3xl border border-gold/20 bg-white p-8 text-center shadow-xl transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl dark:border-gold/20 dark:bg-navyLight",
                isRTL && "text-right"
              )}
              custom={index}
              variants={staggerChildren}
            >
              <div className="mb-4 flex items-center justify-center text-gold">
                {Icon ? <Icon className="h-6 w-6" /> : null}
              </div>
              <h4 className="text-lg font-semibold text-textDark dark:text-textLight">{category.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-mutedLight dark:text-mutedDark">{category.text}</p>
            </motion.article>
          );
        })}
      </Container>
    </motion.section>
  );
}

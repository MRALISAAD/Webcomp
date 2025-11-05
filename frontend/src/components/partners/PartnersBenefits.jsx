import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants, staggerChildren } from "../../utils/animations.js";

export default function PartnersBenefits({ benefits = [], isRTL }) {
  if (!benefits.length) return null;

  return (
    <motion.section
      className="section-shell section-gradient-light font-inter dark:section-gradient-dark"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.article
              key={benefit.title}
              className={clsx(
                "rounded-3xl border border-gold/20 bg-white p-8 shadow-lg transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl dark:border-gold/20 dark:bg-navyLight",
                isRTL && "text-right"
              )}
              custom={index}
              variants={staggerChildren}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                {Icon ? <Icon className="h-5 w-5" /> : null}
              </div>
              <h3 className="text-lg font-semibold text-textDark dark:text-textLight">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mutedLight dark:text-mutedDark">{benefit.text}</p>
            </motion.article>
          );
        })}
      </Container>
    </motion.section>
  );
}

import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { staggerChildren } from "../../utils/animations.js";

export default function ProcessTimeline({ steps = [], isRTL }) {
  return (
    <section className="section-shell section-gradient-light font-inter dark:section-gradient-dark">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.id}
                className={clsx(
                  "relative flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-lightGray transition-all duration-200 hover:shadow-md dark:bg-navyLight dark:ring-gold/20",
                  isRTL && "text-right"
                )}
                custom={index}
                variants={staggerChildren}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="inline-flex w-fit items-center gap-3 rounded-full bg-primary/10 px-3 py-1 text-primary dark:bg-primary/20">
                  {Icon ? <Icon className={clsx("h-4 w-4", step.color)} /> : null}
                  <span className="text-xs font-semibold">{String(step.id).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-semibold text-textDark dark:text-textLight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-mutedLight dark:text-mutedDark">{step.text}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

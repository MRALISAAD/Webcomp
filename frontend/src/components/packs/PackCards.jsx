import clsx from "clsx";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants, staggerChildren } from "../../utils/animations.js";

export default function PackCards({ packs = [], isRTL, onSelectPack }) {
  return (
    <motion.section
      id="packs-list"
      aria-label="Packs Marhaban"
      className="bg-beige py-20 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack, index) => (
          <motion.article
            key={pack.name}
            className={clsx(
              "flex h-full flex-col rounded-3xl border border-white bg-white p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800",
              isRTL && "text-right"
            )}
            custom={index}
            variants={staggerChildren}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
                {pack.name}
              </p>
              <p className="mt-1 text-3xl font-bold text-primary">{pack.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-grayText dark:text-slate-300">
                {pack.description}
              </p>
            </div>
            <ul className="mt-6 flex flex-1 flex-col space-y-2 text-sm text-gray-800 dark:text-slate-200">
              {pack.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-secondary">✔️</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onSelectPack?.(pack.name)}
              className="mt-6 w-full rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-primary shadow-md transition hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-secondaryDark hover:shadow-lg"
            >
              {pack.button}
            </button>
          </motion.article>
        ))}
      </Container>
    </motion.section>
  );
}

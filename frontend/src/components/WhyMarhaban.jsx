import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function WhyMarhaban() {
  const { t } = useTranslation();
  const items = t("home.why.items", { returnObjects: true });

  return (
    <section className="bg-white px-6 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-primary">
          {t("home.why.title")}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-gray-400/10 bg-beige/50 p-6 text-left shadow-sm dark:border-white/10 dark:bg-gray-900/40"
            >
              <h3 className="text-lg font-semibold text-secondary">{item.title}</h3>
              <p className="mt-2 text-sm text-grayText/80 dark:text-beige/80">
                {item.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

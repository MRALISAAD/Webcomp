import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation();
  const entries = t("testimonials.items", { returnObjects: true });
  const hero = t("testimonials.hero", { returnObjects: true });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!entries.length) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % entries.length);
    }, 6000);
    return () => clearInterval(id);
  }, [entries.length]);

  const current = entries[index] || {};

  return (
    <section className="bg-beige py-16 text-center dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-primary">{hero.title}</h2>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-grayText/80 dark:text-beige/80">
        {hero.subtitle}
      </p>

      <div className="relative mx-auto mt-10 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${current.name}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-gray-400/10 bg-white p-8 shadow-xl dark:border-gold/20 dark:bg-navyLight"
          >
            <p className="text-lg italic text-grayText dark:text-beige/90">{current.text}</p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-secondary">
              {current.name}
            </p>
            {current.video && (
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  src={current.video}
                  title={current.name}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {entries.map((item, idx) => (
          <button
            key={item.name}
            onClick={() => setIndex(idx)}
            className={`h-2 w-10 rounded-full transition ${
              idx === index ? "bg-primary" : "bg-gray-400/30 dark:bg-white/20"
            }`}
            aria-label={`${item.name}`}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}

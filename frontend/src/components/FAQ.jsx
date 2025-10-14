import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true });

  return (
    <section className="card space-y-6 bg-white/95 py-10 dark:bg-slate-900">
      <div className="space-y-4 text-center">
        <h2 className="section-title">{t("faq.title")}</h2>
        <p className="section-subtitle">{t("faq.subtitle")}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, idx) => (
          <article key={idx} className="card space-y-3 bg-white dark:bg-slate-950">
            <h3 className="text-lg font-semibold text-primary">{item.question}</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

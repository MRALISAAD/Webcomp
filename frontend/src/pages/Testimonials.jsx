import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setMetaDescription, setPageTitle } from "../utils/seo.js";

export default function Testimonials() {
  const { t, i18n } = useTranslation();
  const testimonials = t("testimonials.items", { returnObjects: true });

  useEffect(() => {
    const seo = t("seo.testimonials", { returnObjects: true });
    setPageTitle(seo.title);
    setMetaDescription(seo.description);
  }, [t, i18n.language]);

  return (
    <section className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="section-title">{t("testimonials.title")}</h1>
        <p className="section-subtitle">{t("testimonials.subtitle")}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.name} className="card space-y-3">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              “{testimonial.message}”
            </p>
            <div className="text-sm font-semibold text-primary">{testimonial.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{testimonial.country}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

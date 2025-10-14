import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setMetaDescription, setPageTitle } from "../utils/seo.js";

export default function Services() {
  const { t, i18n } = useTranslation();
  const services = t("services.items", { returnObjects: true });

  useEffect(() => {
    const seo = t("seo.services", { returnObjects: true });
    setPageTitle(seo.title);
    setMetaDescription(seo.description);
  }, [t, i18n.language]);

  return (
    <section className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="section-title">{t("services.title")}</h1>
        <p className="section-subtitle">{t("services.subtitle")}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="card space-y-3">
            <h3 className="text-xl font-semibold text-navy dark:text-white">{service.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

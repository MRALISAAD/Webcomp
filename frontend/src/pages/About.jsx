import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setMetaDescription, setPageTitle } from "../utils/seo.js";

export default function About() {
  const { t, i18n } = useTranslation();
  const values = t("about.values", { returnObjects: true });

  useEffect(() => {
    const seo = t("seo.about", { returnObjects: true });
    setPageTitle(seo.title);
    setMetaDescription(seo.description);
  }, [t, i18n.language]);

  return (
    <section className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="section-title">{t("about.title")}</h1>
        <p className="section-subtitle">{t("about.subtitle")}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="card space-y-3">
            <h3 className="text-xl font-semibold text-navy dark:text-white">{value.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FAQ from "../components/FAQ.jsx";
import { setMetaDescription, setPageTitle } from "../utils/seo.js";

const WHATSAPP_LINK = "https://wa.me/<MON_NUMERO>?text=Bonjour%20Marhaban%20Canada";

export default function Home() {
  const { t, i18n } = useTranslation();
  const highlights = t("home.highlights", { returnObjects: true });

  useEffect(() => {
    const seo = t("seo.home", { returnObjects: true });
    setPageTitle(seo.title);
    setMetaDescription(seo.description);
  }, [t, i18n.language]);

  return (
    <div className="space-y-16">
      <section className="hero rounded-3xl border border-white/60 bg-white/90 px-6 py-12 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-navy dark:text-white md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-200">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/packs" className="btn btn-primary">
                {t("hero.cta_primary")}
              </Link>
              <a href={WHATSAPP_LINK} className="btn btn-secondary">
                {t("hero.cta_secondary")}
              </a>
            </div>
          </div>
          <figure className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg dark:border-slate-700">
            <img
              src="/images/hero.jpg"
              loading="lazy"
              alt="Arrivée à l'aéroport de Montréal, équipe d'accueil Marhaban Canada"
              className="h-full w-full object-cover"
            />
            <figcaption className="sr-only">
              {t("hero.subtitle")}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section -mt-8 rounded-3xl bg-white/80 px-6 py-12 shadow-sm backdrop-blur dark:bg-slate-900/80 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <article key={item.title} className="card space-y-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-2xl">
                {["🏠", "🗂️", "🤝"][index] || "✨"}
              </span>
              <h3 className="text-xl font-semibold text-navy dark:text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <FAQ />
    </div>
  );
}

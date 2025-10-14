import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setMetaDescription, setPageTitle } from "../utils/seo.js";

const ICONS = ["🎒", "🏡", "🌟"];

function getPackValue(pack) {
  if (pack.value) return pack.value;
  if (pack.slug) return pack.slug;
  return pack.name;
}

export default function Packs() {
  const { t, i18n } = useTranslation();
  const packs = t("packs.list", { returnObjects: true });

  useEffect(() => {
    const seo = t("seo.packs", { returnObjects: true });
    setPageTitle(seo.title);
    setMetaDescription(seo.description);
  }, [t, i18n.language]);

  return (
    <section className="space-y-10">
      <header className="space-y-4 text-center">
        <h1 className="section-title">{t("packs.title")}</h1>
        <p className="section-subtitle">{t("packs.subtitle")}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {packs.map((pack, index) => {
          const value = getPackValue(pack);
          return (
            <article key={pack.name} className="card flex flex-col gap-4">
              <span className="text-3xl">{ICONS[index] || "✨"}</span>
              <div>
                <h3 className="text-xl font-semibold text-navy dark:text-white">{pack.name}</h3>
                <p className="text-lg font-bold text-primary">{pack.price}</p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                {pack.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className="btn btn-primary mt-auto w-fit"
                href={`/contact?pack=${encodeURIComponent(value)}`}
                aria-label={t("contact.cta")}
              >
                {t("contact.cta")}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

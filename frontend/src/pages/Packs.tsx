import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import PricingTable from "../components/PricingTable";
import FAQAccordion from "../components/FAQAccordion";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";

const Packs = () => {
  const { t, i18n } = useTranslation();
  const seo = t("seo.packs", { returnObjects: true }) as {
    title: string;
    description: string;
    path: string;
  };
  const og = getOpenGraph({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    locale: i18n.language === "en" ? "en_CA" : "fr_CA"
  });

  return (
    <div className="space-y-16">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={buildCanonicalUrl(seo.path)} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        {og.images?.[0] && <meta property="og:image" content={og.images[0].url} />}
        <meta property="og:site_name" content={og.siteName} />
        <meta property="og:locale" content={og.locale} />
      </Helmet>

      <header className="space-y-4">
        <h1 className="text-4xl font-semibold text-ink dark:text-white">{t("pricing.title")}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300">{t("pricing.subtitle")}</p>
      </header>

      <PricingTable />
      <FAQAccordion />
    </div>
  );
};

export default Packs;

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import FAQAccordion from "../components/FAQAccordion";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const seo = t("seo.faq", { returnObjects: true }) as {
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
    <section className="bg-beige transition-colors duration-300 ease-out dark:bg-navy">
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

      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 pt-20 md:pt-28 pb-24">
        <header className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#0A2239] dark:text-[#EAEAEA]">
            {t("faq.title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#AAB4C2]">
            {t("faq.intro")}
          </p>
        </header>

        <FAQAccordion />
      </div>
    </section>
  );
};

export default FAQ;

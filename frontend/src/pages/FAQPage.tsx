import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import FAQ from "../components/faq/FAQ";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";
import { Button } from "../components/ui/button";

const FAQPage = () => {
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
    locale: i18n.language === "en" ? "en_CA" : "fr_CA",
  });

  return (
    <>
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

      {/* Hero */}
      <section className="bg-beige py-16 dark:bg-navy">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-bold text-textMain sm:text-5xl dark:text-textLight">{t("faq.title")}</h1>
          <p className="mt-4 text-lg text-mutedLight dark:text-mutedDark">{t("faq.intro")}</p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="bg-beige py-20 dark:bg-navy">
        <div className="mx-auto max-w-4xl px-6">
          <FAQ />
          <div className="mt-10 text-center">
            <Button asChild className="bg-primary hover:bg-primaryDark text-white">
              <Link to="/contact">{t("cta.contactTeam")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;



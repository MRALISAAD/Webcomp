import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const { t, i18n } = useTranslation();
  const seo = t("seo.notFound", { returnObjects: true }) as {
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
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
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

      <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
      <h1 className="text-4xl font-semibold text-ink dark:text-white">{seo.title}</h1>
      <p className="text-base text-zinc-600 dark:text-zinc-300">{seo.description}</p>
      <Button asChild>
        <Link to="/">{t("cta.discoverPacks")}</Link>
      </Button>
    </div>
  );
};

export default NotFound;

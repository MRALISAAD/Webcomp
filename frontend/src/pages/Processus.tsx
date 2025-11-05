import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ProcessHeader, ProcessTimeline, ProcessCTA } from "../components/processus";
import processContent from "../data/processContent";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";

const Processus = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en" | "ar";
  const content = processContent[lang] || processContent.fr;
  const isRTL = lang === "ar";

  const og = getOpenGraph({
    title: content.title,
    description: content.subtitle,
    path: "/processus",
    locale: lang === "en" ? "en_CA" : lang === "ar" ? "ar_CA" : "fr_CA"
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{content.title} — Marhaban Canada</title>
        <meta name="description" content={content.subtitle} />
        <link rel="canonical" href={buildCanonicalUrl("/processus")} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        {og.images?.[0] && <meta property="og:image" content={og.images[0].url} />}
        <meta property="og:site_name" content={og.siteName} />
        <meta property="og:locale" content={og.locale} />
        <html dir={content.direction} />
      </Helmet>

      <ProcessHeader title={content.title} subtitle={content.subtitle} isRTL={isRTL} />
      <ProcessTimeline steps={content.steps} isRTL={isRTL} />
      <ProcessCTA data={content.cta} isRTL={isRTL} />
    </div>
  );
};

export default Processus;


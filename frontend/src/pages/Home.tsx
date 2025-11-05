import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import HomeV2 from "../components/homeV2/HomeV2";
import { buildCanonicalUrl, getOpenGraph, organizationJsonLd, productsJsonLd } from "../lib/seo";
import { marhabanImages } from "../lib/media";

const Home = () => {
  const { t, i18n } = useTranslation();
  const seo = t("seo.home", { returnObjects: true }) as {
    title: string;
    description: string;
    path: string;
  };

  const homeTitle =
    seo.title ?? "Marhaban Canada — Simplifier l’arrivée, humaniser l’intégration";
  const homeDescription =
    seo.description ??
    "Accompagnement humain et premium pour nouveaux arrivants au Canada : packs, démarches, logement, intégration.";

  const og = getOpenGraph({
    title: homeTitle,
    description: homeDescription,
    path: seo.path,
    locale: i18n.language === "en" ? "en_CA" : i18n.language.startsWith("ar") ? "ar_AR" : "fr_CA",
    image: marhabanImages.montreal
  });

  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <title>{homeTitle}</title>
        <meta name="description" content={homeDescription} />
        <meta name="theme-color" content="#0F3D56" />
        <link rel="canonical" href={buildCanonicalUrl(seo.path)} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        {og.images?.[0] && (
          <>
            <meta property="og:image" content={og.images[0].url} />
            <meta property="og:image:alt" content={og.images[0].alt || "Marhaban Canada"} />
          </>
        )}
        <meta property="og:site_name" content={og.siteName} />
        <meta property="og:locale" content={og.locale} />
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(productsJsonLd)}</script>
      </Helmet>

      <HomeV2 />
    </>
  );
};

export default Home;

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Steps from "../components/Steps";
import PricingTable from "../components/PricingTable";
import FAQAccordion from "../components/FAQAccordion";
import TrustBar from "../components/TrustBar";
import TestimonialCard from "../components/TestimonialCard";
import { heroTestimonials } from "../data/testimonials";
import { buildCanonicalUrl, getOpenGraph, organizationJsonLd, productsJsonLd } from "../lib/seo";

const Home = () => {
  const { t, i18n } = useTranslation();
  const features = t("features.items", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const seo = t("seo.home", { returnObjects: true }) as {
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
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(productsJsonLd)}</script>
      </Helmet>

      <Hero />
      <TrustBar />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-ink dark:text-white">{t("features.title")}</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={["🏠", "📄", "🧭", "🤝"][index] ?? "✨"}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <Steps />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink dark:text-white">
            {t("testimonials.title")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {heroTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </section>

      <PricingTable />
      <FAQAccordion />

      <section className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-10 text-white shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">{t("hero.title")}</h2>
            <p className="text-lg opacity-90">{t("hero.subtitle")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/packs"
              className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-zinc-100"
            >
              {t("cta.reserve")}
            </Link>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER ?? ""}`}
              className="inline-flex items-center rounded-lg border border-white/80 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t("cta.whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

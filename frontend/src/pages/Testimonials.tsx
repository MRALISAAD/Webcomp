import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import TestimonialCard from "../components/TestimonialCard";
import { testimonials } from "../data/testimonials";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const seo = t("seo.testimonials", { returnObjects: true }) as {
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
    <div className="space-y-12">
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

      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-textMain dark:text-textLight">{seo.title}</h1>
        <p className="text-lg text-textSecondary dark:text-zinc-300">{seo.description}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

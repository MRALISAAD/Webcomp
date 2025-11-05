import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Upload, CheckCircle } from "lucide-react";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";

const Booking = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en" | "ar";

  const seo = {
    title: "Réservez votre pack — Marhaban Canada",
    description: "Réservez votre accompagnement et envoyez vos documents en toute sécurité. Confirmation en moins de 24 h."
  };

  const og = getOpenGraph({
    title: seo.title,
    description: seo.description,
    path: "/booking",
    locale: lang === "en" ? "en_CA" : lang === "ar" ? "ar_CA" : "fr_CA"
  });

  const steps = [
    { icon: Calendar, text: t("booking.steps.0.text", { defaultValue: "1. Formulaire : Indiquez votre pack, date et ville d'arrivée." }) },
    { icon: Upload, text: t("booking.steps.1.text", { defaultValue: "2. Documents : Nous collectons les PDF via un lien sécurisé." }) },
    { icon: CheckCircle, text: t("booking.steps.2.text", { defaultValue: "3. Validation : Confirmation par email et synchronisation Zoho CRM." }) }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={buildCanonicalUrl("/booking")} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        {og.images?.[0] && <meta property="og:image" content={og.images[0].url} />}
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t("booking.hero.title", { defaultValue: "Réservez votre onboarding" })}</h1>
          <p className="text-xl opacity-90">{t("booking.hero.subtitle", { defaultValue: "Quelques informations suffisent pour bloquer votre pack." })}</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <step.icon className="w-12 h-12 text-primary mb-4" />
                <p className="text-gray-700 dark:text-gray-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("booking.cta", { defaultValue: "Prêt à réserver ?" })}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{t("booking.cta.text", { defaultValue: "Commencez par remplir le formulaire de contact." })}</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            {t("buttons.contact", { defaultValue: "Contactez-nous" })}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Booking;


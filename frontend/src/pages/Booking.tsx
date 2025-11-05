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
    { icon: Calendar, text: "Formulaire : Indiquez votre pack, date et ville d'arrivée." },
    { icon: Upload, text: "Documents : Nous collectons les PDF via un lien sécurisé." },
    { icon: CheckCircle, text: "Validation : Confirmation par email et synchronisation Zoho CRM." }
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

      <section className="bg-beige py-20 dark:bg-navy">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t("booking.hero.title", { defaultValue: "Réservez votre onboarding" })}</h1>
          <p className="text-xl opacity-90">{t("booking.hero.subtitle", { defaultValue: "Quelques informations suffisent pour bloquer votre pack." })}</p>
        </div>
      </section>

      <section className="py-16 bg-grayLight dark:bg-navy transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-navyLight p-6 rounded-lg shadow-md transition-colors duration-300">
            <step.icon className="w-12 h-12 text-navy dark:text-gold mb-4" />
            <p className="text-mutedLight dark:text-mutedDark">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-textMain dark:text-textLight">{t("booking.cta", { defaultValue: "Prêt à réserver ?" })}</h2>
          <p className="text-mutedLight dark:text-mutedDark mb-8">{t("booking.cta.text", { defaultValue: "Commencez par remplir le formulaire de contact." })}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white shadow transition hover:-translate-y-0.5 hover:bg-primaryLight"
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


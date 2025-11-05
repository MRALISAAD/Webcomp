import { CheckCircleIcon, MailIcon, MapPinIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import ContactForm from "../components/Form/ContactForm";
import { Button } from "../components/ui/button";
import { buildMeta } from "../utils/seo";
import { marhabanImages } from "../lib/media";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const desiredPack = (location.state as { desiredPack?: "Basique" | "Standard" | "Premium" } | null)?.desiredPack;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? "";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    t("contact.whatsappMessage")
  )}`;

  const meta = buildMeta({
    title: "Contact Marhaban Canada — Assistance avant et après votre arrivée",
    description:
      "Écrivez-nous ou planifiez un échange WhatsApp : notre équipe répond sous 24h pour préparer votre installation au Canada.",
    path: "/contact",
    image: marhabanImages.meeting,
    locale: i18n.language === "en" ? "en_CA" : i18n.language.startsWith("ar") ? "ar_CA" : "fr_CA",
    imageAlt: "Réunion d'équipe Marhaban Canada aidant un nouvel arrivant"
  });

  const heroPoints = t("contact.hero.points", { returnObjects: true }) as string[];

  const contactCards = [
    {
      title: t("contact.details.phoneTitle"),
      value: "+1 514 555 1234",
      note: t("contact.details.phoneDescription"),
      Icon: PhoneIcon
    },
    {
      title: t("contact.details.emailTitle"),
      value: "contact@marhabancanada.ca",
      note: t("contact.details.emailDescription"),
      Icon: MailIcon
    },
    {
      title: t("contact.details.addressTitle"),
      value: t("contact.details.addressDescription"),
      note: "Montréal, QC",
      Icon: MapPinIcon
    },
    {
      title: t("contact.details.whatsappTitle"),
      value: whatsappNumber || "+1 514 691 0262",
      note: t("contact.details.whatsappDescription"),
      Icon: MessageCircleIcon,
      link: whatsappLink,
      label: t("contact.details.whatsappAction")
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <section className="bg-beige text-textDark transition-colors duration-300 ease-out dark:bg-navy dark:text-textLight">
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.url} />
        <meta property="og:title" content={meta.openGraph.title} />
        <meta property="og:description" content={meta.openGraph.description} />
        <meta property="og:url" content={meta.openGraph.url} />
        <meta property="og:image" content={meta.openGraph.image} />
        <meta property="og:locale" content={meta.openGraph.locale} />
        <meta property="og:image:alt" content={meta.openGraph.imageAlt} />
        <meta name="twitter:card" content={meta.twitter.card} />
        <meta name="twitter:title" content={meta.twitter.title} />
        <meta name="twitter:description" content={meta.twitter.description} />
        <meta name="twitter:image" content={meta.twitter.image} />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 md:px-8 md:pt-28">
        <motion.div
          {...fadeIn}
          className="mb-12 overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#FAF5EF] via-white to-[#f0e6d7] p-8 shadow-md transition-all duration-300 dark:from-[#112A46] dark:via-[#0A2239] dark:to-[#0A2239]"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center rounded-full bg-[#D4AF37]/15 px-4 py-1 text-sm font-semibold text-[#D4AF37]">
                {t("contact.hero.badge")}
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-textDark dark:text-[#EAEAEA]">
                {t("contact.title")}
              </h1>
              <p className="text-lg text-mutedLight dark:text-[#AAB4C2] max-w-2xl">
                {t("contact.subtitle")}
              </p>
              <ul className="grid gap-3 text-sm text-mutedLight dark:text-[#AAB4C2] md:grid-cols-2">
                {heroPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 rounded-xl bg-white/70 p-3 text-left shadow-sm dark:bg-[#112A46]/80">
                    <CheckCircleIcon className="mt-0.5 h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 hidden h-20 w-20 rounded-full bg-[#D4AF37]/15 blur-3xl md:block" />
              <img
                src={marhabanImages.family}
                alt={t("contact.alt.hero")}
                loading="lazy"
                className="relative h-full w-full rounded-2xl object-cover shadow-lg opacity-95 dark:opacity-90"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.div
            {...fadeIn}
            className="rounded-2xl border border-[#D4AF37]/15 bg-white p-6 shadow-md transition-all duration-300 dark:bg-[#112A46]"
          >
            <ContactForm defaultPack={desiredPack} />
          </motion.div>

          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.15 }} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {contactCards.map(({ title, value, note, Icon, link, label }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#D4AF37]/15 bg-white p-6 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg dark:border-[#D4AF37]/20 dark:bg-[#112A46]"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-[#D4AF37] text-lg font-semibold">{title}</h3>
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-textDark underline-offset-4 hover:underline dark:text-[#EAEAEA]"
                    >
                      {label ?? value}
                    </a>
                  ) : (
                    <p className="mt-2 text-textDark dark:text-[#EAEAEA]">{value}</p>
                  )}
                  {note && (
                    <p className="mt-3 text-sm text-mutedLight leading-relaxed dark:text-[#AAB4C2]">
                      {note}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#D4AF37]/15 bg-white p-6 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg dark:border-[#D4AF37]/20 dark:bg-[#112A46]">
              <h3 className="text-lg font-semibold text-[#D4AF37]">{t("contact.sidebar.hoursTitle")}</h3>
              <p className="mt-2 text-sm text-mutedLight dark:text-[#AAB4C2]">
                {t("contact.sidebar.hoursDescription")}
              </p>
              <div className="mt-4 space-y-3 text-sm text-mutedLight dark:text-[#AAB4C2]">
                <p>{t("contact.sidebar.note")}</p>
                <p>{t("contact.sidebar.gdpr")}</p>
                <blockquote className="border-l-2 border-[#D4AF37]/60 pl-3 italic text-textDark dark:text-[#EAEAEA]">
                  {t("contact.sidebar.testimonial")}
                </blockquote>
              </div>
            </div>

            <img
              src={marhabanImages.map}
              alt={t("contact.alt.map")}
              loading="lazy"
              className="w-full rounded-2xl border border-[#D4AF37]/15 object-cover shadow-md opacity-95 dark:border-[#D4AF37]/20 dark:opacity-90"
            />
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="mb-3 text-2xl font-bold text-textDark dark:text-[#EAEAEA]">
            {t("ctaFinal.title")}
          </h2>
          <Button
            asChild
            className="rounded-full bg-[#D4AF37] px-8 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#C39D2C] hover:shadow-lg"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              {t("cta.reserve")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;

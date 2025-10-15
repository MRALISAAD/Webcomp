import { MailIcon, MapPinIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import ContactForm from "../components/Form/ContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Contact = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const desiredPack = (location.state as { desiredPack?: "Basique" | "Standard" | "Premium" } | null)?.desiredPack;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? "";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    t("contact.whatsappMessage")
  )}`;

  const contactDetails = [
    {
      title: t("contact.details.phoneTitle"),
      description: t("contact.details.phoneDescription"),
      icon: PhoneIcon,
      action: (
        <Button
          variant="outline"
          size="sm"
          className="pointer-events-none rounded-2xl"
          aria-disabled="true"
        >
          {t("contact.details.phonePlaceholder")}
        </Button>
      )
    },
    {
      title: t("contact.details.emailTitle"),
      description: t("contact.details.emailDescription"),
      icon: MailIcon,
      action: (
        <Button asChild variant="outline" size="sm" className="rounded-2xl">
          <a href="mailto:contact@marhabancanada.ca">contact@marhabancanada.ca</a>
        </Button>
      )
    },
    {
      title: t("contact.details.addressTitle"),
      description: t("contact.details.addressDescription"),
      icon: MapPinIcon
    },
    {
      title: t("contact.details.whatsappTitle"),
      description: t("contact.details.whatsappDescription"),
      icon: MessageCircleIcon,
      action: (
        <Button
          asChild
          size="sm"
          className="rounded-2xl bg-secondary px-4 text-secondary-foreground hover:bg-emerald-500/80"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            {t("contact.details.whatsappAction")}
          </a>
        </Button>
      )
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <div className="space-y-12">
      <Helmet>
        <title>Contact | Marhaban Canada</title>
        <meta
          name="description"
          content="Contactez Marhaban Canada : formulaire, WhatsApp et email. Réponse sous 24h pour votre installation au Canada."
        />
        <link rel="canonical" href="https://marhabancanada.ca/contact" />
        <meta property="og:title" content="Contact | Marhaban Canada" />
        <meta
          property="og:description"
          content="Écrivez-nous — on vous répond sous 24h. Formulaire relié à Zoho CRM."
        />
      </Helmet>

      <motion.section
        {...fadeIn}
        className="rounded-3xl bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-10 shadow-sm dark:from-primary/20 dark:via-zinc-950 dark:to-secondary/20"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {t("contact.title")}
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-ink dark:text-white">{t("contact.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          {t("contact.subtitle")}
        </p>
      </motion.section>

      <motion.section
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.1 }}
        className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
      >
        <Card className="order-1 border-transparent bg-white/80 p-6 shadow-lg backdrop-blur dark:bg-zinc-900/70 lg:order-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-ink dark:text-white">
              {t("contact.formTitle")}
            </CardTitle>
            <CardDescription className="text-sm text-zinc-600 dark:text-zinc-300">
              {t("contact.formSubtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm defaultPack={desiredPack} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {contactDetails.map((item) => (
              <Card key={item.title} className="h-full border border-zinc-200 dark:border-zinc-800">
                <CardHeader className="flex flex-row items-start gap-3">
                  <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-ink dark:text-white">{item.title}</CardTitle>
                    <CardDescription className="text-sm text-zinc-600 dark:text-zinc-300">
                      {item.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                {item.action && <CardContent>{item.action}</CardContent>}
              </Card>
            ))}
          </div>

          <Card className="border border-zinc-200 p-6 dark:border-zinc-800">
            <CardTitle className="text-lg font-semibold text-ink dark:text-white">
              {t("contact.sidebar.hoursTitle")}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {t("contact.sidebar.hoursDescription")}
            </CardDescription>
            <div className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              <p>{t("contact.sidebar.note")}</p>
              <p>{t("contact.sidebar.gdpr")}</p>
              <blockquote className="border-l-2 border-primary/60 pl-3 italic text-zinc-700 dark:text-zinc-200">
                {t("contact.sidebar.testimonial")}
              </blockquote>
            </div>
            <Link
              to="/politique-confidentialite"
              className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              {t("contact.sidebar.privacyLink")}
            </Link>
          </Card>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;

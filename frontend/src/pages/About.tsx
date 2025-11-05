import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";
import { Button } from "../components/ui/button";
import { marhabanImages } from "../lib/media";

const About = () => {
  const { t, i18n } = useTranslation();
  const seoT = t("seo.about", { returnObjects: true }) as {
    title: string;
    description: string;
    path: string;
  };

  const og = getOpenGraph({
    title: seoT.title,
    description: seoT.description,
    path: seoT.path,
    locale: i18n.language === "en" ? "en_CA" : "fr_CA"
  });

  const aboutValues = t("about.values", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const aboutTeam = t("about.team", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    image?: string;
  }>;

  return (
    <>
      <Helmet>
        <title>{seoT.title}</title>
        <meta name="description" content={seoT.description} />
        <link rel="canonical" href={buildCanonicalUrl(seoT.path)} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        {og.images?.[0] && <meta property="og:image" content={og.images[0].url} />}
        <meta property="og:site_name" content={og.siteName} />
        <meta property="og:locale" content={og.locale} />
      </Helmet>

      {/* Section 1: Introduction */}
      <section className="section-shell section-gradient-light text-textDark dark:section-gradient-dark dark:text-textLight">
        <div className="container-responsive">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-gold font-semibold uppercase tracking-wide">{t("about.title")}</p>
              <h1 className="text-4xl font-bold text-textDark sm:text-5xl dark:text-textLight">{t("about.title")}</h1>
              <p className="text-lg text-mutedLight dark:text-mutedDark">{t("about.mission")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-3xl shadow-md">
                <img
                  src={marhabanImages.handshake}
                  alt={t("partners.alt.handshake")}
                  className="h-full w-full rounded-3xl object-cover shadow-md opacity-95 dark:opacity-90"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Mission & Vision */}
      <section className="section-shell section-gradient-light text-textDark dark:section-gradient-dark dark:text-textLight">
        <div className="container-responsive">
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: t("about.title"), Icon: Target, description: t("about.mission") },
              { title: t("about.visionTitle"), Icon: Eye, description: t("about.vision") }
            ].map((item, idx) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-lineLight p-8 transition-all duration-300 dark:bg-navyLight dark:border-lineDark"
              >
                <div className="mb-4 inline-flex rounded-lg bg-gold/15 p-3 text-gold">
                  <item.Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-textDark mb-3 dark:text-textLight">{item.title}</h3>
                <p className="text-base text-mutedLight dark:text-mutedDark">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Valeurs */}
      <section className="section-shell section-gradient-light text-textDark dark:section-gradient-dark dark:text-textLight">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textDark sm:text-4xl dark:text-textLight">{t("about.valuesTitle")}</h2>
            <p className="mt-3 text-lg text-mutedLight dark:text-mutedDark">{t("testimonials.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutValues.map((v, idx) => (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-lineLight p-6 text-center transition-all duration-300 dark:bg-navyLight dark:border-lineDark"
              >
                <h3 className="text-lg font-semibold text-textDark mb-2 dark:text-textLight">{v.title}</h3>
                <p className="text-sm text-mutedLight dark:text-mutedDark">{v.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Équipe */}
      <section className="section-shell section-gradient-light text-textDark dark:section-gradient-dark dark:text-textLight">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textDark sm:text-4xl dark:text-textLight">{t("about.teamTitle")}</h2>
            <p className="mt-3 text-lg text-mutedLight dark:text-mutedDark">{t("contact.sidebar.note")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutTeam.map((m, idx) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-lineLight p-6 text-center transition-all duration-300 dark:bg-navyLight dark:border-lineDark"
              >
                {m.image ? (
                  <img src={m.image} alt={m.name} className="mx-auto mb-4 h-16 w-16 rounded-full object-cover" />
                ) : (
                  <div className="mb-4 inline-flex rounded-full bg-gold/15 p-3 text-gold">
                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-textDark mb-1 dark:text-textLight">{m.name}</h3>
                <p className="text-sm text-mutedLight dark:text-mutedDark">{m.role}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA Partenaires */}
      <section className="section-shell section-gradient-light text-textDark dark:section-gradient-dark dark:text-textLight">
        <div className="container-responsive">
          <div className="mx-auto max-w-3xl rounded-3xl bg-navy px-8 py-12 text-center text-white shadow-2xl transition-colors duration-300 dark:bg-navyLight">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{t("about.partnersCta.title")}</h2>
            <p className="text-lg text-white/90">{t("about.partnersCta.subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/partners">{t("about.partnersCta.primary")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border border-white text-white hover:bg-white/10">
                <Link to="/contact">{t("about.partnersCta.secondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

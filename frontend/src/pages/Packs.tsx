import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import clsx from "clsx";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Plane, Home as HomeIcon, Briefcase, Check, X, Circle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "../components/ui/button";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";
import { marhabanImages } from "../lib/media";

type PackKey = "essential" | "comfort" | "premium";

type PackContent = {
  title: string;
  price: string;
  badge?: string;
  description: string[];
  cta: string;
};

type ComparisonRow = {
  service: string;
  essential: string;
  comfort: string;
  premium: string;
};

interface IntroTranslation {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  cta: string;
}

interface ComparisonTranslation {
  title: string;
  columns: {
    service: string;
    essential: string;
    comfort: string;
    premium: string;
  };
  rows: ComparisonRow[];
}

interface ModalTranslation {
  title: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    pack: string;
    submit: string;
  };
  success: string;
  error: string;
  validation: {
    name: string;
    email: string;
    phone: string;
  };
  close: string;
}

interface ContactTranslation {
  title: string;
  subtitle: string;
  button: string;
  note: string;
  whatsappUrl: string;
}

const PACK_ORDER: PackKey[] = ["essential", "comfort", "premium"];

const PACK_ICONS: Record<PackKey, LucideIcon> = {
  essential: Plane,
  comfort: HomeIcon,
  premium: Briefcase
};

const PACK_IMAGES: Record<PackKey, { src: string; altKey: string }> = {
  essential: { src: marhabanImages.passport, altKey: "packs.alt.essentiel" },
  comfort: { src: marhabanImages.housing, altKey: "packs.alt.confort" },
  premium: { src: marhabanImages.family, altKey: "packs.alt.premium" }
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" }
};

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalMotion = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: "easeOut" }
};

const Packs = () => {
  const { t, i18n } = useTranslation();

  const seo = t("seo.packs", { returnObjects: true }) as {
    title: string;
    description: string;
    path: string;
  };

  const intro = t("packsPage.intro", { returnObjects: true }) as IntroTranslation;
  const packTranslations = t("packsPage.packages", { returnObjects: true }) as Record<PackKey, PackContent>;
  const comparison = t("packsPage.comparison", { returnObjects: true }) as ComparisonTranslation;
  const cta = t("packsPage.cta", { returnObjects: true }) as { title: string; subtitle: string; button: string };
  const modalTexts = t("packsPage.modal", { returnObjects: true }) as ModalTranslation;
  const contact = t("packsPage.contact", { returnObjects: true }) as ContactTranslation;

  const packsTitle = seo.title || "Marhaban Canada — Nos packs d'installation au Canada";
  const packsDescription = seo.description;

  const og = getOpenGraph({
    title: packsTitle,
    description: packsDescription,
    path: seo.path,
    locale: i18n.language === "en" ? "en_CA" : "fr_CA",
    image: marhabanImages.montreal
  });

  const packs = useMemo(
    () => PACK_ORDER.map((key) => ({ key, ...packTranslations[key] })),
    [packTranslations]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<PackKey>("essential");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    pack: "essential" as PackKey
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openModal = (pack: PackKey) => {
    setSelectedPack(pack);
    setFormState((prev) => ({ ...prev, pack }));
    setStatus("idle");
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage(null);
    }, 200);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Mettre à jour selectedPack si c'est le champ pack qui change pour synchroniser le titre
    if (name === "pack") {
      setSelectedPack(value as PackKey);
    }
  };

  const validateForm = () => {
    if (!formState.name.trim()) {
      setErrorMessage(modalTexts.validation.name);
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formState.email)) {
      setErrorMessage(modalTexts.validation.email);
      return false;
    }
    if (formState.phone.trim().length < 6) {
      setErrorMessage(modalTexts.validation.phone);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formState.name,
          name: formState.name,
          fullName: formState.name,
          email: formState.email,
          telephone: formState.phone,
          phone: formState.phone,
          pack: formState.pack
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.error ?? "Request failed");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(modalTexts.error);
    }
  };

  const renderComparisonValue = (value: string) => {
    switch (value) {
      case "check":
        return <Check className="mx-auto h-5 w-5 text-gold" aria-hidden="true" />;
      case "dash":
        return <span className="text-navy/40 dark:text-mutedDark" aria-hidden="true">—</span>;
      case "no":
        return <X className="mx-auto h-5 w-5 text-navy/40 dark:text-mutedDark" aria-hidden="true" />;
      case "partial":
        return <Circle className="mx-auto h-5 w-5 text-gold" aria-hidden="true" />;
      default:
        return <span>{value}</span>;
    }
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <title>{packsTitle}</title>
        <meta name="description" content={packsDescription} />
        <link rel="canonical" href={buildCanonicalUrl(seo.path)} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        {og.images?.[0] && <meta property="og:image" content={og.images[0].url} />}
        <meta property="og:site_name" content={og.siteName} />
        <meta property="og:locale" content={og.locale} />
        {og.images?.[0] && <meta property="og:image:alt" content={og.images[0].alt} />}
      </Helmet>

      {/* Intro */}
      <section className="section-shell section-gradient-light text-navy dark:section-gradient-dark dark:text-textLight">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-center">
          <motion.span
            {...fadeUp}
            className="mx-auto inline-flex items-center justify-center rounded-full bg-gold/15 px-4 py-1 text-sm font-semibold text-gold"
          >
            {intro.eyebrow}
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="text-4xl font-bold leading-tight md:text-5xl"
          >
            {intro.highlight && intro.title.includes(intro.highlight) ? (
              intro.title.split(intro.highlight).map((part, idx, arr) => (
                <span key={idx}>
                  {part}
                  {idx < arr.length - 1 && <span className="text-gold">{intro.highlight}</span>}
                </span>
              ))
            ) : (
              intro.title
            )}
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-navy/70 dark:text-mutedDark"
          >
            {intro.subtitle}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
          >
            <img
              src={marhabanImages.montreal}
              alt="Skyline de Montréal au printemps / Montreal skyline in spring"
              loading="lazy"
              className="mx-auto mt-4 max-h-72 w-full max-w-3xl rounded-2xl object-cover shadow-md dark:opacity-90"
            />
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="flex justify-center"
          >
            <Button
              size="lg"
              className="rounded-full bg-gold px-8 text-navy font-semibold shadow-lg transition hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-gold-hover hover:shadow-xl"
              onClick={() => openModal("essential")}
            >
              {intro.cta}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pack cards */}
      <section className="section-shell section-gradient-light dark:section-gradient-dark">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          {packs.map(({ key, title, price, badge, description, cta: packCta }, index) => {
            const Icon = PACK_ICONS[key];
            const isComfort = key === "comfort";
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={clsx(
                  "relative flex h-full flex-col rounded-3xl p-8 transition duration-300",
                  isComfort
                    ? "border-2 border-gold bg-navy text-white shadow-lg hover:-translate-y-1 hover:shadow-2xl dark:bg-navyLight"
                    : "border border-transparent bg-white/95 text-navy shadow-md hover:-translate-y-1 hover:border-gold hover:shadow-2xl dark:bg-navyLight dark:text-textLight"
                )}
              >
                <img
                  src={PACK_IMAGES[key].src}
                  alt={t(PACK_IMAGES[key].altKey)}
                  loading="lazy"
                  className="mb-6 h-48 w-full rounded-xl object-cover shadow-md opacity-95 dark:opacity-90"
                />
                {badge && (
                  <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy shadow">
                    {badge}
                  </span>
                )}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={clsx("inline-flex h-12 w-12 items-center justify-center rounded-2xl", isComfort ? "bg-white/15 text-gold" : "bg-navy/90 text-gold dark:bg-gold/15") }>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h2 className={clsx("text-xl font-semibold", isComfort ? "text-textLight" : "text-navy dark:text-textLight")}>{title}</h2>
                  </div>
                  <span className={clsx("text-2xl font-bold", isComfort ? "text-gold" : "text-gold")}>{price}</span>
                </div>
                <div
                  className={clsx(
                    "space-y-3 text-sm leading-relaxed",
                    isComfort ? "text-white/85" : "text-navy/80 dark:text-mutedDark"
                  )}
                >
                  {description.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
                <div className="mt-8 flex-1" />
                <Button
                  className={clsx(
                    "mt-6 w-full rounded-full shadow-md transition hover:-translate-y-0.5 hover:shadow-xl",
                    isComfort
                      ? "bg-gold text-navy font-semibold hover:bg-gold-hover"
                      : "bg-navy text-white hover:bg-navy/90 dark:bg-gold dark:text-navy dark:hover:bg-gold-hover"
                  )}
                  onClick={() => openModal(key)}
                >
                  {packCta}
                </Button>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section className="section-shell section-gradient-light dark:section-gradient-dark">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            {...fadeUp}
            className="mb-10 text-center text-3xl font-bold text-navy dark:text-textLight"
          >
            {comparison.title}
          </motion.h2>
          <div className="overflow-x-auto rounded-3xl border border-gold/30 bg-white/95 shadow-lg backdrop-blur dark:border-gold/20 dark:bg-navyLight/85">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gold/10 text-left text-navy dark:text-gold">
                  <th className="px-6 py-4 font-semibold">{comparison.columns.service}</th>
                  <th className="px-6 py-4 font-semibold text-center">{comparison.columns.essential}</th>
                  <th className="px-6 py-4 font-semibold text-center">{comparison.columns.comfort}</th>
                  <th className="px-6 py-4 font-semibold text-center">{comparison.columns.premium}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, idx) => {
                  const isEven = idx % 2 === 0;
                  const rowBg = isEven ? "bg-white/90 dark:bg-navyLight/40" : "bg-gold/10 dark:bg-navyLight/35";
                  const stickyBg = isEven ? "bg-white/95 dark:bg-navyLight/55" : "bg-gold/20 dark:bg-navyLight/45";
                  return (
                    <tr key={`${row.service}-${idx}`} className={rowBg}>
                      <td
                        className={`sticky left-0 px-6 py-4 font-medium text-navy dark:text-textLight ${stickyBg}`.trim()}
                      >
                        {row.service}
                      </td>
                      <td className="px-6 py-4 text-center">{renderComparisonValue(row.essential)}</td>
                      <td className="px-6 py-4 text-center">{renderComparisonValue(row.comfort)}</td>
                      <td className="px-6 py-4 text-center">{renderComparisonValue(row.premium)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell section-gradient-light dark:section-gradient-dark">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-bold text-navy dark:text-textLight"
          >
            {cta.title}
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.08 }}
            className="max-w-2xl text-lg text-navy/70 dark:text-mutedDark"
          >
            {cta.subtitle}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
          >
            <Button
              size="lg"
              className="rounded-full bg-gold px-8 text-navy font-semibold shadow-lg transition hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-gold-hover hover:shadow-xl"
              onClick={() => openModal(selectedPack)}
            >
              {cta.button}
            </Button>
          </motion.div>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.22 }}
            className="text-sm text-navy/60 dark:text-mutedDark"
          >
            {t("packsPage.modal.privacy", "Vos informations sont confidentielles et ne seront jamais partagées.")}
          </motion.p>
        </div>
      </section>

      {/* Contact section */}
      <section className="section-shell section-gradient-light dark:section-gradient-dark">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gold/30 bg-white/95 px-8 py-12 text-center shadow-lg backdrop-blur dark:border-gold/20 dark:bg-navyLight/85">
          <motion.h3 {...fadeUp} className="text-2xl font-semibold text-navy dark:text-textLight">
            {contact.title}
          </motion.h3>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="mt-3 text-navy/70 dark:text-mutedDark"
          >
            {contact.subtitle}
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-6 flex justify-center"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gold px-6 text-navy font-semibold shadow-lg transition hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-gold-hover hover:shadow-xl"
            >
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                {contact.button}
              </a>
            </Button>
          </motion.div>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="mt-3 text-sm text-navy/60 dark:text-mutedDark"
          >
            {contact.note}
          </motion.p>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
            {...overlayMotion}
          >
            <motion.div
            className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl dark:bg-navyLight"
              {...modalMotion}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-5 top-5 text-navy/60 transition-colors duration-300 hover:text-navy dark:text-mutedDark dark:hover:text-textLight"
                aria-label={modalTexts.close}
              >
                ×
              </button>
              <h3 className="mb-6 text-2xl font-semibold text-navy dark:text-textLight">
                {modalTexts.title.replace("{{pack}}", packTranslations[formState.pack].title)}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy/80 dark:text-textLight" htmlFor="name">
                    {modalTexts.fields.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gold/30 bg-white px-4 py-3 text-navy shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 dark:border-gold/40 dark:bg-navyLight/80 dark:text-textLight"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy/80 dark:text-textLight" htmlFor="email">
                    {modalTexts.fields.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gold/30 bg-white px-4 py-3 text-navy shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 dark:border-gold/40 dark:bg-navyLight/80 dark:text-textLight"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy/80 dark:text-textLight" htmlFor="phone">
                    {modalTexts.fields.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gold/30 bg-white px-4 py-3 text-navy shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 dark:border-gold/40 dark:bg-navyLight/80 dark:text-textLight"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy/80 dark:text-textLight" htmlFor="pack">
                    {modalTexts.fields.pack}
                  </label>
                  <select
                    id="pack"
                    name="pack"
                    value={formState.pack}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gold/30 bg-white px-4 py-3 text-navy shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 dark:border-gold/40 dark:bg-navyLight/80 dark:text-textLight"
                  >
                    {packs.map(({ key, title }) => (
                      <option key={key} value={key}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>
                {status === "success" && (
                  <p className="rounded-xl bg-gold/15 px-4 py-3 text-sm font-medium text-navy dark:bg-gold/20 dark:text-navy">
                    {modalTexts.success}
                  </p>
                )}
                {status === "error" && errorMessage && (
                  <p className="rounded-xl bg-red-100/80 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-500/20 dark:text-red-100">
                    {errorMessage}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-gold py-3 text-navy font-semibold shadow-lg transition hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-gold-hover hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 dark:bg-gold dark:text-navy"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                      {modalTexts.fields.submit}
                    </span>
                  ) : (
                    modalTexts.fields.submit
                  )}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Packs;

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
// @ts-expect-error - JS components without types
import { PartnersHeader, PartnersBenefits, PartnersCategories, PartnersCTA } from "../components/partners";
// @ts-expect-error - JS module without types
import partnersContent from "../data/partnersContent";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";
import { marhabanImages } from "../lib/media";
import api from "../utils/api";

const Partners = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "fr" | "en" | "ar";
  const content = partnersContent[lang] || partnersContent.fr;
  const isRTL = lang === "ar";
  const formTexts = t("partners.form", { returnObjects: true }) as {
    title: string;
    fields: { name: string; company: string; email: string; message: string };
    submit: string;
    sending: string;
    successTitle: string;
    successDescription: string;
    close: string;
    error: string;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageTitle = `${content.title} — Partenariats Marhaban Canada`;
  const pageDescription = content.subtitle;

  const og = getOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/partners",
    locale: lang === "en" ? "en_CA" : lang === "ar" ? "ar_CA" : "fr_CA",
    image: marhabanImages.handshake
  });

  return (
    <div className="min-h-screen">
      <Helmet htmlAttributes={{ dir: content.direction, lang }}>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={buildCanonicalUrl("/partners")} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        {og.images?.[0] && <meta property="og:image" content={og.images[0].url} />}
        {og.images?.[0] && <meta property="og:image:alt" content={og.images[0].alt} />}
        <meta property="og:site_name" content={og.siteName} />
        <meta property="og:locale" content={og.locale} />
      </Helmet>

      <PartnersHeader title={content.title} subtitle={content.subtitle} intro={content.intro} isRTL={isRTL} />
      <PartnersBenefits benefits={content.benefits} />
      <PartnersCategories categories={content.categories} />
      <PartnersCTA data={content.cta} isRTL={isRTL} onOpen={() => {
        setIsModalOpen(true);
        setIsSuccess(false);
        setError(null);
      }} />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#fdf8f3] p-8 shadow-xl dark:bg-[#0b2239]">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setTimeout(() => {
                  setIsSuccess(false);
                  setError(null);
                }, 200);
              }}
              className="absolute right-4 top-3 text-2xl text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={formTexts.close}
            >
              ×
            </button>

            {isSuccess ? (
              <div className="py-6 text-center">
                <h3 className="text-xl font-semibold text-[#1f3a5f] dark:text-[#bfa45b]">{formTexts.successTitle}</h3>
                <p className="mt-2 text-sm text-[#42526b] dark:text-gray-300">{formTexts.successDescription}</p>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center rounded-full bg-[#bfa45b] px-6 py-3 text-sm font-semibold text-[#0b2239] shadow-md transition hover:-translate-y-0.5 hover:bg-[#a68d44]"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsSuccess(false);
                  }}
                >
                  {formTexts.close}
                </button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setIsSubmitting(true);
                  setError(null);
                  try {
                    const { data } = await api.post("/partners", form);
                    if (data?.success) {
                      setIsSuccess(true);
                      setForm({ name: "", company: "", email: "", message: "" });
                    } else {
                      setError(data?.message || formTexts.error);
                    }
                  } catch (err) {
                    console.error("partner.form.error", err);
                    setError(formTexts.error);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <h3 className="mb-6 text-center text-2xl font-bold text-[#1f3a5f] dark:text-gray-100">
                  {formTexts.title}
                </h3>
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#1f3a5f] dark:text-gray-200">{formTexts.fields.name}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder={formTexts.fields.name}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-[#1f3a5f] placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bfa45b] focus:border-[#bfa45b] dark:border-[#bfa45b] dark:bg-transparent dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#1f3a5f] dark:text-gray-200">{formTexts.fields.company}</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder={formTexts.fields.company}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-[#1f3a5f] placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bfa45b] focus:border-[#bfa45b] dark:border-[#bfa45b] dark:bg-transparent dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#1f3a5f] dark:text-gray-200">{formTexts.fields.email}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder={formTexts.fields.email}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-[#1f3a5f] placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bfa45b] focus:border-[#bfa45b] dark:border-[#bfa45b] dark:bg-transparent dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#1f3a5f] dark:text-gray-200">{formTexts.fields.message}</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder={formTexts.fields.message}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-[#1f3a5f] placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bfa45b] focus:border-[#bfa45b] dark:border-[#bfa45b] dark:bg-transparent dark:text-gray-100 dark:placeholder-gray-400"
                  />
                </div>
                {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#bfa45b] py-3 text-sm font-semibold text-[#0b2239] shadow-md transition hover:-translate-y-0.5 hover:bg-[#a68d44] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? formTexts.sending : formTexts.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;


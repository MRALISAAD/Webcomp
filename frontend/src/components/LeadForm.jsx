import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import api from "../utils/api";
import { trackLeadSubmission } from "../utils/tracking.js";
import Toast from "./Toast";
import FormFeedback from "./FormFeedback.jsx";

export default function LeadForm({ preselectedPack, onClose = () => {} }) {
  const { t, i18n } = useTranslation();
  const packLabels = t("forms.lead.packs", { returnObjects: true });
  const baseInputClass =
    "w-full rounded-xl border border-lineLight bg-white/90 px-4 py-3 text-textDark shadow-sm transition-colors duration-300 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 dark:border-lineDark dark:bg-navyLight/90 dark:text-textLight";
  const normalizePack = (value) => {
    if (!value) return "";
    const normalized = value
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z]/g, "");

    if (["essentiel", "essential", "packessentiel"].includes(normalized)) return "essential";
    if (["confort", "comfort", "packconfort"].includes(normalized)) return "comfort";
    if (["premium", "packpremium"].includes(normalized)) return "premium";
    if (["surmesure", "surmesure", "custom", "packsurmesure"].includes(normalized)) return "custom";
    return value;
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pack: normalizePack(preselectedPack) || "",
    message: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState(null);
  const [feedback, setFeedback] = useState({ type: "info", message: "" });

  useEffect(() => {
    if (!preselectedPack) return;
    const normalized = normalizePack(preselectedPack);
    setForm((current) =>
      current.pack === normalized ? current : { ...current, pack: normalized }
    );
  }, [preselectedPack]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = t("forms.common.errors", { returnObjects: true });
    if (!form.name.trim()) throw new Error(errors.fullName);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) throw new Error(errors.email);
    if (!/[\d+]{8,}/.test(form.phone.replace(/\s/g, ""))) throw new Error(errors.phone);
    if (!form.pack) throw new Error(errors.pack);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.company) return; // bot trap
    try {
      setFeedback({ type: "info", message: "" });
      validate();
      setStatus("submitting");
      await api.post("/leads", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        pack: form.pack,
        message: form.message,
        source: "website",
        locale: i18n.language.startsWith("en") ? "en" : "fr",
        url: typeof window !== "undefined" ? window.location.href : undefined,
      });
      trackLeadSubmission({ source: "website", pack: form.pack });
      setToast({ type: "success", message: t("forms.lead.success") });
      setStatus("success");
    } catch (error) {
      const message = error.message || t("forms.common.genericError");
      setToast({ type: "error", message });
      setFeedback({ type: "error", message });
      setStatus("error");
    } finally {
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="relative">
      {toast && <Toast type={toast.type} message={toast.message} />}

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 12 }}
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy"
              aria-hidden
            >
              <span className="text-3xl">✓</span>
            </motion.div>
            <h3 className="text-xl font-poppins font-semibold text-gold dark:text-gold">
              {t("forms.common.success")}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-navy px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-navyLight dark:bg-gold dark:text-navy dark:hover:bg-gold-hover"
            >
              {t("buttons.back")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="mx-auto max-w-xl space-y-5 rounded-3xl border border-lineLight bg-beige/70 p-8 shadow-2xl backdrop-blur-xl transition-colors duration-300 dark:border-lineDark dark:bg-navyLight/80"
          >
            <div className="space-y-2 text-center">
              <h3 className="text-3xl font-display font-semibold text-primary">
              {t("forms.lead.title")}
              </h3>
              <p className="text-sm text-mutedLight dark:text-mutedDark">
                {t("forms.lead.subtitle")}
              </p>
            </div>
            <span className="sr-only" role="status" aria-live="polite">
              {status === "submitting" ? t("forms.common.sending") : feedback.message}
            </span>

            <input
              type="text"
              name="name"
              placeholder={t("forms.common.fullName")}
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
              className={baseInputClass}
            />

            <input
              type="email"
              name="email"
              placeholder={t("forms.common.email")}
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className={baseInputClass}
            />

            <input
              type="tel"
              name="phone"
              placeholder={`${t("forms.common.phone")} (WhatsApp)`}
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              required
              className={baseInputClass}
            />

            <select
              name="pack"
              value={form.pack}
              onChange={handleChange}
              required
              className={`${baseInputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' fill=\\'none\\' viewBox=\\'0 0 24 24\\' stroke-width=\\'1.5\\' stroke=\\'%230A2239\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' d=\\'M8.25 9.75L12 13.5l3.75-3.75\\' /></svg>')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10`}
            >
              <option value="">{t("forms.lead.select")}</option>
              {Object.entries(packLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              rows={4}
              placeholder={t("forms.lead.placeholder.message")}
              value={form.message}
              onChange={handleChange}
              className={`${baseInputClass} min-h-[120px] resize-none`}
            />

            <input
              type="text"
              name="company"
              className="hidden"
              value={form.company}
              onChange={handleChange}
              tabIndex={-1}
              aria-hidden
            />

            <FormFeedback type={feedback.type} message={feedback.message} />

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-2xl bg-navy px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-navyLight hover:shadow-xl disabled:translate-y-0 disabled:opacity-60 dark:bg-gold dark:text-navy dark:hover:bg-gold-hover"
            >
              {status === "submitting" ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                  {t("forms.common.sending")}
                </span>
              ) : (
                t("forms.common.submit")
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

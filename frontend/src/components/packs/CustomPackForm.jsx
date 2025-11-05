import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants } from "../../utils/animations.js";
import api from "../../utils/api.js";

const FIELDS = ["fullName", "email", "phone", "selectedPack", "message"];

export default function CustomPackForm({ formData, packs = [], isRTL, selectedPack }) {
  const { i18n } = useTranslation();
  const initialValues = useMemo(
    () => ({
      fullName: "",
      email: "",
      phone: "",
      selectedPack: selectedPack || "",
      message: "",
    }),
    [selectedPack]
  );

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  useEffect(() => {
    setValues((current) =>
      selectedPack ? { ...current, selectedPack } : current
    );
  }, [selectedPack]);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: value.trim() ? null : current[name] }));
  };

  const validate = () => {
    const nextErrors = {};
    FIELDS.forEach((field) => {
      if (!String(values[field] ?? "").trim()) {
        nextErrors[field] = true;
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      setIsSubmitSuccessful(false);
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/leads", {
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        pack: values.selectedPack || selectedPack || "custom",
        message: values.message,
        source: "packs-page",
        locale: i18n.language.startsWith("en") ? "en" : "fr",
        url: typeof window !== "undefined" ? window.location.href : undefined,
      });
      
      setIsSubmitSuccessful(true);
      setValues({
        fullName: "",
        email: "",
        phone: "",
        selectedPack: selectedPack || "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Pack form error:", error);
      setIsSubmitSuccessful(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) return null;

  const [fullName, email, phone, packPlaceholder, messagePlaceholder] = formData.fields;

  return (
    <motion.section
      id="pack-request"
      aria-label={formData.rightTitle}
      className="bg-beige py-20 dark:bg-slate-900 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className="grid gap-12 md:grid-cols-2">
        <div className={clsx("space-y-4", isRTL && "text-right")}>
          <h3 className="text-2xl font-semibold text-primary dark:text-rose-200">{formData.leftTitle}</h3>
          <p className="text-base leading-relaxed text-grayText dark:text-slate-300">{formData.leftText}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <h4 className="text-xl font-semibold text-primary dark:text-rose-200">{formData.rightTitle}</h4>
          <div className="mt-6 space-y-4">
            <div>
              <input
                type="text"
                placeholder={fullName}
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-grayText/30 bg-white/90 p-3 text-sm text-gray-800 placeholder:text-grayText/70 focus:border-secondary focus:outline-none dark:bg-slate-900/70 dark:text-slate-100"
              />
              {errors.fullName && <p className="mt-1 text-xs text-primary">{fullName}*</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder={email}
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-grayText/30 bg-white/90 p-3 text-sm text-gray-800 placeholder:text-grayText/70 focus:border-secondary focus:outline-none dark:bg-slate-900/70 dark:text-slate-100"
              />
              {errors.email && <p className="mt-1 text-xs text-primary">{email}*</p>}
            </div>
            <div>
              <input
                type="tel"
                placeholder={phone}
                name="phone"
                value={values.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-grayText/30 bg-white/90 p-3 text-sm text-gray-800 placeholder:text-grayText/70 focus:border-secondary focus:outline-none dark:bg-slate-900/70 dark:text-slate-100"
              />
              {errors.phone && <p className="mt-1 text-xs text-primary">{phone}*</p>}
            </div>
            <div>
              <select
                name="selectedPack"
                value={values.selectedPack}
                onChange={handleChange}
                className="w-full rounded-xl border border-grayText/30 bg-white/90 p-3 text-sm text-gray-800 focus:border-secondary focus:outline-none dark:bg-slate-900/70 dark:text-slate-100"
              >
                <option value="" disabled>
                  {packPlaceholder}
                </option>
                {packs.map((pack) => (
                  <option key={pack.name} value={pack.name}>
                    {pack.name}
                  </option>
                ))}
              </select>
              {errors.selectedPack && <p className="mt-1 text-xs text-primary">{packPlaceholder}*</p>}
            </div>
            <div>
              <textarea
                rows={4}
                placeholder={messagePlaceholder}
                name="message"
                value={values.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-grayText/30 bg-white/90 p-3 text-sm text-gray-800 placeholder:text-grayText/70 focus:border-secondary focus:outline-none dark:bg-slate-900/70 dark:text-slate-100"
              />
              {errors.message && <p className="mt-1 text-xs text-primary">{messagePlaceholder}*</p>}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "..." : formData.submit}
          </button>
          {isSubmitSuccessful && !isSubmitting ? (
            <p className="mt-3 text-sm font-medium text-secondary">{formData.success}</p>
          ) : null}
        </form>
      </Container>
    </motion.section>
  );
}

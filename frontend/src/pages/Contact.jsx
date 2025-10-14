import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { setMetaDescription, setPageTitle } from "../utils/seo.js";
import { getStoredUtmParams } from "../utils/utm.js";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  whatsapp: "",
  city: "Montréal",
  arrivalType: "Étudiant",
  budget: "",
  arrivalDate: "",
  pack: "Indécis",
  message: "",
  consent: false
};

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const utm = useMemo(() => getStoredUtmParams(), []);

  useEffect(() => {
    const seo = t("seo.contact", { returnObjects: true });
    setPageTitle(seo.title);
    setMetaDescription(seo.description);
  }, [t, i18n.language]);

  const contactDetails = t("contact.details", { returnObjects: true });
  const contactLabels = t("contact.labels", { returnObjects: true });
  const formCopy = t("contact.form", { returnObjects: true });
  const statusCopy = formCopy.status;
  const cityOptions = formCopy.cityOptions || [];
  const arrivalTypes = formCopy.arrivalTypeOptions || [];
  const packOptionsRaw = formCopy.packOptions || [];

  const packOptions = packOptionsRaw.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const packParam = searchParams.get("pack");
    if (!packParam) return;

    const normalized = packOptions.find(
      (option) =>
        option.value.toLowerCase() === packParam.toLowerCase() ||
        option.label.toLowerCase() === packParam.toLowerCase()
    );

    setForm((prev) => ({
      ...prev,
      pack: normalized ? normalized.value : packParam
    }));
  }, [packOptions]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.fullName || !form.email || !form.whatsapp || !form.consent) {
      setStatus({ state: "error", message: statusCopy.invalid });
      return;
    }

    setStatus({ state: "loading", message: "" });

    try {
      const base = import.meta.env.VITE_API_BASE_URL || "";
      const endpoint = base ? `${base.replace(/\/+$/, "")}/api/leads` : "/api/leads";

      const payload = { ...form, utm };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Request failed");
      }

      setStatus({ state: "success", message: statusCopy.success });
      setForm((prev) => ({ ...INITIAL_FORM, city: prev.city, arrivalType: prev.arrivalType }));
    } catch (error) {
      setStatus({
        state: "error",
        message: `${statusCopy.errorPrefix}${error.message}`
      });
    }
  };

  return (
    <section className="grid gap-10 md:grid-cols-2">
      <div className="card space-y-4 dark:bg-slate-900">
        <h1 className="section-title mb-0 text-left">{t("contact.title")}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">{t("contact.subtitle")}</p>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>
            <strong className="text-primary">{contactLabels.phone} :</strong> {contactDetails.phone}
          </li>
          <li>
            <strong className="text-primary">{contactLabels.email} :</strong> {contactDetails.email}
          </li>
          <li>
            <strong className="text-primary">{contactLabels.address} :</strong>{" "}
            {contactDetails.address}
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} noValidate className="card space-y-4 dark:bg-slate-900">
        <input
          name="fullName"
          placeholder={formCopy.fullName}
          value={form.fullName}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-950"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="email"
            name="email"
            placeholder={formCopy.email}
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-950"
          />

          <input
            name="whatsapp"
            placeholder={formCopy.whatsapp}
            value={form.whatsapp}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-950"
          />
        </div>

        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-950"
        >
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <fieldset className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <legend className="font-medium">{formCopy.arrivalType}</legend>
          <div className="flex flex-wrap gap-4">
            {arrivalTypes.map((type) => (
              <label key={type} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="arrivalType"
                  value={type}
                  checked={form.arrivalType === type}
                  onChange={handleChange}
                />
                {type}
              </label>
            ))}
          </div>
        </fieldset>

        <input
          name="budget"
          placeholder={formCopy.budget}
          value={form.budget}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-950"
        />

        <input
          type="date"
          name="arrivalDate"
          value={form.arrivalDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-950"
        />

        <select
          name="pack"
          value={form.pack}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-950"
        >
          {packOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          placeholder={formCopy.message}
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-slate-700 dark:bg-slate-950"
        />

        <label className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            className="mt-1"
          />
          <span>{formCopy.consent}</span>
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full justify-center"
          disabled={status.state === "loading"}
        >
          {status.state === "loading" ? statusCopy.loading : formCopy.submit}
        </button>

        {status.message && (
          <p
            className={`text-sm ${
              status.state === "success" ? "text-trust" : "text-primary"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </section>
  );
}

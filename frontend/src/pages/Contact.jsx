"use strict";

import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const needsOptions = ["Logement", "Accueil aéroport", "Démarches", "Forfait complet"];
const projectOptions = ["Études", "Travail", "Immigration permanente", "Regroupement familial"];

const initialFormState = {
  fullName: "",
  email: "",
  whatsapp: "",
  city: "",
  project: "",
  arrivalDate: "",
  needs: [],
  message: "",
  marhababot: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ message: "", type: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNeedsChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prev) => {
      const nextNeeds = checked ? [...prev.needs, value] : prev.needs.filter((item) => item !== value);
      return { ...prev, needs: nextNeeds };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: "Envoi en cours…", type: "info" });
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, needs: formData.needs }),
      });

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const payload = await response.json();
      setStatus({
        message: payload.message || "Merci ! On revient vers toi sous 24h.",
        type: "success",
      });
      setFormData(initialFormState);
    } catch (error) {
      setStatus({
        message: "Désolé, une erreur est survenue. Réessaie plus tard.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray text-slate-800">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Contact</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ton accompagnement de A à Z pour réussir ton arrivée au Canada.
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Parle-nous de ton projet — remplis ce formulaire et on te répond sous 24h pour t’aider à planifier ton arrivée.
          </p>
        </header>

        <section className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="rounded-3xl border border-white/70 bg-white p-8 shadow-xl">
            <form id="contact-form" className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="field">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="fullName">
                    Nom complet *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-inner focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-inner focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="whatsapp">
                    WhatsApp (optionnel)
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-inner focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                    value={formData.whatsapp}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="city">
                    Ville actuelle
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-inner focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="text-sm font-semibold text-slate-700" htmlFor="project">
                  Projet principal *
                </label>
                <select
                  id="project"
                  name="project"
                  required
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-inner focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  value={formData.project}
                  onChange={handleChange}
                >
                  <option value="">Sélectionner…</option>
                  {projectOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="text-sm font-semibold text-slate-700" htmlFor="arrivalDate">
                  Date d’arrivée (estimée)
                </label>
                <input
                  id="arrivalDate"
                  name="arrivalDate"
                  type="date"
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-inner focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                />
              </div>

              <fieldset className="field space-y-3 rounded-2xl border border-brand-pale bg-brand-gray/40 px-4 py-4">
                <legend className="text-sm font-semibold text-slate-700">Besoin d’aide pour</legend>
                {needsOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      name="needs"
                      value={option}
                      checked={formData.needs.includes(option)}
                      onChange={handleNeedsChange}
                      className="h-4 w-4 rounded border-slate-300 text-brand-red focus:ring-brand-red"
                    />
                    {option}
                  </label>
                ))}
              </fieldset>

              <div className="field">
                <label className="text-sm font-semibold text-slate-700" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Donne quelques détails (ville, budget, date)…"
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-inner focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="field" style={{ display: "none" }}>
                <label className="text-sm font-semibold text-slate-700" htmlFor="marhababot">
                  Ne pas remplir ce champ
                </label>
                <input
                  id="marhababot"
                  name="marhababot"
                  type="text"
                  value={formData.marhababot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                id="sendBtn"
                className="btn-primary w-full justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>

              <p
                id="formStatus"
                className={`text-sm ${
                  status.type === "success"
                    ? "text-emerald-600"
                    : status.type === "error"
                    ? "text-brand-red"
                    : "text-slate-500"
                }`}
                aria-live="polite"
              >
                {status.message}
              </p>
            </form>
          </div>

          <aside className="rounded-3xl border border-brand-pale bg-brand-gray/40 p-8 space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Ce qui t’attend avec Marhaba Canada</h2>
            <p className="text-sm text-slate-600">
              On te construit un plan d’accompagnement personnalisé : logement, accueil, démarches, adaptation… Tu gagnes du temps et tu évites le stress.
            </p>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• Réponse garantie sous 24h</li>
              <li>• Accompagnement par une équipe marocaine installée au Canada</li>
              <li>• Partenaires sélectionnés pour la qualité de service</li>
            </ul>
            <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-inner">
              Besoin d’un échange express ? Écris-nous sur <span className="font-semibold text-brand-red">WhatsApp</span>, on te guide étape par étape.
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;

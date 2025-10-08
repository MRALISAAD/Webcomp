"use strict";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ServiceCard from "../components/ServiceCard.jsx";

const services = [
  {
    title: "Accompagnement immigration",
    description:
      "Étude personnalisée, préparation des documents, suivi des délais et coordination avec nos avocats et consultants réglementés.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 12l8-4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 12v9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 12l-8-4.5" />
      </svg>
    ),
  },
  {
    title: "Pré-départ & installation",
    description:
      "Recherche de logement, ouverture de compte bancaire, assurances, écoles, téléphonie : nous préparons votre arrivée en amont.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Intégration professionnelle",
    description:
      "Audit CV, préparation aux entretiens, simulation culturelle, réseautage et coaching pour transformer vos opportunités en offres concrètes.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 6a5 5 0 015 5v5h1a2 2 0 012 2v1H4v-1a2 2 0 012-2h1v-5a5 5 0 015-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 6V4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 9l1.5-1.5" />
      </svg>
    ),
  },
  {
    title: "Installation familiale",
    description:
      "Accompagnement dédié aux familles : garderie, écoles, santé, activités, intégration culturelle et communautaire.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 22v-2a5 5 0 015-5h4a5 5 0 015 5v2" />
      </svg>
    ),
  },
  {
    title: "Programme étudiant",
    description:
      "Orientation académique, démarches d’admission, visas étudiants, logement, budget et premier emploi sur le campus.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M4 6l8-4 8 4-8 5-8-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M6 8v5c0 2 3 5 6 5s6-3 6-5V8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 13l8-5" />
      </svg>
    ),
  },
  {
    title: "Parcours entrepreneur",
    description:
      "Étude de marché, immatriculation, fiscalité, recrutement et mise en réseau d’affaires pour lancer votre entreprise au Canada.",
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h18v13H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 16l6 5 12-8" />
      </svg>
    ),
  },
];

function Services() {
  return (
    <div className="min-h-screen bg-brand-gray text-slate-800">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Services Marhaban Canada</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Des solutions sur-mesure pour votre projet d&apos;immigration
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Chaque accompagnement est adapté à vos objectifs : installation temporaire, projet familial, carrière, études ou business.
            Choisissez votre formule, nous construisons la feuille de route et coordonnons les experts nécessaires.
          </p>
        </header>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-brand-pale bg-white/80 p-8 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Besoin d&apos;un plan personnalisé ?</h2>
          <p className="mt-3 text-sm text-slate-600">
            Planifions un appel de 30 minutes pour auditer votre situation et bâtir une feuille de route en 5 étapes.
          </p>
          <Link className="btn-primary mt-6 inline-flex" to="/contact">
            Parler à un conseiller
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Services;

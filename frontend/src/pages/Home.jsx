"use strict";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const servicesSummary = [
  {
    title: "Installation & logement",
    description: "Recherche, prise de contact avec les propriétaires, gestion du bail et visites virtuelles pour être installé dès ton arrivée.",
  },
  {
    title: "Accueil à l’aéroport",
    description: "Prise en charge dès l’atterrissage, transport sécurisé jusqu’à ton logement ou hôtel et assistance pour tes premières démarches.",
  },
  {
    title: "Démarches administratives",
    description: "NAS, ouverture de compte bancaire, carte SIM, assurances, orientation CAQ/WES : on prépare tout avant ton décollage.",
  },
  {
    title: "Accompagnement familial",
    description: "Scolarité, ressources locales, adaptation culturelle : on s’assure que toute la famille se sente chez elle.",
  },
];

const packages = [
  {
    title: "Pack Découverte 🇨🇦",
    description: "Accueil à l’aéroport, conseils d’installation et accès à un groupe privé de soutien.",
    price: "149 $",
  },
  {
    title: "Pack Logement 🏡",
    description: "Recherche ciblée, négociation du bail, visites virtuelles et suivi de ton installation.",
    price: "299 $",
  },
  {
    title: "Pack Complet ❤️",
    description: "Accueil, logement, démarches complètes et coaching personnalisé pendant 30 jours.",
    price: "499 $",
  },
];

const testimonials = [
  {
    quote: "J’ai trouvé mon logement avant même de prendre l’avion.",
    author: "Yassine, étudiant à Montréal",
  },
  {
    quote: "Accueil à l’aéroport + démarches bancaires réglées en 48h.",
    author: "Khadija, nouvelle résidente à Laval",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-brand-gray text-slate-800">
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-pale via-white to-white opacity-80" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
            <div className="max-w-2xl space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-brand-red">Immigration sereine</p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Marhaba Canada — Ton accompagnement de A à Z pour réussir ton arrivée au Canada 🇲🇦🤝🇨🇦
              </h1>
              <p className="text-lg leading-relaxed text-slate-600">
                On t’aide à préparer ton départ, t’installer rapidement et t’adapter sereinement. Ici, t’es pas seul.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link className="btn-primary" to="/contact">
                  Demander un accompagnement
                </Link>
                <Link
                  className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-red hover:text-brand-red"
                  to="/services"
                >
                  Découvrir nos services
                </Link>
              </div>
            </div>
            <div className="relative flex-1">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-br from-white via-brand-pale to-white p-8 shadow-soft">
                <div className="space-y-4 text-sm text-slate-600">
                  <h2 className="text-2xl font-semibold text-slate-900">Mission Marhaba Canada</h2>
                  <p>
                    Chez Marhaba Canada, on accompagne les Marocains qui immigrent, étudient ou travaillent au Canada. Notre mission :
                    rendre ton installation simple, humaine et sans stress — de ton premier vol jusqu’à ton premier logement.
                  </p>
                  <p className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-semibold text-brand-red">
                    Tu ne seras jamais seul à ton arrivée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Ce que nous faisons</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Des services pensés pour chaque étape de ton arrivée
              </h2>
              <p className="mt-4 text-base text-slate-600">
                On s’occupe de tout ce qui compte pour un départ serein et une installation rapide.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {servicesSummary.map((service) => (
                <div key={service.title} className="rounded-3xl border border-brand-pale bg-brand-gray/40 p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-gray/60 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Forfaits indicatifs</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Choisis le pack adapté à ton projet</h2>
              <p className="mt-4 text-base text-slate-600">
                Tarif modulable selon ton profil et tes besoins. On crée toujours un accompagnement sur mesure.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {packages.map((pack) => (
                <div key={pack.title} className="flex h-full flex-col rounded-3xl border border-white/60 bg-white p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-slate-900">{pack.title}</h3>
                  <p className="mt-4 flex-1 text-sm text-slate-600">{pack.description}</p>
                  <p className="mt-6 text-lg font-bold text-brand-red">{pack.price}</p>
                  <p className="mt-2 text-xs text-slate-400">Tarifs indicatifs — ajustables selon ton offre.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-red">Pourquoi nous choisir ?</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Ton équipe sur place</h2>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  <li>✅ Équipe marocaine installée au Canada</li>
                  <li>✅ Assistance personnalisée avant, pendant et après ton arrivée</li>
                  <li>✅ Réseau de partenaires (logement, banques, écoles, entreprises)</li>
                  <li>✅ Communication rapide, transparente et multicanale</li>
                </ul>
                <p className="mt-6 rounded-3xl border border-brand-red/20 bg-brand-red/10 px-4 py-3 text-sm font-medium text-brand-red">
                  Promesse : tu ne seras jamais seul à ton arrivée.
                </p>
              </div>
              <div className="rounded-3xl border border-brand-pale bg-brand-gray/40 p-8">
                <h3 className="text-xl font-semibold text-slate-900">Ils nous font confiance</h3>
                <div className="mt-6 space-y-6">
                  {testimonials.map((testimonial) => (
                    <blockquote key={testimonial.author} className="space-y-2 text-sm text-slate-600">
                      <p className="rounded-2xl bg-white px-4 py-3 shadow-sm">“{testimonial.quote}”</p>
                      <footer className="text-xs font-semibold uppercase tracking-wide text-slate-400">{testimonial.author}</footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-red text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start gap-6 rounded-3xl bg-brand-red-dark/40 p-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl space-y-2">
                <h2 className="text-2xl font-semibold">Parle-nous de ton projet</h2>
                <p className="text-sm text-white/80">
                  Remplis le formulaire et on te répond sous 24h pour t’aider à planifier ton arrivée.
                </p>
              </div>
              <Link
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-red transition hover:bg-white/90"
                to="/contact"
              >
                Envoyer ma demande
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;

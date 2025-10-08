"use strict";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const milestones = [
  { year: "2017", detail: "Création de Marhaban Canada par deux expatriés installés au Québec et en Ontario." },
  { year: "2019", detail: "Lancement du réseau d'experts (immigration, fiscalité, immobilier, assurances)." },
  { year: "2021", detail: "Ouverture du bureau virtuel dédié aux familles francophones et arabophones." },
  { year: "2024", detail: "Plus de 350 familles accompagnées et une équipe disponible 7j/7 dans plusieurs provinces." },
];

function About() {
  return (
    <div className="min-h-screen bg-brand-gray text-slate-800">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-red">À propos</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Une équipe impliquée dans votre réussite au Canada
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Marhaban Canada est né de la rencontre entre des experts de l&apos;immigration, des entrepreneurs et des professionnels déjà
            installés au Canada. Nous connaissons les défis liés au changement de pays, de culture et de système administratif.
          </p>
        </header>

        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Notre mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Fournir un accompagnement humain, transparent et hautement professionnel aux nouveaux arrivants afin qu&apos;ils gagnent du temps,
              évitent les erreurs coûteuses et s&apos;intègrent avec confiance au Canada.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Nos valeurs</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><strong className="text-slate-900">Bienveillance :</strong> comprendre vos enjeux humains et familiaux.</li>
              <li><strong className="text-slate-900">Expertise :</strong> travailler avec des partenaires certifiés et reconnus.</li>
              <li><strong className="text-slate-900">Transparence :</strong> des offres claires, sans surprise, adaptées à votre budget.</li>
              <li><strong className="text-slate-900">Performance :</strong> des résultats mesurables sur chaque volet de votre installation.</li>
            </ul>
          </article>
        </section>

        <section className="mt-12 rounded-3xl border border-brand-pale bg-white/80 p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Notre histoire</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Après avoir vécu les mêmes démarches, nous avons compris que les nouveaux arrivants avaient besoin d&apos;un partenaire fiable,
            disponible et connecté au terrain. Nous sommes présents au Québec, en Ontario et en Colombie-Britannique, avec des relais dans les
            principales villes étudiantes et économiques.
          </p>

          <div className="mt-6 space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.year} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-pale text-sm font-semibold text-brand-red">
                  {milestone.year}
                </span>
                <p className="text-sm text-slate-600">{milestone.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;

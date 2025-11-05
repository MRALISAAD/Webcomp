export default function FAQMini() {
  const faqs = [
    {
      q: "Quand commencer la préparation ?",
      a: "Avant le départ : RDV programmés, dossiers prêts."
    },
    {
      q: "Le logement est-il garanti ?",
      a: "Oui, pour Confort et Premium : logement validé avant l’arrivée."
    },
    {
      q: "Aidez-vous pour la RAMQ ?",
      a: "Oui, pour Confort et Premium."
    },
    {
      q: "Quel suivi après l’arrivée ?",
      a: "15 à 30 jours selon le pack choisi."
    }
  ];

  return (
    <section className="max-w-3xl mx-auto py-10">
      <h2 className="text-center text-2xl font-bold text-primary mb-6">
        Foire aux questions
      </h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="p-4 rounded-xl border border-grayText/30">
            <p className="font-semibold text-secondary">{f.q}</p>
            <p className="text-grayText">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

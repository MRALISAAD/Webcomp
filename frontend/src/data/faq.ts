export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export const faqItems: FaqItem[] = [
  { id: "reservation-delai", questionKey: "faq.items.0.question", answerKey: "faq.items.0.answer" },
  { id: "provinces", questionKey: "faq.items.1.question", answerKey: "faq.items.1.answer" },
  { id: "etudiants", questionKey: "faq.items.2.question", answerKey: "faq.items.2.answer" },
  { id: "suivi-post-installation", questionKey: "faq.items.3.question", answerKey: "faq.items.3.answer" },
  { id: "demarches-admin", questionKey: "faq.items.4.question", answerKey: "faq.items.4.answer" },
  { id: "multilingue", questionKey: "faq.items.5.question", answerKey: "faq.items.5.answer" },
  { id: "visa-retard", questionKey: "faq.items.6.question", answerKey: "faq.items.6.answer" },
  { id: "logement-garanti", questionKey: "faq.items.7.question", answerKey: "faq.items.7.answer" },
  { id: "partenaires", questionKey: "faq.items.8.question", answerKey: "faq.items.8.answer" },
  { id: "donnees", questionKey: "faq.items.9.question", answerKey: "faq.items.9.answer" }
];

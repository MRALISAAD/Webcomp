export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export const faqItems: FaqItem[] = [
  { id: "logement", questionKey: "faq.items.0.question", answerKey: "faq.items.0.answer" },
  { id: "demarches", questionKey: "faq.items.1.question", answerKey: "faq.items.1.answer" },
  { id: "suivi", questionKey: "faq.items.2.question", answerKey: "faq.items.2.answer" },
  { id: "accueil", questionKey: "faq.items.3.question", answerKey: "faq.items.3.answer" }
];

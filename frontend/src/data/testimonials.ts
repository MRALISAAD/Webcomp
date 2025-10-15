export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
  image: string;
}

export const heroTestimonials: Testimonial[] = [
  {
    id: "samira-b",
    quote: "En deux semaines, tout était prêt : logement, carte SIM et NAS. Équipe pro et attentionnée !",
    author: "Samira B.",
    role: "Étudiante",
    city: "Montréal",
    image: "/images/testimonials/placeholder.svg"
  },
  {
    id: "ahmed-lina",
    quote: "Accueil à l’aéroport et visite du logement parfaits. On s’est sentis soutenus.",
    author: "Ahmed & Lina",
    role: "Famille",
    city: "Québec",
    image: "/images/testimonials/placeholder.svg"
  },
  {
    id: "youssef-a",
    quote: "Tout organisé, même la banque : beaucoup moins de stress.",
    author: "Youssef A.",
    role: "Travailleur",
    city: "Toronto",
    image: "/images/testimonials/placeholder.svg"
  }
];

export const testimonials: Testimonial[] = [
  ...heroTestimonials,
  {
    id: "nawel-c",
    quote: "Le suivi WhatsApp est rassurant, même pour les questions de dernière minute.",
    author: "Nawel C.",
    role: "Nouvelle arrivante",
    city: "Laval",
    image: "/images/testimonials/placeholder.svg"
  },
  {
    id: "hassan-m",
    quote: "Une équipe vraiment humaine qui a compris nos besoins familiaux.",
    author: "Hassan M.",
    role: "Parent",
    city: "Ottawa",
    image: "/images/testimonials/placeholder.svg"
  },
  {
    id: "ines-d",
    quote: "Les partenaires recommandés nous ont permis de gagner du temps sur toutes les démarches.",
    author: "Inès D.",
    role: "Consultante",
    city: "Montréal",
    image: "/images/testimonials/placeholder.svg"
  },
  {
    id: "mohamed-k",
    quote: "Le pack Premium nous a permis de poser nos valises sereinement avec deux enfants.",
    author: "Mohamed K.",
    role: "Parent",
    city: "Moncton",
    image: "/images/testimonials/placeholder.svg"
  },
  {
    id: "amira-l",
    quote: "Basique suffit quand on arrive seul : ils ont couvert toutes mes démarches prioritaires.",
    author: "Amira L.",
    role: "Jeune professionnelle",
    city: "Vancouver",
    image: "/images/testimonials/placeholder.svg"
  }
];

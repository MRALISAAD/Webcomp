export type PackTier = "basique" | "standard" | "premium";

export interface PackFeature {
  label: string;
  tierAvailability: Record<PackTier, boolean>;
}

export interface PricingPack {
  id: PackTier;
  name: string;
  price: string;
  description: string;
  cta: {
    fr: string;
    en: string;
  };
  badge?: string;
}

export const pricingPacks: PricingPack[] = [
  {
    id: "basique",
    name: "Basique",
    price: "499 $",
    description: "Accueil aéroport avec concierge dédié et démarches prioritaires en 48 h.",
    cta: {
      fr: "Choisir Basique",
      en: "Choose Basic"
    }
  },
  {
    id: "standard",
    name: "Standard",
    price: "899 $",
    description: "Logement réservé avant votre arrivée et installation complète à Montréal.",
    badge: "Populaire",
    cta: {
      fr: "Choisir Standard",
      en: "Choose Standard"
    }
  },
  {
    id: "premium",
    name: "Premium",
    price: "1 399 $",
    description: "Suivi 30 jours, assistance famille et accélérateur carrière à l'arrivée.",
    badge: "Tout inclus",
    cta: {
      fr: "Choisir Premium",
      en: "Choose Premium"
    }
  }
] as const;

export const packFeatures: PackFeature[] = [
  {
    label: "Accueil aéroport personnalisé",
    tierAvailability: {
      basique: true,
      standard: true,
      premium: true
    }
  },
  {
    label: "Aide ouverture bancaire",
    tierAvailability: {
      basique: true,
      standard: true,
      premium: true
    }
  },
  {
    label: "NAS + carte SIM en 48 h",
    tierAvailability: {
      basique: true,
      standard: true,
      premium: true
    }
  },
  {
    label: "Liste de logements vérifiés",
    tierAvailability: {
      basique: true,
      standard: true,
      premium: true
    }
  },
  {
    label: "Support WhatsApp 7j/7",
    tierAvailability: {
      basique: true,
      standard: true,
      premium: true
    }
  },
  {
    label: "Réservation logement confirmée",
    tierAvailability: {
      basique: false,
      standard: true,
      premium: true
    }
  },
  {
    label: "Assurance maladie (RAMQ privée)",
    tierAvailability: {
      basique: false,
      standard: true,
      premium: true
    }
  },
  {
    label: "Orientation locale (transports, commerces)",
    tierAvailability: {
      basique: false,
      standard: true,
      premium: true
    }
  },
  {
    label: "Suivi concierge 30 jours",
    tierAvailability: {
      basique: false,
      standard: false,
      premium: true
    }
  },
  {
    label: "Aide recherche d'emploi / stage",
    tierAvailability: {
      basique: false,
      standard: false,
      premium: true
    }
  },
  {
    label: "Assistance familles (école, garderie)",
    tierAvailability: {
      basique: false,
      standard: false,
      premium: true
    }
  },
  {
    label: "Réduction carte ISIC",
    tierAvailability: {
      basique: false,
      standard: false,
      premium: true
    }
  }
] as const;

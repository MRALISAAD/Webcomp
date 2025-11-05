const PACK_CONFIG = {
  essential: { slug: "essential", label: "Essentiel" },
  comfort: { slug: "comfort", label: "Confort" },
  premium: { slug: "premium", label: "Premium" },
  custom: { slug: "custom", label: "Sur mesure" },
};

const ALIASES = {
  essential: "essential",
  essentiel: "essential",
  "pack essentiel": "essential",
  comfort: "comfort",
  confort: "comfort",
  "pack confort": "comfort",
  premium: "premium",
  "pack premium": "premium",
  surmesure: "custom",
  "sur-mesure": "custom",
  custom: "custom",
};

export function resolvePack(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");

  const slug = ALIASES[normalized] || "essential";
  return PACK_CONFIG[slug];
}

export function getPackLabelFromSlug(slug) {
  if (!slug) return PACK_CONFIG.essential.label;
  return PACK_CONFIG[slug]?.label || PACK_CONFIG.essential.label;
}

export function getPackSlug(slug) {
  if (!slug) return PACK_CONFIG.essential.slug;
  return PACK_CONFIG[slug]?.slug || PACK_CONFIG.essential.slug;
}

export const PACK_BREAKDOWN = Object.keys(PACK_CONFIG).reduce(
  (acc, key) => ({ ...acc, [key]: 0 }),
  {}
);

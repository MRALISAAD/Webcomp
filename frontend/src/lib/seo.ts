import { pricingPacks } from "../data/packs";

const defaultSiteUrl = import.meta.env.VITE_SITE_URL ?? "https://marhabancanada.ca";
const defaultOgImage = `${defaultSiteUrl}/images/montreal-skyline-night.jpg`;

export interface SeoMetadata {
  title: string;
  description: string;
  path?: string;
  image?: string;
  locale?: string;
}

export const buildCanonicalUrl = (path = ""): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${defaultSiteUrl.replace(/\/$/, "")}${normalized}`;
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Marhaban Canada",
  url: defaultSiteUrl,
  logo: `${defaultSiteUrl}/images/logoM.png`,
  sameAs: [
    "https://www.facebook.com/marhabancanada",
    "https://www.instagram.com/marhabancanada",
    "https://www.linkedin.com/company/marhabancanada"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-514-000-0000",
    contactType: "customer service",
    availableLanguage: ["French", "English", "Arabic"]
  }
};

export const productsJsonLd = pricingPacks.map((pack) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `Pack ${pack.name} Marhaban Canada`,
  description: pack.description,
  brand: "Marhaban Canada",
  offers: {
    "@type": "Offer",
    priceCurrency: "CAD",
    price: pack.price.replace(/[^\d.]/g, "") || "0",
    availability: "https://schema.org/InStock",
    url: buildCanonicalUrl(`/packs#${pack.id}`)
  }
}));

export const getOpenGraph = (seo: SeoMetadata) => ({
  siteName: "Marhaban Canada",
  title: seo.title,
  description: seo.description,
  url: buildCanonicalUrl(seo.path),
  images: [
    {
      url: seo.image ?? defaultOgImage,
      width: 1200,
      height: 630,
      alt: seo.title
    }
  ],
  type: "website",
  locale: seo.locale ?? "fr_CA"
});

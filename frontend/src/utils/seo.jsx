import { Helmet } from "react-helmet-async";

const BASE_URL = (import.meta.env.VITE_BASE_URL || "https://marhabancanada.ca").replace(/\/$/, "");
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Marhaban Canada";
const DEFAULT_OG = import.meta.env.VITE_OG_IMAGE || "/images/skyline_montreal.webp";
const THEME_COLOR = import.meta.env.VITE_THEME_COLOR || "#0F3D56";

export function PageSEO({ title, description, locale = "fr", path = "/", schema, alternates }) {
  const normalizedLocale = locale.startsWith("ar") ? "ar_CA" : locale.startsWith("en") ? "en_CA" : "fr_CA";
  const cleanedPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${BASE_URL}${cleanedPath}`;

  const defaultAlternates = {
    "fr-CA": canonical,
    "en-CA": `${BASE_URL}${cleanedPath}?lang=en`,
    "ar-CA": `${BASE_URL}${cleanedPath}?lang=ar`,
  };

  const alternateEntries = alternates ? Object.entries(alternates) : Object.entries(defaultAlternates);
  const jsonLd = schema || {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: canonical,
    name: title,
    description,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={normalizedLocale} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_OG} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG} />
      <meta name="theme-color" content={THEME_COLOR} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <link rel="canonical" href={canonical} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {alternateEntries.map(([hrefLang, href]) => (
        <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
      ))}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export function buildMeta({ title, description, locale, path }) {
  return { title, description, locale, path };
}

export { BASE_URL, SITE_NAME };

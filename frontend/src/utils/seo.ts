export interface MetaProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  locale?: string;
  imageAlt?: string;
}

const BASE_URL = "https://marhabancanada.ca";
const DEFAULT_IMAGE = `${BASE_URL}/assets/hero-illustration.png`;

export function buildMeta({ title, description, path = "/", image = DEFAULT_IMAGE, locale = "fr_CA", imageAlt }: MetaProps) {
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title,
    description,
    url,
    image,
    locale,
    imageAlt: imageAlt ?? title,
    openGraph: {
      title,
      description,
      url,
      image,
      locale,
      imageAlt: imageAlt ?? title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image,
    },
  } as const;
}

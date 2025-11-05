export function buildLocalBusinessSchema({ name, url, telephone, email, address, sameAs = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    telephone,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address?.streetAddress,
      addressLocality: address?.locality,
      addressRegion: address?.region,
      postalCode: address?.postalCode,
      addressCountry: address?.country || "CA",
    },
    sameAs,
  };
}

export function buildFaqSchema(items = [], locale = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale.startsWith("en") ? "en-CA" : "fr-CA",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBlogPostingSchema(post, baseUrl) {
  if (!post) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    url: `${baseUrl.replace(/\/$/, "")}/blog/${post.slug}`,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author,
        }
      : undefined,
    image: post.image,
  };
}

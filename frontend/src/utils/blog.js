import matter from "gray-matter";

const BLOG_BASE_PATH = "/blog";

function normalizeLocale(locale = "fr") {
  return locale.toLowerCase().startsWith("en") ? "en" : "fr";
}

const rawPosts = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const posts = Object.entries(rawPosts)
  .map(([, raw]) => {
    const { data, content } = matter(raw);
    if (!data?.slug) return null;
    const lang = normalizeLocale(data.lang);
    return {
      id: `${lang}-${data.slug}`,
      slug: data.slug,
      lang,
      translationKey: data.translationKey || data.slug,
      title: data.title,
      description: data.description,
      date: data.date,
      readingTime: data.readingTime,
      tags: data.tags || [],
      hero: data.hero || "/assets/hero.jpg",
      content,
    };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getPosts(locale = "fr") {
  const lang = normalizeLocale(locale);
  return posts.filter((post) => post.lang === lang);
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null;
}

export function getAlternates(translationKey, currentSlug) {
  return posts.filter((post) => post.translationKey === translationKey && post.slug !== currentSlug);
}

export function getAllPosts() {
  return posts;
}

export { BLOG_BASE_PATH };

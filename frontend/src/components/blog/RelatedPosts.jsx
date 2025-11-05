import { motion } from "framer-motion";
import Container from "../Container";
import { staggerChildren } from "../../utils/animations.js";
import PrefetchLink from "../PrefetchLink.jsx";

export default function RelatedPosts({ currentSlug, currentCategory, posts = [] }) {
  const sameCategory = posts.filter((post) => post.category === currentCategory && post.slug !== currentSlug);
  let related = sameCategory.slice(0, 3);

  if (related.length < 3) {
    const fallback = posts
      .filter((post) => post.slug !== currentSlug && !related.includes(post))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3 - related.length);
    related = [...related, ...fallback];
  }

  if (!related.length) return null;

  return (
    <motion.section
      className="mt-20 border-t border-slate-200 bg-white py-16 dark:border-slate-700 dark:bg-slate-900 md:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerChildren}
    >
      <Container>
        <h2 className="mb-10 text-center text-2xl font-bold text-primary dark:text-rose-200 md:text-3xl">
          À lire aussi
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {related.map((post) => (
            <motion.article
              key={post.id}
              className="rounded-2xl bg-beige p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800"
              variants={staggerChildren}
            >
              <img
                src={post.image}
                alt={post.title}
                className="mb-4 h-40 w-full rounded-xl object-cover"
                loading="lazy"
              />
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-slate-100">{post.title}</h3>
              <p className="mb-3 text-sm text-grayText line-clamp-3 dark:text-slate-300">{post.excerpt}</p>
              <PrefetchLink
                to={`/blog/${post.slug}`}
                prefetchKey="/blog/:slug"
                className="text-sm font-semibold text-secondary hover:underline"
              >
                Lire →
              </PrefetchLink>
            </motion.article>
          ))}
        </div>
      </Container>
    </motion.section>
  );
}

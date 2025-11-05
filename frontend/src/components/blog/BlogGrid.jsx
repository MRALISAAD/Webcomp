import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Container from "../Container";
import { sectionVariants, staggerChildren } from "../../utils/animations.js";
import PrefetchLink from "../PrefetchLink.jsx";

const dateFormatter = new Intl.DateTimeFormat("fr-CA", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatDate(value) {
  try {
    return dateFormatter.format(new Date(value));
  } catch {
    return value;
  }
}

const BlogGrid = memo(function BlogGrid({ posts = [] }) {
  const safePosts = useMemo(() => posts ?? [], [posts]);

  if (!safePosts.length) {
    return (
      <section className="bg-beige py-20 dark:bg-slate-950 md:py-24">
        <Container className="text-center text-sm text-grayText dark:text-slate-300">
          Aucun article disponible pour le moment.
        </Container>
      </section>
    );
  }

  return (
    <motion.section
      className="bg-beige py-20 font-inter dark:bg-slate-950 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {safePosts.map((post, index) => {
          const Icon = post.icon;
          return (
            <motion.article
              key={post.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-800"
              custom={index}
              variants={staggerChildren}
            >
              <PrefetchLink to={`/blog/${post.slug}`} className="block" prefetchKey="/blog/:slug">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />
              </PrefetchLink>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  <span>{post.category}</span>
                  <span className="text-xs text-grayText/60">• {formatDate(post.date)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100">{post.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-grayText dark:text-slate-300">{post.excerpt}</p>
                <PrefetchLink
                  to={`/blog/${post.slug}`}
                  prefetchKey="/blog/:slug"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition hover:gap-3"
                >
                  Lire l’article
                  <span aria-hidden>→</span>
                </PrefetchLink>
              </div>
            </motion.article>
          );
        })}
      </Container>
    </motion.section>
  );
});

export default BlogGrid;

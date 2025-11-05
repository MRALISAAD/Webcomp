import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "../lib/dayjs";
import { fetchBlogPost, type BlogPost as BlogPostType } from "../lib/api/blog";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";

const parseContent = (content: string) => {
  return content
    .split("## ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const [titleLine, ...rest] = section.split("\n");
      const paragraphs = rest
        .join("\n")
        .split("\n\n")
        .map((para) => para.trim())
        .filter(Boolean);
      return {
        heading: titleLine.trim(),
        paragraphs
      };
    });
};

const slugify = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!slug) return;
    (async () => {
      try {
        const data = await fetchBlogPost(slug);
        if (mounted) setPost(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const sections = useMemo(() => (post ? parseContent(post.content) : []), [post]);

  if (!loading && !post) {
    return <Navigate to="/blog" replace />;
  }

  const seo = post
    ? {
        title: `${post.title} | ${t("siteName")}`,
        description: post.excerpt,
        path: `/blog/${post.slug}`,
      }
    : { title: t("blog.title"), description: t("blog.intro"), path: "/blog" };

  const og = getOpenGraph({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    image: post?.coverImage,
    locale: i18n.language === "en" ? "en_CA" : "fr_CA"
  });

  const localeDate = dayjs(post.publishedAt).locale(i18n.language === "en" ? "en" : "fr");

  return (
    <article className="space-y-10">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={buildCanonicalUrl(seo.path)} />
        <meta property="og:title" content={og.title} />
        <meta property="og:description" content={og.description} />
        <meta property="og:url" content={og.url} />
        <meta property="og:type" content={og.type} />
        {og.images?.[0] && <meta property="og:image" content={og.images[0].url} />}
        <meta property="og:site_name" content={og.siteName} />
        <meta property="og:locale" content={og.locale} />
      </Helmet>

      <nav aria-label="breadcrumb" className="text-sm text-textSecondary dark:text-zinc-400">
        <ol className="flex items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary">
              {t("blog.breadcrumbs.home")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/blog" className="hover:text-primary">
              {t("blog.breadcrumbs.blog")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-textSecondary dark:text-zinc-300">{post.title}</li>
        </ol>
      </nav>

      {post && (
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-textMain dark:text-textLight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-textSecondary dark:text-zinc-400">
          <span>{t("blog.publishedOn", { date: localeDate.format("D MMMM YYYY") })}</span>
          <span>•</span>
          <span>{t("blog.minutesRead", { minutes: post.readingMinutes })}</span>
        </div>
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-80 w-full rounded-3xl object-cover"
          loading="lazy"
        />
      </header>
      )}

      {sections.length > 0 && (
        <aside className="rounded-2xl border border-lightGray bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-textSecondary dark:text-zinc-400">
            {t("blog.toc", "Sommaire")}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.heading}>
                <a className="text-primary hover:underline" href={`#${slugify(section.heading)}`}>
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {post && (
      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-textMain prose-p:text-textSecondary">
        {sections.map((section) => (
          <section key={section.heading} id={slugify(section.heading)}
            className="scroll-mt-24">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
      )}

      <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        ← {t("blog.backToList")}
      </Link>
    </article>
  );
};

export default BlogPost;

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import BlogCard from "../components/BlogCard";
import { fetchBlogPosts, type BlogPostSummary } from "../lib/api/blog";
import { Button } from "../components/ui/button";
import { buildCanonicalUrl, getOpenGraph } from "../lib/seo";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const seo = t("seo.blog", { returnObjects: true }) as {
    title: string;
    description: string;
    path: string;
  };
  const og = getOpenGraph({
    title: seo.title,
    description: seo.description,
    path: seo.path,
    locale: i18n.language === "en" ? "en_CA" : "fr_CA"
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchBlogPosts();
        if (mounted) setPosts(data);
      } catch {
        if (mounted) setPosts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 6, posts.length));
  };

  return (
    <div className="space-y-12">
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

      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-textMain dark:text-textLight">{t("blog.title")}</h1>
        <p className="text-lg text-textSecondary dark:text-zinc-300">{t("blog.intro")}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {!loading && posts.slice(0, visiblePosts).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {visiblePosts < posts.length && (
        <div className="flex justify-center">
          <Button onClick={handleLoadMore} variant="outline">
            {t("blog.loadMore", "Load more")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Blog;

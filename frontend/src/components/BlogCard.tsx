import { Link } from "react-router-dom";
import { BlogPost } from "../data/blogPosts";
import { Card, CardContent } from "./ui/card";
import dayjs from "../lib/dayjs";
import { useTranslation } from "react-i18next";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { t, i18n } = useTranslation();
  const localeDate = dayjs(post.publishedAt).locale(i18n.language === "en" ? "en" : "fr");

  return (
    <Card className="flex h-full flex-col">
      <img
        src={post.coverImage}
        alt={post.title}
        loading="lazy"
        className="h-48 w-full rounded-2xl object-cover"
      />
      <CardContent className="mt-4 flex h-full flex-col space-y-3">
        <div className="text-xs uppercase tracking-wide text-primary">
          {t("blog.publishedOn", { date: localeDate.format("D MMMM YYYY") })}
        </div>
        <h3 className="text-xl font-semibold text-ink dark:text-white">{post.title}</h3>
        <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-primary hover:underline">
          {t("blog.readMore")}
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;

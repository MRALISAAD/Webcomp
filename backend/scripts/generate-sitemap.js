import { fileURLToPath } from "node:url";
import path from "node:path";
import { promises as fs } from "node:fs";
import matter from "gray-matter";
import { ROUTES, EXCLUDED_FROM_SITEMAP } from "../../frontend/src/utils/routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../");
const blogDir = path.resolve(rootDir, "frontend/src/content/blog");
const outputFile = path.resolve(rootDir, "frontend/public/sitemap.xml");

const siteUrl = (process.env.BASE_URL || "https://marhabancanada.ca").replace(/\/$/, "");

async function readBlogPosts() {
  const entries = await fs.readdir(blogDir, { withFileTypes: true });
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map(async (entry) => {
        const raw = await fs.readFile(path.join(blogDir, entry.name), "utf8");
        const { data } = matter(raw);
        if (!data?.slug) return null;
        return {
          loc: `${siteUrl}/blog/${data.slug}`,
          changefreq: "monthly",
          priority: 0.6,
          lastmod: data.date ? new Date(data.date).toISOString() : undefined,
        };
      })
  );
  return posts.filter(Boolean);
}

function buildRouteEntry(route) {
  const loc = `${siteUrl}${route.path === "/" ? "" : route.path}`;
  return {
    loc,
    changefreq: route.changefreq || "monthly",
    priority: Number.isFinite(route.priority) ? route.priority : 0.5,
  };
}

function toXml(urls) {
  const items = urls
    .map((url) => {
      const parts = [
        `  <url>`,
        `    <loc>${url.loc}</loc>`,
        url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : null,
        url.changefreq ? `    <changefreq>${url.changefreq}</changefreq>` : null,
        url.priority ? `    <priority>${url.priority.toFixed(1)}</priority>` : null,
        `  </url>`,
      ].filter(Boolean);
      return parts.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

async function main() {
  const staticRoutes = ROUTES.filter((route) => !EXCLUDED_FROM_SITEMAP.includes(route.path)).map(buildRouteEntry);
  const blogPosts = await readBlogPosts();
  const urls = [...staticRoutes, ...blogPosts].sort((a, b) => a.loc.localeCompare(b.loc));
  const xml = toXml(urls);
  await fs.writeFile(outputFile, xml, "utf8");
  console.log(`✅ sitemap generated — ${urls.length} entries`);
}

main().catch((error) => {
  console.error("Failed to generate sitemap", error);
  process.exitCode = 1;
});

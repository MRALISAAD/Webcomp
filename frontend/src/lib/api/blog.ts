import { api } from "../axios";

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  readingMinutes: number;
}

export async function fetchBlogPosts(): Promise<BlogPostSummary[]> {
  const { data } = await api.get("/blog");
  return data?.posts || [];
}

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  const { data } = await api.get(`/blog/${slug}`);
  return data?.post || null;
}



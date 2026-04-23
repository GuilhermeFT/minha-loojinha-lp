import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  coverImage: string;
  author: string;
};

export type BlogPostMeta = BlogPostFrontmatter & {
  slug: string;
  readingTime: string;
};

function parseFile(slug: string): BlogPostMeta | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogPostFrontmatter;
  const minutes = Math.max(1, Math.ceil(readingTime(content).minutes));
  return {
    ...fm,
    slug,
    readingTime: `${minutes} min de leitura`,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPostMeta | null {
  return parseFile(slug);
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllSlugs()
    .map(parseFile)
    .filter((p): p is BlogPostMeta => p !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { formatPrice, launchNote, planPrices } from "@/lib/founder-price";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  coverImage: string;
  author: string;
  /** Data da última revisão (ISO); entra no dateModified e no sitemap. */
  updatedAt?: string;
  /** Resposta direta à pergunta do post, mostrada no topo: é o trecho que buscadores e IAs citam. */
  summary?: string;
  faq?: { question: string; answer: string }[];
};

export type BlogPostMeta = BlogPostFrontmatter & {
  slug: string;
  readingTime: string;
};

/**
 * Preços no frontmatter (FAQ, resumo): escreva R$ {{mensal}} / R$ {{anual}} (e {{lancamento}} logo depois), nunca o valor, para
 * o texto virar sozinho em 01/12 (planPrices). No corpo do post, use <PrecoMensal /> e <PrecoAnual />
 * (src/components/mdx-components.tsx). As páginas do blog se refazem a cada hora.
 */
function fillPrices<T>(value: T): T {
  const prices = planPrices();
  const values: Record<string, string> = {
    mensal: formatPrice(prices.monthly),
    anual: formatPrice(prices.yearly),
    lancamento: launchNote(prices),
  };
  return JSON.parse(JSON.stringify(value).replace(/\{\{(mensal|anual|lancamento)\}\}/g, (_, key: string) => values[key]));
}

function parseFile(slug: string): BlogPostMeta | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = fillPrices(data as BlogPostFrontmatter);
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

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPostMeta } from "@/lib/blog";

export function BlogPostCard({ post }: { post: BlogPostMeta }) {
  const formatted = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="h-full transition-shadow hover:shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-[var(--palette-darkest)] group-hover:text-[var(--palette-dark)]">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[var(--text-secondary)]">{post.description}</p>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            {formatted} · {post.readingTime}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

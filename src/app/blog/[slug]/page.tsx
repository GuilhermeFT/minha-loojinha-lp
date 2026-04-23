import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";

type Props = { params: Promise<{ slug: string }> };

const posts: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "organizar-pedidos-whatsapp": () =>
    import("@/content/blog/organizar-pedidos-whatsapp.mdx"),
  "bio-instagram-lojistas": () =>
    import("@/content/blog/bio-instagram-lojistas.mdx"),
  "vender-sem-loja-fisica": () =>
    import("@/content/blog/vender-sem-loja-fisica.mdx"),
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Não encontrado" };
  const baseUrl = siteUrl.replace(/\/$/, "");
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `${baseUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      url: `${baseUrl}/blog/${slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const loader = posts[slug];
  if (!post || !loader) notFound();

  const { default: MDXContent } = await loader();
  const baseUrl = siteUrl.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    image: `${baseUrl}${post.coverImage}`,
    mainEntityOfPage: `${baseUrl}/blog/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Minha Loojinha",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/og-image.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--palette-darkest)]">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readingTime}
          </p>
        </header>
        <div className="prose-blog">
          <MDXContent />
        </div>
      </article>
    </>
  );
}

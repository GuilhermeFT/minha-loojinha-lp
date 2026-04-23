import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog-post-card";
import { getAllPosts } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";
const baseUrl = siteUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Blog para lojistas de moda",
  description:
    "Dicas práticas para lojistas que vendem pelo WhatsApp e Instagram. Aprenda a organizar pedidos, atrair clientes e crescer sem abrir loja física.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "Blog para lojistas de moda",
    description:
      "Dicas práticas para lojistas que vendem pelo WhatsApp e Instagram. Aprenda a organizar pedidos, atrair clientes e crescer sem abrir loja física.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog Minha Loojinha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog para lojistas de moda",
    description:
      "Dicas práticas para lojistas que vendem pelo WhatsApp e Instagram.",
    images: ["/og-image.png"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <header className="mb-10 md:mb-14 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--palette-darkest)]">
          Blog
        </h1>
        <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Dicas práticas para lojistas que vendem pelo WhatsApp e Instagram.
          Aprenda a organizar pedidos, atrair clientes e crescer sem abrir loja
          física.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}

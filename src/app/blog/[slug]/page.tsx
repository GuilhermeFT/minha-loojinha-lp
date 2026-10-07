import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { JsonLd } from "@/components/json-ld";

const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";

type Props = { params: Promise<{ slug: string }> };

// As datas do frontmatter ("2026-10-07") são lidas como meia-noite UTC; formatar
// em UTC evita mostrar o dia anterior no fuso de Brasília
const formatPostDate = (date: string) =>
  new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// Cada .mdx em src/content/blog vira um post; o slug é o nome do arquivo
const loadPost = (slug: string): Promise<{ default: React.ComponentType }> =>
  import(`@/content/blog/${slug}.mdx`);

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
      modifiedTime: post.updatedAt ?? post.publishedAt,
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
  if (!post) notFound();

  const { default: MDXContent } = await loadPost(slug).catch(() => notFound());
  const baseUrl = siteUrl.replace(/\/$/, "");
  const postUrl = `${baseUrl}/blog/${slug}`;
  const jsonLd: object[] = [{
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary ?? post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: post.author },
    image: `${baseUrl}${post.coverImage}`,
    mainEntityOfPage: postUrl,
    publisher: {
      "@type": "Organization",
      name: "Minha Loojinha",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/og-image.png`,
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  }];
  if (post.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--palette-darkest)]">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            {formatPostDate(post.publishedAt)}{" "}
            · {post.readingTime}
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                {" "}· Atualizado em{" "}
                {formatPostDate(post.updatedAt)}
              </>
            )}
          </p>
        </header>
        {post.summary && (
          <aside
            aria-label="Resposta rápida"
            className="mb-10 rounded-xl border border-[hsl(var(--border))] bg-[var(--bg-warm-2)] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--palette-mid)]">
              Resposta rápida
            </p>
            <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">{post.summary}</p>
          </aside>
        )}
        <div className="prose-blog">
          <MDXContent />
        </div>
        {post.faq && post.faq.length > 0 && (
          <section className="mt-14" aria-labelledby="faq-title">
            <h2 id="faq-title" className="text-2xl font-bold text-[var(--palette-darkest)]">
              Perguntas frequentes
            </h2>
            <div className="mt-6 divide-y divide-[hsl(var(--border))] rounded-xl border border-[hsl(var(--border))]">
              {post.faq.map((item) => (
                <details key={item.question} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--palette-darkest)] [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span aria-hidden className="shrink-0 text-xl leading-none text-[var(--palette-mid)] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

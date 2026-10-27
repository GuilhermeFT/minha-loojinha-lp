import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLpContent,
  getLpContentPaths,
  mergeWithLivePrices,
} from "@/lib/content";
import { LpPageContent } from "@/components/lp-page-content";
import { OtherCities } from "@/components/other-cities";
import { isCityPage } from "@/lib/cities";
import { planPrices } from "@/lib/founder-price";

// Preço de fundadora vira em 01/12: a página se refaz a cada hora
export const revalidate = 3600;

const siteUrlDefault =
  process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paths = getLpContentPaths();
  if (!paths.includes(slug)) {
    return { title: "Não encontrado" };
  }
  const content = getLpContent(slug);
  const baseUrl = siteUrlDefault.replace(/\/$/, "");
  const url = `${baseUrl}/${slug}`;
  return {
    title: { absolute: content.meta.title },
    description: content.meta.description,
    keywords: content.meta.keywords,
    alternates: {
      canonical: url,
    },
    // Sem isto a página herda og:title/og:url da home (layout raiz).
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
      url,
      siteName: "Minha Loojinha",
      type: "website",
      locale: "pt_BR",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
      images: ["/og-image.png"],
    },
  };
}

export async function generateStaticParams() {
  const paths = getLpContentPaths();
  return paths.filter((p) => p !== "main").map((slug) => ({ slug }));
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const paths = getLpContentPaths();
  if (!paths.includes(slug)) {
    notFound();
  }

  const content = mergeWithLivePrices(getLpContent(slug), planPrices());
  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";
  const baseUrl = siteUrl.replace(/\/$/, "");

  return (
    <>
      <LpPageContent content={content} baseUrl={baseUrl} />
      {isCityPage(slug) && <OtherCities currentSlug={slug} />}
    </>
  );
}

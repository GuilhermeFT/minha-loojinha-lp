import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getLpContent,
  getLpContentPaths,
  mergeWithLivePrices,
} from "@/lib/content";
import { LpPageContent } from "@/components/lp-page-content";
import { NewLp } from "@/components/lp/new-lp";
import { OtherCities } from "@/components/other-cities";
import { CITY_PAGES, isCityPage } from "@/lib/cities";
import { offerLabel, offerMetaSentence } from "@/content/lp-new";
import { planPrices } from "@/lib/founder-price";
import { pageClock } from "@/lib/phase-preview";

// Preço de lançamento vira em 01/12 (e o tema Black Friday entra em 23/11): a página se refaz a cada hora
export const revalidate = 3600;

const siteUrlDefault =
  process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";

/** A página antiga, mantida como controle do teste antes × depois (fora do índice e do sitemap). */
const CONTROL_SLUG = "classico";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = siteUrlDefault.replace(/\/$/, "");
  if (slug === CONTROL_SLUG) {
    const content = getLpContent("main");
    return {
      title: { absolute: content.meta.title },
      description: content.meta.description,
      alternates: { canonical: baseUrl },
      robots: { index: false, follow: true },
    };
  }
  const paths = getLpContentPaths();
  if (!paths.includes(slug)) {
    return { title: "Não encontrado" };
  }
  const content = getLpContent(slug);
  const url = `${baseUrl}/${slug}`;
  return {
    title: { absolute: content.meta.title },
    description: content.meta.description + offerMetaSentence(planPrices()),
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
  return [...paths.filter((p) => p !== "main"), CONTROL_SLUG].map((slug) => ({ slug }));
}

/** Rótulo do hero e da seção local: "Para quem vende em Goiânia", ou genérico nas variantes. */
function localInfo(slug: string): { label: string; place: string | null } {
  const city = CITY_PAGES.find((c) => c.slug === slug);
  return city
    ? { label: `Para quem vende ${city.slug === "rio-de-janeiro" ? "no" : "em"} ${city.name}`, place: city.name }
    : { label: "Para quem vende na sua região", place: null };
}

export default async function SlugPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";
  const baseUrl = siteUrl.replace(/\/$/, "");

  if (slug === CONTROL_SLUG) {
    const content = mergeWithLivePrices(getLpContent("main"), planPrices());
    return <LpPageContent content={content} baseUrl={baseUrl} />;
  }

  const paths = getLpContentPaths();
  if (!paths.includes(slug)) {
    notFound();
  }

  const clock = await pageClock(searchParams);
  const prices = planPrices(clock.now);
  const content = mergeWithLivePrices(getLpContent(slug), prices);

  return (
    <NewLp
      content={content}
      baseUrl={baseUrl}
      phase={clock.phase}
      offer={offerLabel(clock.now)}
      prices={prices}
      offsetMs={clock.offsetMs}
      local={localInfo(slug)}
    >
      {isCityPage(slug) && <OtherCities currentSlug={slug} />}
    </NewLp>
  );
}

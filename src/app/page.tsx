import type { Metadata } from "next";
import { getLpContent, mergeWithLivePrices } from "@/lib/content";
import { LpPageContent } from "@/components/lp-page-content";
import { planPrices } from "@/lib/founder-price";

// Preço de fundadora vira em 01/12: a página se refaz a cada hora
export const revalidate = 3600;

const siteUrlDefault =
  process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";

export function generateMetadata(): Metadata {
  const content = getLpContent("main");
  return {
    title: { absolute: content.meta.title },
    description: content.meta.description,
    alternates: {
      canonical: siteUrlDefault.replace(/\/$/, ""),
    },
  };
}

export default async function Home() {
  const content = mergeWithLivePrices(getLpContent("main"), planPrices());
  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";
  const baseUrl = siteUrl.replace(/\/$/, "");

  return <LpPageContent content={content} baseUrl={baseUrl} />;
}

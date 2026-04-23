import type { Metadata } from "next";
import { getLpContent, mergeWithLivePrices } from "@/lib/content";
import { LpPageContent } from "@/components/lp-page-content";
import { getPlansPrice } from "@/services/plans.service";

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
  const [rawContent, prices] = await Promise.all([
    Promise.resolve(getLpContent("main")),
    getPlansPrice(),
  ]);
  const content = mergeWithLivePrices(rawContent, prices);
  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";
  const baseUrl = siteUrl.replace(/\/$/, "");

  return <LpPageContent content={content} baseUrl={baseUrl} />;
}

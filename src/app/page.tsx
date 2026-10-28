import type { Metadata } from "next";
import { getLpContent, mergeWithLivePrices } from "@/lib/content";
import { NewLp } from "@/components/lp/new-lp";
import { planPrices } from "@/lib/founder-price";
import { offerLabel, offerMetaSentence } from "@/content/lp-new";
import { pageClock } from "@/lib/phase-preview";

// Preço de lançamento vira em 01/12 (e o tema Black Friday entra em 23/11): a página se refaz a cada hora
export const revalidate = 3600;

const siteUrlDefault =
  process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";

export function generateMetadata(): Metadata {
  const content = getLpContent("main");
  return {
    title: { absolute: content.meta.title },
    description: content.meta.description + offerMetaSentence(planPrices()),
    alternates: {
      canonical: siteUrlDefault.replace(/\/$/, ""),
    },
  };
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function Home({ searchParams }: Props) {
  // Em produção pageClock nem olha searchParams (a página continua estática); em dev aceita ?fase=
  const clock = await pageClock(searchParams);
  const prices = planPrices(clock.now);
  const content = mergeWithLivePrices(getLpContent("main"), prices);
  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";
  const baseUrl = siteUrl.replace(/\/$/, "");

  return (
    <NewLp
      content={content}
      baseUrl={baseUrl}
      phase={clock.phase}
      offer={offerLabel(clock.now)}
      prices={prices}
      offsetMs={clock.offsetMs}
    />
  );
}

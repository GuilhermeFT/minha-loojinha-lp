import type { Metadata } from "next";
import { getLpContent } from "@/lib/content";
import { LpPageContent } from "@/components/lp-page-content";

const siteUrlDefault = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";

export function generateMetadata(): Metadata {
  const content = getLpContent("main");
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: siteUrlDefault.replace(/\/$/, ""),
    },
  };
}

export default function Home() {
  const content = getLpContent("main");
  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";
  const baseUrl = siteUrl.replace(/\/$/, "");

  return <LpPageContent content={content} baseUrl={baseUrl} />;
}

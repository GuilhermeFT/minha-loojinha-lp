"use client";

// "Ver uma loja de exemplo": abre a loja de demonstração em nova aba, com UTM, e registra o
// clique no GA4 (não é Lead: não vai para a Meta).

import { DEMO_STORE_URL } from "@/content/demo-store";
import { trackEvent } from "@/lib/tracking";

export function demoStoreHref(medium: string): string {
  return `${DEMO_STORE_URL}?utm_source=lp&utm_medium=${medium}&utm_campaign=demo`;
}

type Props = {
  children: React.ReactNode;
  className?: string;
  /** utm_medium e location do evento (ex.: hero). */
  medium?: string;
};

export function DemoStoreLink({ children, className, medium = "hero" }: Props) {
  return (
    <a
      href={demoStoreHref(medium)}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={() => trackEvent({ ga4Event: "view_demo_store", params: { location: medium } })}
    >
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

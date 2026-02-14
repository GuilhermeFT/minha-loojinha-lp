"use client";

import { Button } from "@/components/ui/button";
import { CheckoutTrigger } from "@/components/checkout-trigger";

export function FooterCta() {
  return (
    <div>
      <h3 className="font-semibold text-[var(--foreground)]">
        Garantir minha vaga
      </h3>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        R$ 49,90/mês — 90 dias grátis para testar.
      </p>
      <CheckoutTrigger asChild>
        <Button type="button" size="sm" className="mt-4 w-full">
          Começar agora
        </Button>
      </CheckoutTrigger>
    </div>
  );
}

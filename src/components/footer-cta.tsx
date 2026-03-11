"use client";

import { Button } from "@/components/ui/button";
import { CheckoutTrigger } from "@/components/checkout-trigger";

export function FooterCta() {
  return (
    <div>
      <h3 className="font-semibold text-white/90">
        Acessar a plataforma
      </h3>
      <p className="mt-1 text-sm text-white/60">
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

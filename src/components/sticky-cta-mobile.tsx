"use client";

import { Button } from "@/components/ui/button";
import { CheckoutTrigger } from "@/components/checkout-trigger";

export function StickyCtaMobile() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[hsl(var(--border))] bg-[var(--background)]/95 p-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <CheckoutTrigger asChild>
        <Button
          type="button"
          size="lg"
          className="w-full min-h-12 text-center text-sm leading-tight sm:text-base"
        >
          Garantir minha vaga — R$ 49,90/mês
        </Button>
      </CheckoutTrigger>
    </div>
  );
}

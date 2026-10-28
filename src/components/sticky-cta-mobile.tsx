"use client";

// Botão fixo no rodapé do celular. Só aparece depois que o botão do hero sai da tela, para o
// começo da página (faixa fixa no topo + hero) não ficar espremido.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckoutTrigger } from "@/components/checkout-trigger";
import { useLpShared } from "@/components/lp-content-context";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 560;

export function StickyCtaMobile() {
  const shared = useLpShared();
  // /classico (controle do teste): como era antes, sempre visível
  const classic = usePathname() === "/classico";
  const [scrolled, setScrolled] = useState(false);
  const show = classic || scrolled;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-[hsl(var(--border))] bg-[var(--background)]/95 p-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <CheckoutTrigger asChild location="sticky_mobile">
        <Button
          type="button"
          size="lg"
          tabIndex={show ? 0 : -1}
          className={cn(
            "w-full min-h-12 text-center text-sm leading-tight sm:text-base",
            !classic && "h-auto whitespace-normal rounded-full bg-[#530083] py-3 hover:bg-[#410068]",
          )}
        >
          {classic ? shared.stickyCtaMobile : "Criar loja grátis"}
        </Button>
      </CheckoutTrigger>
    </div>
  );
}

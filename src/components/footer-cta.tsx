"use client";

import { Button } from "@/components/ui/button";
import { CheckoutTrigger } from "@/components/checkout-trigger";
import { useLpShared } from "@/components/lp-content-context";
import { usePathname } from "next/navigation";

export function FooterCta() {
  const shared = useLpShared();
  const classic = usePathname() === "/classico";
  return (
    <div>
      <h3 className="font-semibold text-white/90">{shared.footerCtaTitle}</h3>
      <p className="mt-1 text-sm text-white/60">{shared.footerCtaSubtitle}</p>
      <CheckoutTrigger asChild location="footer">
        <Button type="button" size="sm" className={classic ? "mt-4 w-full" : "mt-4 h-auto w-full whitespace-normal rounded-full bg-[#530083] py-2.5 hover:bg-[#410068]"}>
          {classic ? shared.footerCtaButton : "Criar loja grátis"}
        </Button>
      </CheckoutTrigger>
    </div>
  );
}

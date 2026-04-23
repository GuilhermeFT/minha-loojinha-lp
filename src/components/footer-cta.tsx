"use client";

import { Button } from "@/components/ui/button";
import { CheckoutTrigger } from "@/components/checkout-trigger";
import { useLpShared } from "@/components/lp-content-context";

export function FooterCta() {
  const shared = useLpShared();
  return (
    <div>
      <h3 className="font-semibold text-white/90">{shared.footerCtaTitle}</h3>
      <p className="mt-1 text-sm text-white/60">{shared.footerCtaSubtitle}</p>
      <CheckoutTrigger asChild location="footer">
        <Button type="button" size="sm" className="mt-4 w-full">
          {shared.footerCtaButton}
        </Button>
      </CheckoutTrigger>
    </div>
  );
}

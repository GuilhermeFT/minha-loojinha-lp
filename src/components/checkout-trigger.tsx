"use client";

import React from "react";
import { trackEvent } from "@/lib/tracking";
import { panelSignupUrl } from "@/lib/panel-url";

type CheckoutTriggerProps = {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  /** Location/section for analytics (e.g. hero, benefits, header, pricing) */
  location?: string;
};

export function CheckoutTrigger({
  children,
  className,
  asChild,
  location = "cta",
}: CheckoutTriggerProps) {
  const goToPanel = () => {
    trackEvent({
      metaEvent: "Lead",
      ga4Event: "generate_lead",
      params: { location },
    });
    window.location.href = panelSignupUrl();
  };

  if (asChild && React.isValidElement(children)) {
    return (
      <div
        className={className}
        onClick={(e) => {
          e.preventDefault();
          goToPanel();
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        goToPanel();
      }}
    >
      {children}
    </button>
  );
}

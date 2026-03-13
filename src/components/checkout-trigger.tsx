"use client";

import React from "react";
import { sendGAEvent } from "@next/third-parties/google";

const PAINEL_URL =
  process.env.NEXT_PUBLIC_PANEL_URL ?? "https://painel.minhaloojinha.com/";

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
    sendGAEvent("event", "cta_click", {
      value: "acessar_plataforma",
      location,
    });
    window.location.href = PAINEL_URL;
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

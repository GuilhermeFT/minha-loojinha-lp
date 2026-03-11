"use client";

import React from "react";

const PAINEL_URL =
  process.env.NEXT_PUBLIC_PANEL_URL ?? "https://painel.minhaloojinha.com/";

type CheckoutTriggerProps = {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
};

export function CheckoutTrigger({
  children,
  className,
  asChild,
}: CheckoutTriggerProps) {
  const goToPanel = () => {
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

"use client";

import React from "react";
import { useCheckout } from "@/components/checkout-provider";

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
  const { openCheckout } = useCheckout();

  if (asChild && React.isValidElement(children)) {
    return (
      <div
        className={className}
        onClick={(e) => {
          e.preventDefault();
          openCheckout();
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
        openCheckout();
      }}
    >
      {children}
    </button>
  );
}

"use client";

import { createContext, useContext } from "react";
import { panelSignupUrl } from "@/lib/panel-url";

type CheckoutContextValue = {
  openCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const openCheckout = () => {
    window.location.href = panelSignupUrl();
  };

  return (
    <CheckoutContext.Provider value={{ openCheckout }}>
      {children}
      {/* Form dialog and thank-you modal hidden while CTAs redirect to panel */}
      {/* <CheckoutDialog ... /> */}
      {/* <ThankYouModal ... /> */}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}

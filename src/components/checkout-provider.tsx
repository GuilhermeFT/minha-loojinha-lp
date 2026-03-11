"use client";

import { createContext, useContext } from "react";

type CheckoutContextValue = {
  openCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const openCheckout = () => {
    const url =
      process.env.NEXT_PUBLIC_PANEL_URL ?? "https://painel.minhaloojinha.com/";
    window.location.href = url;
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

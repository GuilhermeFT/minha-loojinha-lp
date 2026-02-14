"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CheckoutDialog } from "@/components/checkout-dialog";

type CheckoutContextValue = {
  openCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openCheckout = useCallback(() => setOpen(true), []);

  return (
    <CheckoutContext.Provider value={{ openCheckout }}>
      {children}
      <CheckoutDialog open={open} onOpenChange={setOpen} />
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}

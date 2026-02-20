"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CheckoutDialog } from "@/components/checkout-dialog";
import { ThankYouModal } from "@/components/thank-you-modal";

type CheckoutContextValue = {
  openCheckout: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const openCheckout = useCallback(() => setOpen(true), []);

  const handleLeadSuccess = useCallback(() => {
    setThankYouOpen(true);
  }, []);

  return (
    <CheckoutContext.Provider value={{ openCheckout }}>
      {children}
      <CheckoutDialog
        key={open ? "open" : "closed"}
        open={open}
        onOpenChange={setOpen}
        onLeadSuccess={handleLeadSuccess}
      />
      <ThankYouModal open={thankYouOpen} onOpenChange={setThankYouOpen} />
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}

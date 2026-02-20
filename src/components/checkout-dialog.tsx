"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { submitCtaLead } from "@/actions/cta-lead";

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

type CheckoutDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeadSuccess?: () => void;
};

export function CheckoutDialog({
  open,
  onOpenChange,
  onLeadSuccess,
}: CheckoutDialogProps) {
  const [phone, setPhone] = useState("");
  const [state, formAction, isPending] = useActionState(
    async (
      _prev: { message: string; ok: boolean } | null,
      formData: FormData
    ) => {
      const result = await submitCtaLead(formData);
      return { message: result.message, ok: result.ok };
    },
    null as { message: string; ok: boolean } | null
  );

  useEffect(() => {
    if (state?.ok) {
      onOpenChange(false);
      onLeadSuccess?.();
    }
  }, [state?.ok, onOpenChange, onLeadSuccess]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatWhatsApp(e.target.value));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Garantir minha vaga</DialogTitle>
          <DialogDescription>
            Preencha seus dados que entraremos em contato em breve.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4 pt-2">
          <Input
            type="text"
            name="name"
            placeholder="Nome completo"
            disabled={isPending}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            disabled={isPending}
            required
          />
          <Input
            type="tel"
            name="phone"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={handlePhoneChange}
            disabled={isPending}
            maxLength={16}
            inputMode="numeric"
            autoComplete="tel"
          />
          {state?.message && (
            <p
              className={cn(
                "text-sm",
                state.ok
                  ? "text-[hsl(var(--primary))]"
                  : "text-red-600 dark:text-red-400"
              )}
            >
              {state.message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Enviando..." : "Quero garantir minha vaga"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

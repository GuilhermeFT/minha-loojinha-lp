"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CHECKOUT_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_CHECKOUT_URL
    : "";

type CheckoutDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Preencha seu nome.");
      return;
    }
    if (!email.trim()) {
      setError("Preencha seu e-mail.");
      return;
    }
    const url = CHECKOUT_URL || "";
    if (!url) {
      setError("Checkout não configurado. Tente mais tarde.");
      return;
    }
    setLoading(true);
    const params = new URLSearchParams({
      name: name.trim(),
      email: email.trim(),
      ...(phone.trim() && { phone: phone.trim() }),
    });
    const target = url.includes("?") ? `${url}&${params}` : `${url}?${params}`;
    window.location.href = target;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Garantir minha vaga</DialogTitle>
          <DialogDescription>
            Preencha seus dados. Em seguida você será redirecionado para a
            página de pagamento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <Input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <Input
            type="tel"
            placeholder="Telefone / WhatsApp (opcional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
          />
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Redirecionando..." : "Continuar para o pagamento"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

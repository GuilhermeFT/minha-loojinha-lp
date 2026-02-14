"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logoLight from "@/assets/minhaloojinha-logo-light.svg";
import logoDark from "@/assets/minhaloojinha-logo-dark.svg";
import { Button } from "@/components/ui/button";
import { CheckoutTrigger } from "@/components/checkout-trigger";

const navLinks = [
  { href: "/#beneficios", label: "Benefícios" },
  { href: "/#preco", label: "Preço" },
  { href: "/#duvidas", label: "Dúvidas" },
  { href: "/politica-de-privacidade", label: "Privacidade" },
  { href: "/termos-de-uso", label: "Termos" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoLight}
            alt="Minha Loojinha"
            className="h-8 w-auto dark:hidden"
            width={140}
            height={32}
            priority
          />
          <Image
            src={logoDark}
            alt="Minha Loojinha"
            className="hidden h-8 w-auto dark:block"
            width={140}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center justify-end gap-4 md:flex md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
          <CheckoutTrigger asChild>
            <Button type="button" size="sm" className="shrink-0">
              Garantir vaga — R$ 49,90/mês
            </Button>
          </CheckoutTrigger>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={mobileMenuOpen}
          className="flex size-10 items-center justify-center rounded-lg text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[var(--foreground)] md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            aria-hidden
            onClick={closeMobileMenu}
          />
          <div
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-[hsl(var(--border))] bg-[var(--background)] shadow-[var(--shadow-card)] md:hidden"
            role="dialog"
            aria-modal
            aria-label="Menu de navegação"
          >
            <div className="flex h-16 items-center justify-between border-b border-[hsl(var(--border))] px-4">
              <span className="font-semibold text-[var(--foreground)]">
                Menu
              </span>
              <button
                type="button"
                aria-label="Fechar menu"
                className="flex size-10 items-center justify-center rounded-lg text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[var(--foreground)]"
                onClick={closeMobileMenu}
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-base font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--muted))] hover:text-[var(--foreground)]"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 px-0">
                <CheckoutTrigger asChild>
                  <Button type="button" size="lg" className="w-full">
                    Garantir vaga — R$ 49,90/mês
                  </Button>
                </CheckoutTrigger>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

// Peças pequenas da LP no estilo do painel (DESIGN.md): pill lilás de rótulo e o card da oferta.

import { CountdownInline } from "@/components/lp/countdown";
import { formatPrice, type PlanPrices } from "@/lib/founder-price";
import { cn } from "@/lib/utils";

/** Rótulo de seção: pill lilás com label-sm em maiúsculas. */
export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("lp-label inline-flex rounded-full bg-[var(--lilac)] px-3 py-1.5 text-[var(--lilac-ink)]", className)}>
      {children}
    </p>
  );
}

/**
 * Card da oferta no hero: preço de lançamento + prazo + contagem; depois de 30/11, o grátis.
 * Centralizado no celular, alinhado à esquerda no desktop.
 */
export function OfferCard({ label, prices, offsetMs }: { label: string | null; prices: PlanPrices; offsetMs: number }) {
  if (!prices.founder || !label) {
    return (
      <div className="lp-card mx-auto mt-7 max-w-[24rem] p-5 lg:mx-0">
        <p className="lp-label text-[var(--text-2)]">Comece grátis</p>
        <p className="lp-num mt-2 text-[2.25rem] leading-none text-[var(--title)]">
          R$ 0<span className="ml-1 text-base font-medium tracking-normal text-[var(--text-2)]">/mês</span>
        </p>
        <p className="mt-2 text-[0.95rem] leading-snug text-[var(--text-2)] text-balance">
          Até 10 produtos, sem cartão. Ilimitado: R$&nbsp;{formatPrice(prices.monthly)}/mês.
        </p>
      </div>
    );
  }
  return (
    <div className="lp-card mx-auto mt-7 max-w-[24rem] p-5 lg:mx-0">
      <p className="lp-label text-balance text-[var(--action-text)]">{label}</p>
      <p className="lp-num mt-2 text-[2.25rem] leading-none text-[var(--title)]">
        R$ {formatPrice(prices.monthly)}
        <span className="ml-1 text-base font-medium tracking-normal text-[var(--text-2)]">/mês</span>
      </p>
      <p className="mt-2 text-[0.95rem] leading-snug text-[var(--text-2)] text-balance">
        ou R$&nbsp;{formatPrice(prices.yearly)}/ano, para quem assinar até 30/11. Garantido enquanto você for assinante.
      </p>
      <p className="mt-3 border-t border-[var(--hairline)] pt-3 text-[0.9rem] font-semibold text-[var(--text)]">
        Termina em <CountdownInline offsetMs={offsetMs} className="lp-num text-[var(--countdown)]" />
      </p>
    </div>
  );
}

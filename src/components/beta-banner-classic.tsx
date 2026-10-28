"use client";

// Faixa do topo da página antiga (/classico, controle do teste). A nova está em beta-banner.tsx.
// Faixa do topo. Até 30/11: preço de fundadora com contagem regressiva (na semana da Black
// Friday vira "última chance"); depois volta à mensagem de sempre. Datas em src/lib/founder-price.ts.

import { useEffect, useState } from "react";
import { Flame, Zap } from "lucide-react";
import { founderCountdown, founderPhase, formatPrice, planPrices } from "@/lib/founder-price";

function countdownLabel(now: Date): string | null {
  const left = founderCountdown(now);
  if (!left) return null;
  if (left.days >= 1) return `${left.days}d ${left.hours}h`;
  return `${left.hours}h ${String(left.minutes).padStart(2, "0")}min`;
}

export function BetaBannerClassic() {
  // A contagem só aparece no navegador (o HTML estático não sabe a hora de quem abre)
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 30_000);
    return () => clearInterval(timer);
  }, []);

  const phase = founderPhase(now ?? new Date());
  const price = formatPrice(planPrices(now ?? new Date()).monthly);
  const left = now ? countdownLabel(now) : null;

  if (phase === "ended") {
    return (
      <div className="bg-[#111111] text-white">
        <div className="container mx-auto max-w-6xl px-3 py-2 sm:px-6">
          <p className="flex items-center justify-center gap-2 text-center text-xs leading-snug text-white/90 sm:text-sm">
            <Zap className="size-3.5 shrink-0 fill-current text-[var(--accent-amber)]" />
            Comece grátis, sem cartão · Sem taxa por venda · Sem fidelidade
          </p>
        </div>
      </div>
    );
  }

  const blackFriday = phase === "black_friday";
  return (
    <a href="#preco" className="block bg-[#111111] text-white transition-colors hover:bg-black">
      <div className="container mx-auto max-w-6xl px-3 py-2 sm:px-6">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-xs leading-snug text-white/90 sm:text-sm">
          {blackFriday ? (
            <Flame className="size-3.5 shrink-0 fill-current text-[var(--accent-amber)]" />
          ) : (
            <Zap className="size-3.5 shrink-0 fill-current text-[var(--accent-amber)]" />
          )}
          <span>
            <strong className="font-semibold text-white">
              {blackFriday ? "Black Friday: última chance" : "Preço de fundadora"}
            </strong>{" "}
            · R$ {price}/mês para sempre para quem assinar até 30/11
          </span>
          {left && (
            <span className="rounded-full bg-[var(--accent-amber)] px-2 py-0.5 font-semibold tabular-nums text-[#111111]">
              termina em {left}
            </span>
          )}
        </p>
      </div>
    </a>
  );
}

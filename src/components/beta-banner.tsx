"use client";

// Faixa do topo. Até 30/11: preço de lançamento com contagem (na semana da Black Friday vira
// "última semana", preta com âmbar; nas últimas 24 h, "último dia"); no celular fica fixa ao
// rolar. Depois volta à mensagem de sempre. Datas em src/lib/founder-price.ts; em dev, ?fase= finge a data (src/lib/phase-preview.ts).
// Em /classico (controle do teste) mostra a faixa antiga.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BetaBannerClassic } from "@/components/beta-banner-classic";
import { getLpContentPaths } from "@/lib/content";
import { offerLabel } from "@/content/lp-new";
import { founderCountdown, founderPhase, formatPrice, planPrices } from "@/lib/founder-price";
import { previewNow } from "@/lib/phase-preview";
import { cn } from "@/lib/utils";

function countdownLabel(now: Date): string | null {
  const left = founderCountdown(now);
  if (!left) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (left.days >= 1) return `${left.days}d ${pad(left.hours)}h ${pad(left.minutes)}min`;
  return `${pad(left.hours)}h ${pad(left.minutes)}min`;
}

export function BetaBanner() {
  const pathname = usePathname();
  // A contagem só aparece no navegador (o HTML estático não sabe a hora de quem abre)
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const fake = previewNow(new URLSearchParams(window.location.search).get("fase"));
    const offset = fake ? fake.getTime() - Date.now() : 0;
    const tick = () => setNow(new Date(Date.now() + offset));
    tick();
    const timer = setInterval(tick, 20_000);
    return () => clearInterval(timer);
  }, []);

  if (pathname === "/classico") return <BetaBannerClassic />;

  const at = now ?? new Date();
  const phase = founderPhase(at);
  const prices = planPrices(at);
  const left = now ? countdownLabel(now) : null;
  const label = offerLabel(at);

  if (phase === "ended" || !label) {
    return (
      <div className="bg-[#27003e] text-white">
        <p className="mx-auto max-w-6xl px-4 py-2.5 text-center text-[0.8rem] font-semibold sm:px-6">
          Comece grátis, sem cartão · Sem taxa por venda · Sem fidelidade
        </p>
      </div>
    );
  }

  const blackFriday = phase === "black_friday";
  // Nas LPs o preço está na própria página; no blog e afins, na home
  const slug = (pathname ?? "/").split("/")[1] ?? "";
  const onLp = slug === "" || getLpContentPaths().includes(slug);
  return (
    <a
      href={onLp ? "#preco" : "/#preco"}
      className={cn(
        "sticky top-0 z-[60] block md:static",
        blackFriday ? "bg-black text-white" : "bg-[#340055] text-white",
      )}
    >
      <div className="mx-auto flex min-h-14 max-w-6xl flex-col items-center justify-center px-4 py-2 text-center sm:px-6 md:min-h-11 md:flex-row md:gap-3">
        <p className="text-[0.9rem] leading-snug text-balance">
          <strong className={cn("font-bold", blackFriday && "text-[#f2daff]")}>
            {blackFriday && <span className="hidden md:inline">Black Friday · </span>}
            {label}:
          </strong>{" "}
          <span className="whitespace-nowrap">R$ {formatPrice(prices.monthly)}/mês até 30/11</span>
        </p>
        <p className="mt-0.5 text-[0.75rem] font-semibold md:mt-0">
          <span className={cn("tabular-nums", !left && "invisible")}>
            Termina em{" "}
            <span className={cn("font-semibold", blackFriday ? "text-[#ffb340]" : "text-[#e2b5ff]")}>{left ?? "00d 00h 00min"}</span>
          </span>
          <span aria-hidden className="ml-2 underline underline-offset-2">ver preço</span>
        </p>
      </div>
    </a>
  );
}

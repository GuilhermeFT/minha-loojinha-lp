"use client";

// Contagem até o fim do preço de lançamento (30/11 23h59). Só aparece no navegador: o HTML
// estático não sabe a hora de quem abre. offsetMs vem do ?fase= de desenvolvimento.

import { useEffect, useState } from "react";
import { founderCountdown } from "@/lib/founder-price";
import { cn } from "@/lib/utils";

type Left = { days: number; hours: number; minutes: number };

function useCountdown(offsetMs: number): Left | null | undefined {
  // undefined = ainda no servidor/hidratação; null = prazo acabou
  const [left, setLeft] = useState<Left | null | undefined>(undefined);
  useEffect(() => {
    const tick = () => setLeft(founderCountdown(new Date(Date.now() + offsetMs)));
    tick();
    const timer = setInterval(tick, 20_000);
    return () => clearInterval(timer);
  }, [offsetMs]);
  return left;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "34 dias 05h 12min" em uma linha. */
export function CountdownInline({ offsetMs = 0, className }: { offsetMs?: number; className?: string }) {
  const left = useCountdown(offsetMs);
  if (left === null) return null;
  const text = left
    ? left.days >= 1
      ? `${left.days} ${left.days === 1 ? "dia" : "dias"} ${pad(left.hours)}h ${pad(left.minutes)}min`
      : `${pad(left.hours)}h ${pad(left.minutes)}min`
    : "00 dias 00h 00min";
  return (
    <span className={cn("tabular-nums", !left && "invisible", className)} aria-live="off">
      {text}
    </span>
  );
}

/** Dias / horas / minutos em blocos, como um contador de vitrine. */
export function CountdownBlocks({ offsetMs = 0, className }: { offsetMs?: number; className?: string }) {
  const left = useCountdown(offsetMs);
  if (left === null) return null;
  const parts = [
    { value: left?.days ?? 0, label: left?.days === 1 ? "dia" : "dias" },
    { value: left?.hours ?? 0, label: "horas" },
    { value: left?.minutes ?? 0, label: "min" },
  ];
  return (
    <div className={cn("flex gap-2", !left && "invisible", className)}>
      {parts.map((p) => (
        <span
          key={p.label}
          className="flex min-w-0 flex-1 flex-col items-center rounded-2xl bg-[var(--surface-2)] px-2 py-2.5"
        >
          <span className="lp-num text-[1.75rem] leading-none text-[var(--countdown)]">{pad(p.value)}</span>
          <span className="lp-label mt-1.5 text-[var(--text-2)]">{p.label}</span>
        </span>
      ))}
    </div>
  );
}

// Preço de lançamento (campanha out–nov/2026). Até 30/11 (23h59 de Brasília) o plano Loojinha
// custa R$ 16,90/mês ou R$ 149,90/ano, garantidos para quem assinar; a partir de 01/12,
// R$ 39,90/mês ou R$ 353,90/ano. Semana da Black Friday (23 a 30/11) = última chamada.
// Mesmas datas e preços do painel (minha-loojinha-dashboard/src/lib/founder-price.ts):
// mude os dois juntos. Os textos do lp-content.json usam {{mensal}}, {{anual}} e {{anual_mes}}.

/** 01/12/2026 00:00 em Brasília (UTC-3). */
export const FOUNDER_DEADLINE = new Date("2026-12-01T03:00:00Z");
/** Segunda da semana da Black Friday (27/11). */
export const BLACK_FRIDAY_START = new Date("2026-11-23T03:00:00Z");

const FOUNDER = { monthly: 16.9, yearly: 149.9 };
const REGULAR = { monthly: 39.9, yearly: 353.9 };

export type FounderPhase = "launch" | "black_friday" | "ended";

export function founderPhase(now: Date = new Date()): FounderPhase {
  if (now >= FOUNDER_DEADLINE) return "ended";
  if (now >= BLACK_FRIDAY_START) return "black_friday";
  return "launch";
}

/** "16,90" (sem o R$, como no lp-content.json). */
export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export type PlanPrices = {
  monthly: number;
  yearly: number;
  /** Anual dividido por 12, para cima no centavo (nunca promete menos do que é cobrado). */
  yearlyPerMonth: number;
  savingsPercent: number;
  /** Até 30/11: preços de lançamento, com os novos para mostrar "depois, R$ ...". */
  founder: { regularMonthly: number; regularYearly: number } | null;
};

export function planPrices(now: Date = new Date()): PlanPrices {
  const ended = founderPhase(now) === "ended";
  const prices = ended ? REGULAR : FOUNDER;
  return {
    monthly: prices.monthly,
    yearly: prices.yearly,
    yearlyPerMonth: Math.ceil((prices.yearly / 12) * 100) / 100,
    savingsPercent: Math.floor((1 - prices.yearly / (prices.monthly * 12)) * 100),
    founder: ended ? null : { regularMonthly: REGULAR.monthly, regularYearly: REGULAR.yearly },
  };
}

/** Trecho dos posts do blog depois do preço: " (preço de lançamento, para quem assinar até 30/11)"; vazio depois. */
export function launchNote(prices: PlanPrices): string {
  return prices.founder ? " (preço de lançamento, para quem assinar até 30/11)" : "";
}

/** Quanto falta para o fim do preço de lançamento; null depois do prazo. */
export function founderCountdown(now: Date = new Date()): { days: number; hours: number; minutes: number } | null {
  const ms = FOUNDER_DEADLINE.getTime() - now.getTime();
  if (ms <= 0) return null;
  const minutes = Math.floor(ms / 60_000);
  return { days: Math.floor(minutes / 1440), hours: Math.floor((minutes % 1440) / 60), minutes: minutes % 60 };
}

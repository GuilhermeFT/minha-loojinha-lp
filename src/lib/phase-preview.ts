// Só em desenvolvimento: ?fase=launch|black_friday|ultimo_dia|ended finge a data para ver a
// página em cada fase do preço de lançamento (tema Black Friday, último dia, preços de 01/12).
// Em produção é ignorado e a página usa a hora real (founderPhase).

import { founderPhase, type FounderPhase } from "@/lib/founder-price";

const PREVIEW_NOW: Record<FounderPhase | "ultimo_dia", string> = {
  launch: "2026-11-02T15:00:00Z",
  black_friday: "2026-11-27T15:00:00Z",
  ultimo_dia: "2026-11-30T15:00:00Z",
  ended: "2026-12-02T15:00:00Z",
};

/** A data fingida para a fase pedida; null em produção ou sem ?fase válido. */
export function previewNow(fase: string | null | undefined): Date | null {
  if (process.env.NODE_ENV === "production" || !fase) return null;
  if (!(fase in PREVIEW_NOW)) return null;
  return new Date(PREVIEW_NOW[fase as keyof typeof PREVIEW_NOW]);
}

export type PageClock = {
  now: Date;
  phase: FounderPhase;
  /** Diferença entre a data fingida e a real, para a contagem no navegador andar igual. */
  offsetMs: number;
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/** Hora da página. Em produção nem lê searchParams, para a página continuar estática. */
export async function pageClock(searchParams?: SearchParams): Promise<PageClock> {
  const real = new Date();
  if (process.env.NODE_ENV !== "production" && searchParams) {
    const fase = (await searchParams).fase;
    const fake = previewNow(typeof fase === "string" ? fase : null);
    if (fake) return { now: fake, phase: founderPhase(fake), offsetMs: fake.getTime() - real.getTime() };
  }
  return { now: real, phase: founderPhase(real), offsetMs: 0 };
}

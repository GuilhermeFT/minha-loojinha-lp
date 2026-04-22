import { Zap } from "lucide-react";

export function BetaBanner() {
  return (
    <div style={{ background: "var(--gradient-primary)" }}>
      <div className="container mx-auto max-w-6xl px-3 py-2 sm:px-6">
        <p className="flex items-center justify-center gap-2 text-center text-xs leading-snug text-white/90 sm:text-sm">
          <Zap className="size-3.5 shrink-0 fill-current text-yellow-300" />
          Sem taxa por venda · Cancele quando quiser · Garantia de 14 dias
        </p>
      </div>
    </div>
  );
}

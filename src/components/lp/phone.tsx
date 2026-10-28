// Moldura de celular desenhada em CSS. A tela tem 264px de largura (as telas de screens.tsx são
// desenhadas nessa medida); para mudar o tamanho, use `scale` (transform, não muda o layout das telas).

import { cn } from "@/lib/utils";

type PhoneProps = {
  children: React.ReactNode;
  className?: string;
  /** Rótulo para leitores de tela (o conteúdo da tela é decorativo). */
  label: string;
  /** Altura da tela em px (padrão 540). */
  screenHeight?: number;
  dark?: boolean;
};

export function Phone({ children, className, label, screenHeight = 540, dark }: PhoneProps) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={cn(
        "relative w-[284px] shrink-0 rounded-[42px] bg-[#1c1c1e] p-[10px] ring-1 ring-[var(--hairline,transparent)] shadow-[0_16px_40px_rgba(39,0,62,0.14)]",
        className,
      )}
    >
      {/* botões laterais */}
      <span aria-hidden className="absolute -left-[3px] top-[96px] h-9 w-[3px] rounded-l bg-[#1c1c1e]" />
      <span aria-hidden className="absolute -left-[3px] top-[142px] h-14 w-[3px] rounded-l bg-[#1c1c1e]" />
      <span aria-hidden className="absolute -right-[3px] top-[120px] h-16 w-[3px] rounded-r bg-[#1c1c1e]" />
      <div
        aria-hidden
        className={cn("relative overflow-hidden rounded-[32px]", dark ? "bg-[#0b141a]" : "bg-white")}
        style={{ height: screenHeight }}
      >
        <StatusBar dark={dark} />
        <div className="absolute inset-x-0 bottom-0 top-[30px]">{children}</div>
        <span className="absolute left-1/2 top-[8px] h-[18px] w-[76px] -translate-x-1/2 rounded-full bg-[#1c1c1e]" />
      </div>
    </figure>
  );
}

function StatusBar({ dark }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 z-10 flex h-[30px] items-center justify-between px-6 text-[11px] font-semibold",
        dark ? "text-white" : "text-[#18181b]",
      )}
    >
      <span>21:47</span>
      <span className="flex items-center gap-1">
        <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor">
          <rect x="0" y="6" width="3" height="4" rx="0.5" />
          <rect x="4" y="4" width="3" height="6" rx="0.5" />
          <rect x="8" y="2" width="3" height="8" rx="0.5" />
          <rect x="12" y="0" width="3" height="10" rx="0.5" />
        </svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="12" height="7" rx="1.5" fill="currentColor" />
          <rect x="19.5" y="3.5" width="1.5" height="4" rx="0.75" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

/** Círculo de "toque" sobre o alvo da animação (o pai precisa ser relative). */
export function TapRing({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute z-20 size-9", className)}>
      <span className="tap-ring absolute inset-0 rounded-full bg-[#1c1c1e]/30" />
      <span className="absolute inset-[30%] rounded-full bg-[#1c1c1e]/45" />
    </span>
  );
}

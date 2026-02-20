import Link from "next/link";

export function BetaBanner() {
  return (
    <div className="bg-[hsl(var(--primary))]/10 border-b border-[hsl(var(--primary))]/20">
      <div className="container mx-auto max-w-6xl px-3 py-2 sm:px-6">
        <p className="text-center text-xs leading-snug text-[hsl(var(--foreground))] sm:text-sm">
          Acesso antecipado — Estamos em beta.
          
        </p>
      </div>
    </div>
  );
}

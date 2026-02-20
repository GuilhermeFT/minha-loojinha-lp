import Link from "next/link";

export function BetaBanner() {
  return (
    <div className="bg-[hsl(var(--primary))]/10 border-b border-[hsl(var(--primary))]/20">
      <div className="container mx-auto max-w-6xl px-4 py-2 sm:px-6">
        <p className="text-center text-sm text-[hsl(var(--foreground))]">
          Acesso antecipado — Estamos em beta.{" "}
          <Link
            href="/feedback"
            className="font-medium underline underline-offset-2 hover:no-underline"
          >
            Sua opinião vale muito.
          </Link>
        </p>
      </div>
    </div>
  );
}

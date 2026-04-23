import { CheckoutTrigger } from "@/components/checkout-trigger";
import { Button } from "@/components/ui/button";

export function CtaInline() {
  return (
    <aside className="my-10 rounded-xl border border-[hsl(var(--border))] bg-[var(--gradient-soft)] p-6 md:p-8 shadow-[var(--shadow-soft)] not-prose">
      <h3 className="text-xl font-bold text-[var(--palette-darkest)]">
        Pronta para organizar suas vendas?
      </h3>
      <p className="mt-2 text-[var(--text-secondary)]">
        Crie seu catálogo em 30 minutos e teste grátis por 14 dias. Sem taxa por
        venda.
      </p>
      <div className="mt-4">
        <CheckoutTrigger asChild location="blog_inline">
          <Button type="button" size="lg">
            Criar minha loja grátis
          </Button>
        </CheckoutTrigger>
      </div>
    </aside>
  );
}

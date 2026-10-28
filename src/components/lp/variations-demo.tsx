"use client";

// Seção "Novidade: variações": a pantalona da ACME em 3 estampas. Tocar na estampa troca a foto e
// a grade de tamanhos, como na página da peça na vitrine (option-selector + size-selector). Fica
// fora do celular, então usa a paleta da Minha Loojinha (não a cor da loja).

import { useState } from "react";
import Image from "next/image";
import { DEMO_PANTS, brl } from "@/content/demo-store";
import { cn } from "@/lib/utils";

export function VariationsDemo() {
  const [index, setIndex] = useState(0);
  const option = DEMO_PANTS.options[index];

  return (
    <div className="grid min-w-0 gap-5 rounded-[1.25rem] bg-white p-4 text-[#1c1c1e] shadow-[0_16px_40px_rgba(39,0,62,0.14)] sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-6 sm:p-5">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#f5f5f7]">
        {DEMO_PANTS.options.map((o, i) => (
          <Image
            key={o.name}
            src={o.image}
            alt={i === index ? `${DEMO_PANTS.name}, estampa ${o.name}` : ""}
            fill
            sizes="(min-width: 640px) 224px, 90vw"
            className={cn("screen-step object-cover object-top", i === index ? "opacity-100" : "opacity-0")}
          />
        ))}
      </div>

      <div className="min-w-0">
        <p className="text-[1.05rem] font-bold leading-snug text-[#27003e] text-balance">{DEMO_PANTS.name}</p>
        <p className="lp-num mt-1 text-[1.35rem] text-[#27003e]">{brl(DEMO_PANTS.promoPrice ?? DEMO_PANTS.price)}</p>

        <p className="mt-4 text-sm text-[#636366]" id="estampa-label">
          {DEMO_PANTS.variationLabel}: <b className="text-[#1c1c1e]">{option.name}</b>
        </p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-labelledby="estampa-label">
          {DEMO_PANTS.options.map((o, i) => (
            <button
              key={o.name}
              type="button"
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "flex min-h-12 min-w-0 items-center gap-2 rounded-full border py-1 pl-1 pr-3.5 text-sm font-semibold transition-colors",
                i === index
                  ? "border-[#f2daff] bg-[#f2daff] text-[#530083]"
                  : "border-[#e5e5ea] bg-white text-[#1c1c1e] hover:bg-[#f5f5f7]",
              )}
            >
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[#f5f5f7]">
                <Image src={o.image} alt="" fill sizes="40px" className="object-cover" />
              </span>
              {o.name}
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-[#636366]">Estoque da estampa {option.name.toLowerCase()}, que você controla no painel:</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {DEMO_PANTS.sizes.map((s) => {
            const qty = option.stock[s] ?? 0;
            return (
              <li
                key={s}
                className={cn(
                  "min-w-[3.25rem] rounded-xl border px-2 py-1.5 text-center",
                  qty === 0 ? "border-[#ffe5e5] bg-[#ffe5e5]" : "border-[#e5e5ea] bg-white",
                )}
              >
                <span className={cn("block text-sm font-bold", qty === 0 && "text-[#ba1a1a] line-through")}>{s}</span>
                <span className={cn("block text-[11px] font-semibold", qty === 0 ? "text-[#ba1a1a]" : "text-[#636366]")}>
                  {qty === 0 ? "esgotado" : `${qty} un.`}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

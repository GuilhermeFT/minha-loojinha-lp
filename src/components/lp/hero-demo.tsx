"use client";

// Celular do hero em loop: vitrine → toca no vestido → toca na cor (as fotos trocam) → tamanho →
// carrinho → o pedido chega no WhatsApp. Para quando sai da tela; com prefers-reduced-motion
// começa parado (o botão "Ver animação" liga). Tem botão de pausar (WCAG 2.2.2).

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { Phone } from "@/components/lp/phone";
import { CartScreen, ProductScreen, StoreHomeScreen, WhatsAppScreen } from "@/components/lp/screens";
import { cn } from "@/lib/utils";

type Screen = "home" | "product" | "cart" | "whatsapp";

type Step = {
  screen: Screen;
  ms: number;
  /** Índice do item da legenda (0–4). */
  chapter: number;
  colorIndex?: number;
  size?: string | null;
  tap?: "dress" | "color" | "size" | "buy" | "finish";
};

// Oliva é a cor 1 em demo-store.ts
const STEPS: Step[] = [
  { screen: "home", ms: 2200, chapter: 0 },
  { screen: "home", ms: 1100, chapter: 0, tap: "dress" },
  { screen: "product", ms: 1500, chapter: 1, colorIndex: 0 },
  { screen: "product", ms: 1000, chapter: 1, colorIndex: 0, tap: "color" },
  { screen: "product", ms: 1700, chapter: 1, colorIndex: 1 },
  { screen: "product", ms: 1000, chapter: 2, colorIndex: 1, tap: "size" },
  { screen: "product", ms: 1100, chapter: 2, colorIndex: 1, size: "M", tap: "buy" },
  { screen: "cart", ms: 2200, chapter: 3 },
  { screen: "cart", ms: 1000, chapter: 3, tap: "finish" },
  { screen: "whatsapp", ms: 4800, chapter: 4 },
];

export const HERO_CHAPTERS = [
  "Ela abre o link da sua bio",
  "Toca na cor e as fotos trocam",
  "Escolhe o tamanho",
  "Monta o carrinho, sem criar conta",
  "O pedido chega pronto no seu WhatsApp",
];

/** Passo mostrado parado (movimento reduzido): a peça na cor Oliva, tamanho M. */
const STILL_STEP = 6;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function HeroDemo() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const [index, setIndex] = useState(0);
  // null = ainda não mexeu no botão: toca, a não ser com movimento reduzido
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const playing = userPlaying ?? !reducedMotion;
  const current = userPlaying === null && reducedMotion ? STILL_STEP : index;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % STEPS.length), STEPS[index].ms);
    return () => clearTimeout(timer);
  }, [index, playing, visible]);

  const step = STEPS[current];
  const show = (screen: Screen) => cn("screen-step absolute inset-0", step.screen === screen ? "opacity-100" : "pointer-events-none opacity-0");

  return (
    <div ref={rootRef} className="flex flex-col items-center gap-4 xl:flex-row xl:items-center xl:gap-7">
      <Phone
        label="Animação: a cliente abre a vitrine, escolhe a cor e o tamanho do vestido, monta o carrinho e o pedido chega no WhatsApp da loja."
        dark={step.screen === "whatsapp"}
      >
        <div className={show("home")}>
          <StoreHomeScreen tapDress={step.tap === "dress"} />
        </div>
        <div className={show("product")}>
          <ProductScreen
            colorIndex={step.colorIndex ?? 0}
            size={step.size ?? null}
            tap={step.tap === "color" ? "color" : step.tap === "size" ? "size" : step.tap === "buy" ? "buy" : null}
            tapColor={1}
          />
        </div>
        <div className={show("cart")}>
          <CartScreen tapFinish={step.tap === "finish"} />
        </div>
        <div className={show("whatsapp")}>
          <WhatsAppScreen key={step.screen === "whatsapp" ? `on-${current}` : "off"} showMessage={step.screen === "whatsapp"} />
        </div>
      </Phone>

      <div className="w-full max-w-[284px] xl:w-52">
        {/* Celular: só a legenda do passo atual */}
        <p className="min-h-[3em] text-center text-[1rem] font-bold leading-snug text-[var(--title)] text-balance xl:hidden" aria-hidden>
          <span className="lp-label mr-2 rounded-full bg-[var(--lilac)] px-2 py-0.5 align-middle text-[var(--lilac-ink)]">{step.chapter + 1}/5</span>
          {HERO_CHAPTERS[step.chapter]}
        </p>
        {/* Desktop: anotações de margem com o passo atual marcado */}
        <ol className="hidden space-y-1 xl:block">
          {HERO_CHAPTERS.map((text, i) => (
            <li
              key={text}
              className={cn(
                "flex items-start gap-3 rounded-2xl px-3 py-2 text-[0.95rem] leading-snug transition-colors duration-300",
                i === step.chapter ? "bg-[var(--lilac)] font-bold text-[var(--lilac-ink)]" : "text-[var(--text-2)]",
              )}
            >
              <span className="lp-num pt-px text-[0.8rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {text}
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => {
            if (userPlaying === null && reducedMotion) setIndex(STILL_STEP);
            setUserPlaying(!playing);
          }}
          className="mx-auto mt-2 flex min-h-11 items-center gap-1.5 px-3 text-[0.8rem] font-semibold text-[var(--text-2)] hover:text-[var(--text)] xl:mx-0 xl:mt-4"
        >
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {playing ? "Pausar animação" : "Ver animação"}
        </button>
      </div>
    </div>
  );
}

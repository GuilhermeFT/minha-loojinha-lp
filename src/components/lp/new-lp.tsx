// Landing page nova (home e páginas de cidade). Uma história só, do link na bio ao pedido pronto
// no WhatsApp; cada seção mostra um pedaço dela com a interface real (loja ACME) desenhada em HTML.
// Visual: o design system do painel (minha-loojinha-dashboard/docs/design/stitch/DESIGN.md), com
// composição assimétrica. De 23/11 a 30/11 (founderPhase) vira o tema preto da Black Friday sozinho;
// a partir de 01/12 a oferta some e os preços normais aparecem (planPrices/founderPhase).
// A página antiga continua em /classico (lp-page-content.tsx) como controle do teste.

import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { CheckoutTrigger } from "@/components/checkout-trigger";
import { JsonLd } from "@/components/json-ld";
import { CountdownBlocks, CountdownInline } from "@/components/lp/countdown";
import { DemoStoreLink } from "@/components/lp/demo-store-link";
import { HeroDemo } from "@/components/lp/hero-demo";
import { OfferCard, Pill } from "@/components/lp/bits";
import { Phone } from "@/components/lp/phone";
import {
  BioScreen,
  OrderBubble,
  PanelScreen,
  StoreHomeScreen,
  WhatsAppScreen,
  chatBackground,
} from "@/components/lp/screens";
import { VariationsDemo } from "@/components/lp/variations-demo";
import { DEMO_DRESS, DEMO_STORE, DEMO_STORE_DISPLAY_URL } from "@/content/demo-store";
import {
  BEFORE_AFTER,
  BENEFITS,
  FINAL_CTA,
  HERO,
  HOW_IT_WORKS,
  VARIATIONS,
  VIDEO,
  founderFaq,
  mainFaq,
  pricingCopy,
} from "@/content/lp-new";
import type { LpContentPath } from "@/lib/content";
import type { FounderPhase, PlanPrices } from "@/lib/founder-price";
import { cn } from "@/lib/utils";

type NewLpProps = {
  content: LpContentPath;
  baseUrl: string;
  phase: FounderPhase;
  /** Rótulo da oferta (offerLabel na data da página); null a partir de 01/12. */
  offer: string | null;
  prices: PlanPrices;
  /** Diferença da data fingida em dev (?fase=); 0 em produção. */
  offsetMs: number;
  /**
   * Página de cidade/variante: título curto com a cidade (place); o texto longo da cidade
   * (hero.subtitle do conteúdo) vai para a seção local; FAQ local vem do conteúdo.
   */
  local?: { label: string; place: string | null } | null;
  /** Bloco extra antes do CTA final (ex.: "Outras cidades"). */
  children?: React.ReactNode;
};

// Vídeo de 30 s: coloque o MP4 e o pôster aqui; sem o MP4 a seção não aparece.
const VIDEO_SRC = "/video/loojinha-30s.mp4";
const VIDEO_POSTER = "/video/loojinha-30s.jpg";
const publicFile = (src: string) => fs.existsSync(path.join(process.cwd(), "public", src));

const wrap = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
const h2 =
  "text-[1.75rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-[var(--title)] text-balance sm:text-[2.25rem] lg:text-[2.75rem]";
const lead = "text-[1.02rem] leading-relaxed text-[var(--text-2)] text-pretty";

function SignupButton({ location, children, className }: { location: string; children: React.ReactNode; className?: string }) {
  return (
    <CheckoutTrigger asChild location={location} className={cn("min-w-0", className)}>
      <button type="button" className="lp-btn w-full sm:w-auto">
        {children}
        <ArrowRight aria-hidden className="size-5 shrink-0" />
      </button>
    </CheckoutTrigger>
  );
}

export function NewLp({ content, baseUrl, phase, offer: label, prices, offsetMs, local, children }: NewLpProps) {
  const pricing = pricingCopy(prices);
  const faqItems = dedupe([...founderFaq(prices), ...(local ? content.faq.items : mainFaq(prices))]);
  const founder = prices.founder;

  return (
    <div className="lp overflow-x-clip" data-fase={phase}>
      <JsonLd data={schemas(content, baseUrl, faqItems, prices)} />

      {/* ---------------------------------------------------------------- hero */}
      <section>
        <div className={cn(wrap, "grid gap-12 pb-16 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-12")}>
          <div className="min-w-0 text-center lg:col-span-6 lg:text-left">
            <Pill>{local ? local.label : HERO.kicker}</Pill>
            <h1
              className="mt-5 text-[2.35rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-[var(--title)] text-balance sm:text-[3.2rem] lg:text-[3.6rem]"
            >
              {local ? (
                <>
                  {local.place ? `${local.place}: sua loja no ` : "Sua loja de moda no "}
                  <span className="text-[var(--action-text)]">WhatsApp</span>.
                </>
              ) : (
                <>
                  {HERO.titleBefore}
                  <span className="text-[var(--action-text)]">{HERO.titleEmphasis}</span>
                  {HERO.titleAfter}
                </>
              )}
            </h1>
            <p className={cn(lead, "mx-auto mt-4 max-w-[30rem] sm:text-[1.1rem] lg:mx-0")}>{HERO.subtitle}</p>

            <OfferCard label={label} prices={prices} offsetMs={offsetMs} />

            <div className="mx-auto mt-7 flex max-w-[24rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <SignupButton location="hero">{HERO.cta}</SignupButton>
              <DemoStoreLink medium="hero" className="lp-btn-ghost w-full sm:w-auto">
                {HERO.demo}
                <ArrowUpRight aria-hidden className="size-4 shrink-0" />
              </DemoStoreLink>
            </div>
            {founder && <p className="mt-3 text-sm text-[var(--text-3)]">{HERO.fineprint}</p>}
          </div>

          <div className="flex min-w-0 justify-center lg:col-span-6 lg:justify-end">
            <HeroDemo />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- benefícios */}
      <section id="beneficios" className="scroll-mt-16 border-t border-[var(--hairline)] py-16 sm:py-24">
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <Pill>{BENEFITS.kicker}</Pill>
            <h2 className={cn(h2, "mt-4")}>{BENEFITS.title}</h2>
          </div>

          <div className="mt-10 space-y-12 sm:mt-14 lg:space-y-20">
            {BENEFITS.items.map((item, i) => (
              <article key={item.title} className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
                <div className={cn("min-w-0 text-center lg:col-span-5 lg:text-left", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                  <p className="lp-num text-[2.5rem] leading-none text-[var(--action-text)]" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em] text-[var(--title)] text-balance sm:text-[1.75rem]">
                    {item.title}
                  </h3>
                  <p className={cn(lead, "mx-auto mt-3 max-w-md lg:mx-0")}>{item.text}</p>
                </div>
                <figure className={cn("min-w-0 lg:col-span-6", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
                  <div className="flex justify-center rounded-[1.5rem] bg-[var(--surface-2)] px-4 py-8 sm:px-8">
                    <BenefitCrop index={i} />
                  </div>
                  <figcaption className="lp-label mt-3 text-center text-[var(--text-3)] lg:text-left">{item.figure}</figcaption>
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- como funciona */}
      <section id="como-funciona" className="scroll-mt-16 border-t border-[var(--hairline)] bg-[var(--surface-2)] py-16 sm:py-24">
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <Pill>{HOW_IT_WORKS.kicker}</Pill>
            <h2 className={cn(h2, "mt-4")}>{HOW_IT_WORKS.title}</h2>
          </div>
          <ol className="mt-12 grid gap-14 lg:grid-cols-3 lg:gap-8">
            {HOW_IT_WORKS.steps.map((step, i) => (
              <li key={step.title} className={cn("min-w-0 text-center lg:text-left", i === 1 && "lg:mt-16", i === 2 && "lg:mt-32")}>
                <div className="flex items-baseline justify-center gap-3 lg:justify-start">
                  <span className="lp-num text-[2rem] leading-none text-[var(--action-text)]">{i + 1}</span>
                  <h3 className="text-[1.2rem] font-extrabold leading-tight tracking-[-0.02em] text-[var(--title)]">{step.title}</h3>
                </div>
                <p className={cn(lead, "mx-auto mt-3 max-w-sm lg:mx-0")}>{step.text}</p>
                {/* No celular o aparelho aparece cortado; no desktop, inteiro */}
                <div className="mt-6 flex h-[400px] justify-center overflow-hidden lg:h-auto">
                  <Phone label={step.screen} dark={i === 2}>
                    {i === 0 ? <PanelScreen /> : i === 1 ? <BioScreen /> : <WhatsAppScreen />}
                  </Phone>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------------------------------------- novidade: variações */}
      <section id="variacoes" className="scroll-mt-16 bg-[var(--band)] py-16 text-[var(--band-ink)] sm:py-24">
        <div className={cn(wrap, "grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10")}>
          <div className="min-w-0 text-center lg:col-span-5 lg:text-left">
            <p className="lp-label inline-flex rounded-full bg-[#f2daff] px-3 py-1.5 text-[#530083]">{VARIATIONS.kicker}</p>
            <h2 className="mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-balance sm:text-[2.6rem] lg:text-[3rem]">
              {VARIATIONS.title}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[1.02rem] leading-relaxed text-white/85 text-pretty lg:mx-0">{VARIATIONS.text}</p>
            {/* Lista alinhada à esquerda, num bloco centralizado no celular */}
            <ul className="mx-auto mt-6 w-fit max-w-full space-y-2.5 text-left lg:mx-0">
              {VARIATIONS.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[1rem]">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-[var(--band-soft)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <p aria-hidden className="mb-3 text-center text-sm font-semibold text-[var(--band-soft)] lg:text-left">
              {VARIATIONS.hint} ↓
            </p>
            <VariationsDemo />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ cidade (páginas locais) */}
      {local && (
        <section className="border-b border-[var(--hairline)] py-16 sm:py-24">
          <div className={cn(wrap, "grid gap-8 lg:grid-cols-12")}>
            <div className="min-w-0 text-center lg:col-span-5 lg:text-left">
              <Pill>{local.label}</Pill>
              <h2 className={cn(h2, "mt-4 lg:text-[2.25rem]")}>{content.benefits.title}</h2>
              {/* Parágrafos longos: à esquerda, num bloco centralizado no celular */}
              <div className="mx-auto mt-4 max-w-xl space-y-3 text-left lg:mx-0">
                <p className={lead}>{content.hero.subtitle}</p>
                <p className={lead}>{content.benefits.subtitle}</p>
              </div>
            </div>
            <ol className="lp-card divide-y divide-[var(--hairline)] lg:col-span-6 lg:col-start-7">
              {content.benefits.cards.map((card, i) => (
                <li key={card.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 p-5">
                  <span className="lp-num text-[1.25rem] leading-none text-[var(--action-text)]">{i + 1}</span>
                  <div>
                    <h3 className="text-[1.05rem] font-bold leading-snug text-[var(--title)]">{card.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-[var(--text-2)]">{card.description}</p>
                  </div>
                </li>
              ))}
              <li className="p-5 text-[0.95rem] text-[var(--text-2)]">{content.benefits.footer}</li>
            </ol>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------- antes × depois */}
      <section className="py-16 sm:py-24">
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <Pill>{BEFORE_AFTER.kicker}</Pill>
            <h2 className={cn(h2, "mt-4")}>{BEFORE_AFTER.title}</h2>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
            <figure className="min-w-0">
              <BeforeAfterLabel label={BEFORE_AFTER.beforeLabel} sub={BEFORE_AFTER.beforeSub} />
              <MessyChat />
              <figcaption className="mt-4 text-center text-[1.05rem] font-bold text-[var(--text)] text-balance md:text-left">{BEFORE_AFTER.beforeCaption}</figcaption>
            </figure>
            <figure className="min-w-0">
              <BeforeAfterLabel label={BEFORE_AFTER.afterLabel} sub={BEFORE_AFTER.afterSub} highlight />
              <div className="overflow-hidden rounded-[1.25rem] border border-[var(--hairline)] p-3 sm:p-4" style={chatBackground}>
                <OrderBubble className="max-w-[min(100%,22rem)] text-[13px] leading-[1.45]" />
              </div>
              <figcaption className="mt-4 text-center text-[1.05rem] font-bold text-[var(--title)] text-balance md:text-left">{BEFORE_AFTER.afterCaption}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ vídeo */}
      {publicFile(VIDEO_SRC) && (
        <section className="border-t border-[var(--hairline)] py-16 sm:py-24">
          <div className={cn(wrap, "grid gap-8 lg:grid-cols-12 lg:items-end")}>
            <div className="min-w-0 text-center lg:col-span-4 lg:text-left">
              <Pill>{VIDEO.kicker}</Pill>
              <h2 className={cn(h2, "mt-4")}>{VIDEO.title}</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <video
                className="mx-auto aspect-[9/16] max-h-[80vh] w-full max-w-sm rounded-[1.25rem] bg-black object-cover lg:mx-0"
                src={VIDEO_SRC}
                poster={publicFile(VIDEO_POSTER) ? VIDEO_POSTER : undefined}
                controls
                playsInline
                preload="none"
              />
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ preço */}
      <section id="preco" className="scroll-mt-16 border-t border-[var(--hairline)] bg-[var(--surface-2)] py-16 sm:py-24">
        <div className={wrap}>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <Pill>{pricing.kicker}</Pill>
            <h2 className={cn(h2, "mt-4")}>{pricing.title}</h2>
          </div>

          {pricing.founderNote && label && (
            <div className="lp-card mt-8 grid gap-5 p-5 text-center sm:p-6 lg:grid-cols-12 lg:items-center lg:text-left">
              <div className="min-w-0 lg:col-span-7">
                <p className="lp-label text-[var(--action-text)]">{label}</p>
                <p className="mx-auto mt-2 max-w-md text-[1.02rem] leading-relaxed text-[var(--text)] text-balance lg:mx-0 lg:max-w-none">{pricing.founderNote}</p>
              </div>
              <div className="min-w-0 lg:col-span-4 lg:col-start-9">
                <p className="lp-label mb-2 text-[var(--text-2)]">Termina em</p>
                <CountdownBlocks offsetMs={offsetMs} />
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <PlanCard featured plan={pricing.yearly} location="pricing_anual" />
            <PlanCard plan={pricing.monthly} location="pricing_mensal" />
            <div className="lp-card flex min-w-0 flex-col p-5 text-center sm:col-span-2 sm:p-6 lg:col-span-1 lg:text-left">
              <p className="lp-label text-[var(--text-2)]">{pricing.free.name}</p>
              <p className="lp-num mt-3 text-[2.25rem] leading-none text-[var(--title)]">
                R$ 0<span className="ml-1 text-base font-medium tracking-normal text-[var(--text-2)]">/mês</span>
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--text-2)] text-balance">{pricing.free.text}</p>
              <CheckoutTrigger asChild location="pricing_gratis" className="mt-auto min-w-0 pt-5">
                <button type="button" className="lp-btn-ghost w-full">
                  {pricing.free.cta}
                </button>
              </CheckoutTrigger>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="min-w-0 text-center lg:col-span-7 lg:text-left">
              <p className="lp-label text-[var(--text-2)]">Nos dois planos Loojinha</p>
              {/* Lista alinhada à esquerda, num bloco centralizado no celular */}
              <ul className="mx-auto mt-3 grid w-fit max-w-full gap-2.5 text-left sm:grid-cols-2 lg:mx-0 lg:w-auto">
                {pricing.paidFeatures.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[0.98rem] leading-snug">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-[var(--action-text)]" />
                    <span className="min-w-0">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-[var(--text-2)] text-balance lg:col-span-4 lg:col-start-9 lg:mx-0 lg:text-left">{pricing.trial}</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- FAQ */}
      <section id="duvidas" className="scroll-mt-16 py-16 sm:py-24">
        <div className={cn(wrap, "grid gap-8 lg:grid-cols-12")}>
          <div className="min-w-0 text-center lg:col-span-4 lg:text-left">
            <Pill>Dúvidas</Pill>
            <h2 className={cn(h2, "mt-4 lg:sticky lg:top-24")}>{local ? content.faq.title : "Perguntas que a gente sempre ouve."}</h2>
          </div>
          <div className="lp-card min-w-0 divide-y divide-[var(--hairline)] lg:col-span-8">
            {faqItems.map((item) => (
              <details key={item.question} className="group px-5 sm:px-6">
                <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 text-[1.02rem] font-bold leading-snug text-[var(--title)]">{item.question}</span>
                  <span
                    aria-hidden
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--lilac)] text-lg leading-none text-[var(--lilac-ink)] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="-mt-1 max-w-2xl pb-5 text-[0.98rem] leading-relaxed text-[var(--text-2)] text-pretty">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {children}

      {/* -------------------------------------------------------------- CTA final */}
      <section className="bg-[var(--band)] py-16 text-[var(--band-ink)] sm:py-24">
        <div className={cn(wrap, "grid gap-8 lg:grid-cols-12 lg:items-end")}>
          <h2 className="min-w-0 text-center text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-balance sm:text-[2.75rem] lg:col-span-7 lg:text-left lg:text-[3.25rem]">
            {FINAL_CTA.title}
          </h2>
          <div className="mx-auto w-full min-w-0 max-w-[24rem] text-center lg:col-span-4 lg:col-start-9 lg:max-w-none lg:text-left">
            {founder && (
              <p className="mb-5 text-[1rem] text-white/85">
                {FINAL_CTA.founderLine}{" "}
                <CountdownInline offsetMs={offsetMs} className="lp-num text-white" />.
              </p>
            )}
            <CheckoutTrigger asChild location="final_cta" className="min-w-0">
              <button type="button" className="lp-btn w-full bg-white text-[#530083] shadow-none hover:bg-[#f2daff]">
                {FINAL_CTA.cta}
                <ArrowRight aria-hidden className="size-5 shrink-0" />
              </button>
            </CheckoutTrigger>
            <p className="mt-3 text-sm text-white/75">{FINAL_CTA.fineprint}</p>
            <DemoStoreLink
              medium="final_cta"
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-white underline underline-offset-4"
            >
              {HERO.demo}
              <ArrowUpRight aria-hidden className="size-4 shrink-0" />
            </DemoStoreLink>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------- recortes */

/** Recorte de tela da loja: card branco com a barra de endereço, para ler como a vitrine dela. */
function ScreenCrop({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden className={cn("w-[264px] overflow-hidden rounded-[1.25rem] border border-[#e5e5ea] bg-white shadow-[0_8px_24px_rgba(39,0,62,0.08)]", className)}>
      <div className="flex justify-center border-b border-[#e5e5ea] bg-[#f5f5f7] px-3 py-1.5">
        <span className="truncate rounded-full bg-white px-3 py-0.5 text-[10px] font-medium text-[#636366]">{DEMO_STORE_DISPLAY_URL}</span>
      </div>
      {children}
    </div>
  );
}

function BenefitCrop({ index }: { index: number }) {
  if (index === 0) {
    return (
      <ScreenCrop>
        <div className="h-[340px] overflow-hidden">
          <div className="h-[480px]">
            <StoreHomeScreen cartCount={0} />
          </div>
        </div>
      </ScreenCrop>
    );
  }
  if (index === 1) {
    return (
      <div aria-hidden className="w-full max-w-[300px] overflow-hidden rounded-[1.25rem] border border-[#e5e5ea] p-3" style={chatBackground}>
        <OrderBubble className="max-w-full text-[11.5px]" />
      </div>
    );
  }
  const option = DEMO_DRESS.options[0];
  return (
    <ScreenCrop>
      <div className="p-4 text-[#18181b]" style={{ ["--theme" as string]: DEMO_STORE.themeColor }}>
        <div className="flex items-center gap-3">
          <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-zinc-100">
            <Image src={option.image} alt="" fill sizes="56px" className="object-cover object-top" />
          </span>
          <p className="min-w-0 text-[12px] font-bold leading-tight">{DEMO_DRESS.name}</p>
        </div>
        <p className="mt-3 text-[12px] font-medium">
          {DEMO_DRESS.variationLabel}: <b>{option.name}</b>
        </p>
        <p className="mt-2 text-[12px] font-medium">Tamanho:</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {DEMO_DRESS.sizes.map((s) => (
            <span
              key={s}
              className={cn(
                "rounded-md border-2 px-2.5 py-1 text-[12px] font-medium",
                s === "M" ? "border-[var(--theme)] bg-[var(--theme)] text-white" : "border-zinc-200",
                option.stock[s] === 0 && "line-through opacity-50",
              )}
            >
              {s}
              {option.stock[s] === 0 && " (Esgotado)"}
            </span>
          ))}
        </div>
      </div>
    </ScreenCrop>
  );
}

function BeforeAfterLabel({ label, sub, highlight }: { label: string; sub: string; highlight?: boolean }) {
  return (
    <p className="mb-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
      <span
        className={cn(
          "lp-label rounded-full px-3 py-1.5",
          highlight ? "bg-[var(--lilac)] text-[var(--lilac-ink)]" : "bg-[var(--card)] text-[var(--text-2)] ring-1 ring-[var(--hairline)]",
        )}
      >
        {label}
      </span>
      <span className="text-sm text-[var(--text-2)]">{sub}</span>
    </p>
  );
}

function MessyChat() {
  return (
    <div className="space-y-1.5 overflow-hidden rounded-[1.25rem] border border-[var(--hairline)] p-3 text-[14px] text-[#111b21] sm:p-4" style={chatBackground}>
      {BEFORE_AFTER.chat.map((m, i) => {
        const mine = m.from === "v";
        return (
          <div key={i} className={cn("flex", mine ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-2.5 pb-1 pt-1.5 shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]",
                mine ? "rounded-tr-none bg-[#d9fdd3]" : "rounded-tl-none bg-white",
              )}
            >
              {m.text === "foto" ? (
                <span className="relative block h-28 w-24 overflow-hidden rounded bg-zinc-100">
                  <Image src={DEMO_DRESS.options[1].image} alt="Foto do vestido mandada na conversa" fill sizes="96px" className="object-cover object-top" />
                </span>
              ) : (
                <span>{m.text}</span>
              )}
              <span className="ml-2 inline-block translate-y-0.5 text-[10px] text-[#667781]">{m.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type PlanCopy = {
  name: string;
  price: string;
  suffix: string;
  lines: string[];
  after: string | null;
  cta: string;
};

/** Card de plano no estilo da tela "Meu plano" do painel. Cada linha de texto é um <p>: nada vaza. */
function PlanCard({ plan, location, featured }: { plan: PlanCopy; location: string; featured?: boolean }) {
  return (
    <div
      className={cn(
        "lp-card flex min-w-0 flex-col p-5 text-center sm:p-6 lg:text-left",
        featured && "border-2 border-[var(--action)] shadow-[var(--shadow-2)]",
      )}
    >
      <p className={cn("lp-label", featured ? "text-[var(--action-text)]" : "text-[var(--text-2)]")}>{plan.name}</p>
      <p className="lp-num mt-3 text-[2.25rem] leading-none text-[var(--title)]">
        R$ {plan.price}
        <span className="ml-1 text-base font-medium tracking-normal text-[var(--text-2)]">{plan.suffix}</span>
      </p>
      <div className="mt-3 space-y-0.5 text-[0.95rem] leading-snug text-[var(--text-2)]">
        {plan.lines.map((line) => (
          <p key={line} className="text-pretty">
            {line}
          </p>
        ))}
      </div>
      {plan.after && <p className="mt-2 text-[0.85rem] leading-snug text-[var(--text-3)] text-pretty">{plan.after}</p>}
      <CheckoutTrigger asChild location={location} className="mt-auto min-w-0 pt-5">
        <button type="button" className={cn(featured ? "lp-btn" : "lp-btn-ghost", "w-full")}>
          {plan.cta}
        </button>
      </CheckoutTrigger>
    </div>
  );
}

/* ---------------------------------------------------------------- dados */

function dedupe<T extends { question: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((i) => (seen.has(i.question) ? false : (seen.add(i.question), true)));
}

function schemas(
  content: LpContentPath,
  baseUrl: string,
  faq: { question: string; answer: string }[],
  prices: PlanPrices,
): object[] {
  const { schema } = content;
  const price = prices.monthly.toFixed(2);
  return [
    { "@context": "https://schema.org", "@type": "WebSite", name: schema.siteName, url: baseUrl, description: schema.siteDescription, inLanguage: "pt-BR" },
    { "@context": "https://schema.org", "@type": "Organization", name: schema.siteName, url: baseUrl, logo: `${baseUrl}/logo.png`, description: schema.organizationDescription },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
    },
    { "@context": "https://schema.org", "@type": "LocalBusiness", name: schema.siteName, description: schema.localBusinessDescription, areaServed: schema.areaServed, url: baseUrl },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: schema.siteName,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: baseUrl,
      description: schema.siteDescription,
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "BRL",
        priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "BRL", unitText: "MONTH" },
      },
    },
  ];
}

import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Package,
  TrendingUp,
  CheckCircle,
  Lock,
  Star,
  Zap,
  Smartphone,
} from "lucide-react";
import asset1 from "@/assets/images/asset-1.png";
import asset2 from "@/assets/images/asset-2.png";
import asset3 from "@/assets/images/asset-3.png";
import asset4 from "@/assets/images/asset-4.png";
import asset5 from "@/assets/images/asset-5.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckoutTrigger } from "@/components/checkout-trigger";
import { JsonLd } from "@/components/json-ld";
import type { LpContentPath } from "@/lib/content";

const benefitIcons = [MessageCircle, Package, TrendingUp];
const resultsIcons = [CheckCircle, Package, Zap];

type LpPageContentProps = {
  content: LpContentPath;
  baseUrl: string;
};

export function LpPageContent({ content, baseUrl }: LpPageContentProps) {
  const {
    hero,
    benefits,
    howItWorks,
    results,
    multiDevice,
    pricing,
    faq,
    schema,
    testimonials,
  } = content;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: schema.siteName,
    url: baseUrl,
    description: schema.siteDescription,
    inLanguage: "pt-BR",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: schema.siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: schema.organizationDescription,
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: schema.siteName,
    description: schema.localBusinessDescription,
    areaServed: schema.areaServed,
    url: baseUrl,
  };

  const monthlyPlan =
    pricing.plans.find((p) => p.id === "mensal") ?? pricing.plans[0];

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: schema.siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: baseUrl,
    description: schema.siteDescription,
    offers: {
      "@type": "Offer",
      price: monthlyPlan.price,
      priceCurrency: "BRL",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: monthlyPlan.price,
        priceCurrency: "BRL",
        unitText: "MONTH",
      },
    },
  };

  return (
    <div className="flex flex-col">
      <JsonLd
        data={[
          webSiteSchema,
          organizationSchema,
          faqSchema,
          localBusinessSchema,
          softwareApplicationSchema,
        ]}
      />

      <section className="relative overflow-hidden bg-white">
        <div className="container relative mx-auto max-w-6xl px-4 py-12 pb-20 sm:px-6 sm:py-20 sm:pb-24 md:py-28 md:pb-32">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 text-center sm:space-y-8 lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-warm-2)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)] sm:text-sm">
                  <CheckCircle className="size-3.5 text-[var(--success)]" />
                  {hero.badge}
                </span>
              </div>
              <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#111111] sm:text-4xl md:text-5xl lg:text-6xl">
                {hero.title}{" "}
                <span className="text-[var(--palette-mid)]">
                  {hero.titleHighlight}
                </span>{" "}
                {hero.titleSuffix}
              </h1>
              <p className="text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg md:text-xl">
                {hero.subtitle}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                {hero.socialProof}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <CheckoutTrigger asChild location="hero">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full sm:w-auto md:h-14 md:px-8 md:text-lg"
                  >
                    {hero.ctaPrimary}
                  </Button>
                </CheckoutTrigger>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="md:h-14 md:px-8 md:text-lg"
                >
                  <Link href="/#beneficios">{hero.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <Image
                src={asset1}
                alt="Catálogo e pedidos no WhatsApp"
                width={560}
                height={420}
                className="relative w-full max-w-md drop-shadow-xl lg:max-w-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="beneficios"
        className="border-t border-[var(--border-color)] bg-[var(--bg-warm-2)] py-16 sm:py-24"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl md:text-4xl">
              {benefits.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {benefits.subtitle}
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.cards.map((item, i) => {
              const Icon = benefitIcons[i];
              const iconStyles = [
                {
                  bg: "bg-[var(--palette-mid)]/10",
                  text: "text-[var(--palette-mid)]",
                },
                {
                  bg: "bg-[var(--success-soft)]",
                  text: "text-[var(--success)]",
                },
                {
                  bg: "bg-[var(--accent-amber-soft)]",
                  text: "text-[var(--accent-amber)]",
                },
              ];
              const style = iconStyles[i % iconStyles.length];
              return (
                <Card
                  key={item.title}
                  className="border border-[var(--border-color)] bg-white transition-shadow hover:shadow-[var(--shadow-card)]"
                >
                  <CardHeader className="pb-3">
                    <div
                      className={`mb-3 flex size-12 items-center justify-center rounded-xl ${style.bg}`}
                    >
                      <Icon className={`size-6 ${style.text}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#111111]">
                      {item.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="leading-relaxed text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <CheckoutTrigger asChild location="benefits">
              <Button type="button" size="lg" className="w-full sm:w-auto">
                {benefits.ctaPrimary}
              </Button>
            </CheckoutTrigger>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href="/#preco">{benefits.ctaSecondary}</Link>
            </Button>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[var(--text-muted)]">
            {benefits.footer}
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--border-color)] bg-white py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-10">
              <div>
                <span className="inline-block rounded-full bg-[var(--bg-warm-2)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  {howItWorks.badge}
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl md:text-4xl">
                  {howItWorks.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                  {howItWorks.subtitle}
                </p>
              </div>
              <ol className="space-y-7">
                {howItWorks.steps.map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--palette-mid)] text-base font-bold text-white shadow-[var(--shadow-soft)]">
                      {item.step}
                    </span>
                    <div className="pt-1">
                      <p className="font-semibold text-[#111111]">
                        {item.title}
                      </p>
                      <p className="mt-1 leading-relaxed text-sm text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <Image
                src={asset2}
                alt="Configure seu catálogo facilmente"
                width={560}
                height={400}
                className="relative w-full max-w-md drop-shadow-lg lg:max-w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1a1a1a] py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--palette-mid)" }}
        />
        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-8 text-center lg:text-left">
              <div>
                <span className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
                  {results.badge}
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  {results.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
                  {results.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {results.stats.map((stat, i) => {
                  const Icon = resultsIcons[i];
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3"
                    >
                      <Icon className="size-5 shrink-0 text-[var(--success)]" />
                      <span className="text-sm font-medium text-white">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <CheckoutTrigger asChild location="results">
                <Button type="button" size="lg" className="w-full sm:w-auto">
                  {results.cta}
                </Button>
              </CheckoutTrigger>
            </div>
            <div className="flex justify-center">
              <Image
                src={asset3}
                alt="Crescimento nas vendas com o Minha Loojinha"
                width={500}
                height={400}
                className="w-full max-w-sm drop-shadow-2xl lg:max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {testimonials && testimonials.items.length > 0 && (
        <section className="border-t border-[var(--border-color)] bg-[var(--bg-warm-2)] py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              {testimonials.badge && (
                <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  {testimonials.badge}
                </span>
              )}
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl md:text-4xl">
                {testimonials.title}
              </h2>
              {testimonials.subtitle && (
                <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                  {testimonials.subtitle}
                </p>
              )}
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.items.map((item) => {
                const initials = item.name
                  .split(" ")
                  .map((part) => part[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();
                return (
                  <figure
                    key={`${item.name}-${item.city}`}
                    className="flex h-full flex-col rounded-2xl border border-[var(--border-color)] bg-white p-6 shadow-[var(--shadow-soft)]"
                  >
                    <div
                      aria-hidden
                      className="mb-3 flex gap-0.5 text-[var(--accent-amber)]"
                    >
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="size-4 fill-current" />
                      ))}
                    </div>
                    <blockquote className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--border-color)] pt-4">
                      <span
                        aria-hidden
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--palette-mid)]/10 text-xs font-semibold text-[var(--palette-mid)]"
                      >
                        {initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#111111]">
                          {item.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {item.city}
                          {item.business ? ` · ${item.business}` : ""}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-[var(--border-color)] bg-white py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--bg-warm-2)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <Smartphone className="size-3.5 text-[var(--palette-mid)]" />
              {multiDevice.badge}
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl md:text-4xl">
              {multiDevice.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {multiDevice.subtitle}
            </p>
          </div>
          <div className="relative mt-12 flex justify-center">
            <Image
              src={asset4}
              alt="Minha Loojinha em múltiplos dispositivos"
              width={900}
              height={600}
              className="relative w-full max-w-3xl drop-shadow-xl"
            />
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <CheckoutTrigger asChild location="multi_device">
              <Button type="button" size="lg" className="w-full sm:w-auto">
                {multiDevice.cta}
              </Button>
            </CheckoutTrigger>
          </div>
        </div>
      </section>

      <section
        id="preco"
        className="border-t border-[var(--border-color)] bg-[var(--bg-warm-1)] py-12 sm:py-24"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-block rounded-full border border-[var(--success)]/30 bg-[var(--success-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--success)]">
              {pricing.badge}
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
              {pricing.title}
            </h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {pricing.plans.map((plan) => (
              <div
                key={plan.id}
                className={[
                  "relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-lg",
                  plan.destaque
                    ? "border-2 border-[var(--palette-mid)]"
                    : "border border-[var(--border-color)]",
                ].join(" ")}
              >
                {plan.destaque && plan.savingsBadge && (
                  <div className="bg-[var(--accent-amber)] py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    {plan.savingsBadge}
                  </div>
                )}
                <div className="border-b border-[var(--border-color)] px-6 py-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {plan.name}
                  </p>
                  <p className="mt-2 flex items-end justify-center gap-1 text-[#111111]">
                    <span className="text-4xl font-bold tracking-tight">
                      R$ {plan.price}
                    </span>
                    <span className="mb-1 text-base font-normal text-[var(--text-muted)]">
                      {plan.priceSuffix}
                    </span>
                  </p>
                  <p className="mt-2 text-xs text-[var(--text-muted)]">
                    {plan.billingNote}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-6 p-6">
                  <ul className="space-y-3">
                    {plan.features.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-[var(--text-secondary)]"
                      >
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-[var(--success)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <CheckoutTrigger asChild location={`pricing_${plan.id}`}>
                    <Button
                      type="button"
                      size="lg"
                      className="mt-auto w-full"
                      variant={plan.destaque ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CheckoutTrigger>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-2 text-center">
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
              <Lock className="size-4 text-[var(--success)]" />
              {pricing.guarantee}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {pricing.disclaimer}
            </p>
          </div>
        </div>
      </section>

      <section
        id="duvidas"
        className="relative overflow-hidden border-t border-[var(--border-color)] bg-[var(--bg-warm-2)] py-12 sm:py-24"
      >
        <Image
          src={asset5}
          alt=""
          aria-hidden
          fill
          className="pointer-events-none object-cover opacity-[0.10]"
          sizes="100vw"
        />
        <div className="container relative mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
            {faq.title}
          </h2>
          <div className="mt-10 rounded-2xl border border-[var(--border-color)] bg-white px-4 shadow-[var(--shadow-soft)] sm:px-8">
            <Accordion type="single" collapsible>
              {faq.items.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-lg font-medium text-[#111111]">
              {faq.ctaPrompt}
            </p>
            <CheckoutTrigger asChild location="faq">
              <Button type="button" size="xl" className="w-full sm:w-auto">
                {faq.ctaButton}
              </Button>
            </CheckoutTrigger>
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Package, TrendingUp, CheckCircle, Lock, Star, Zap, Smartphone } from "lucide-react";
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
  const { hero, benefits, howItWorks, results, multiDevice, pricing, faq, schema } = content;

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

  const monthlyPlan = pricing.plans[0];

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

      <section className="relative overflow-hidden bg-[var(--background)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[600px] w-[600px] rounded-full opacity-50 blur-3xl"
          style={{ background: "var(--gradient-soft)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full opacity-40 blur-3xl"
          style={{ background: "linear-gradient(135deg, #f4efff, #e8d9ff)" }}
        />
        <div className="container relative mx-auto max-w-6xl px-4 py-12 pb-20 sm:px-6 sm:py-20 sm:pb-24 md:py-28 md:pb-32">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 text-center sm:space-y-8 lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--palette-mid)]/30 bg-[var(--palette-mid)]/10 px-4 py-1.5 text-sm font-medium text-[var(--palette-mid)]">
                  <Star className="size-3.5 fill-current" />
                  {hero.badge}
                </span>
              </div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {hero.title}{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  {hero.titleHighlight}
                </span>{" "}
                {hero.titleSuffix}
              </h1>
              <p className="text-base text-[var(--text-secondary)] sm:text-lg md:text-xl">
                {hero.subtitle}
              </p>
              <p className="text-sm text-[var(--text-muted)]">{hero.socialProof}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <CheckoutTrigger asChild location="hero">
                  <Button type="button" size="lg" className="w-full sm:w-auto md:h-14 md:px-8 md:text-lg">
                    {hero.ctaPrimary}
                  </Button>
                </CheckoutTrigger>
                <Button variant="outline" size="lg" asChild className="md:h-14 md:px-8 md:text-lg">
                  <Link href="/#beneficios">{hero.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 scale-75 rounded-full opacity-60 blur-2xl"
                style={{ background: "var(--gradient-soft)" }}
              />
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
        className="border-t border-[hsl(var(--border))] py-16 sm:py-24"
        style={{ background: "var(--gradient-soft)" }}
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
              {benefits.title}
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] sm:text-lg">{benefits.subtitle}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.cards.map((item, i) => {
              const Icon = benefitIcons[i];
              return (
                <Card
                  key={item.title}
                  className="border border-[hsl(var(--border))] bg-white/80 backdrop-blur-sm transition-shadow hover:shadow-[var(--shadow-card)]"
                >
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-[var(--palette-mid)]/10">
                      <Icon className="size-6 text-[var(--palette-mid)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-[var(--text-secondary)]">{item.description}</p>
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
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto bg-white/60">
              <Link href="/#preco">{benefits.ctaSecondary}</Link>
            </Button>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[var(--text-muted)]">
            {benefits.footer}
          </p>
        </div>
      </section>

      <section className="border-t border-[hsl(var(--border))] bg-[var(--background)] py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-10">
              <div>
                <span className="inline-block rounded-full bg-[var(--palette-mid)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--palette-mid)]">
                  {howItWorks.badge}
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
                  {howItWorks.title}
                </h2>
                <p className="mt-3 text-base text-[var(--text-secondary)] sm:text-lg">{howItWorks.subtitle}</p>
              </div>
              <ol className="space-y-7">
                {howItWorks.steps.map((item) => (
                  <li key={item.step} className="flex gap-5">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-[var(--shadow-soft)]"
                      style={{ background: "var(--gradient-primary)" }}
                    >
                      {item.step}
                    </span>
                    <div className="pt-1">
                      <p className="font-semibold text-[var(--foreground)]">{item.title}</p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-50 blur-2xl"
                style={{ background: "var(--gradient-soft)" }}
              />
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

      <section
        className="relative overflow-hidden py-16 sm:py-24"
        style={{ background: "var(--color-surface-dark)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full opacity-15 blur-3xl"
          style={{ background: "#8132ae" }}
        />
        <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-8 text-center lg:text-left">
              <div>
                <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
                  {results.badge}
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  {results.title}
                </h2>
                <p className="mt-3 text-base text-white/70 sm:text-lg">{results.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {results.stats.map((stat, i) => {
                  const Icon = resultsIcons[i];
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/8 px-4 py-3 backdrop-blur-sm"
                    >
                      <Icon className="size-5 shrink-0 text-[var(--palette-mid)]" />
                      <span className="text-sm font-medium text-white">{stat.label}</span>
                    </div>
                  );
                })}
              </div>
              <CheckoutTrigger asChild location="results">
                <Button type="button" variant="dark" size="lg" className="w-full sm:w-auto">
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

      <section
        className="border-t border-[hsl(var(--border))] py-16 sm:py-24"
        style={{ background: "var(--gradient-soft)" }}
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--palette-mid)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--palette-mid)]">
              <Smartphone className="size-3.5" />
              {multiDevice.badge}
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
              {multiDevice.title}
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] sm:text-lg">{multiDevice.subtitle}</p>
          </div>
          <div className="relative mt-12 flex justify-center">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-8 rounded-3xl opacity-60 blur-3xl"
              style={{ background: "linear-gradient(135deg, #e8d9ff, #f4efff)" }}
            />
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
        className="border-t border-[hsl(var(--border))] bg-[var(--background)] py-12 sm:py-24"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-block rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-600">
              {pricing.badge}
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
              {pricing.title}
            </h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {pricing.plans.map((plan) => (
              <div
                key={plan.id}
                className={[
                  "relative flex flex-col overflow-hidden rounded-2xl border shadow-[var(--shadow-card)] transition-shadow hover:shadow-lg",
                  plan.destaque
                    ? "border-[var(--palette-mid)] ring-2 ring-[var(--palette-mid)]"
                    : "border-[hsl(var(--border))]",
                ].join(" ")}
              >
                {plan.destaque && (
                  <div
                    className="py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-white"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    Mais popular
                  </div>
                )}
                <div
                  className="px-6 py-6 text-center text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <p className="text-sm font-semibold uppercase tracking-wider opacity-80">
                    {plan.name}
                  </p>
                  <p className="mt-2 flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold tracking-tight">R$ {plan.price}</span>
                    <span className="mb-1 text-base font-normal opacity-70">{plan.priceSuffix}</span>
                  </p>
                  {plan.savingsBadge && (
                    <span className="mt-2 inline-block rounded-full bg-yellow-400/30 px-2.5 py-0.5 text-xs font-semibold text-yellow-200">
                      {plan.savingsBadge}
                    </span>
                  )}
                  <p className="mt-2 text-xs text-white/60">{plan.billingNote}</p>
                </div>
                <div className="flex flex-1 flex-col gap-6 bg-white p-6">
                  <ul className="space-y-3">
                    {plan.features.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                      >
                        <CheckCircle className="size-4 shrink-0 text-[var(--palette-mid)]" />
                        {item}
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
              <Lock className="size-4 text-[var(--palette-mid)]" />
              {pricing.guarantee}
            </p>
            <p className="text-xs text-[var(--text-muted)]">{pricing.disclaimer}</p>
          </div>
        </div>
      </section>

      <section
        id="duvidas"
        className="relative overflow-hidden border-t border-[hsl(var(--border))] py-12 sm:py-24"
      >
        <Image
          src={asset5}
          alt=""
          aria-hidden
          fill
          className="pointer-events-none object-cover opacity-[0.35]"
          sizes="100vw"
        />
        <div className="container relative mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {faq.title}
          </h2>
          <div className="mt-10 rounded-2xl border border-[hsl(var(--border))] bg-white/80 px-4 backdrop-blur-sm sm:px-8">
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
            <p className="text-lg font-medium text-[var(--foreground)]">{faq.ctaPrompt}</p>
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

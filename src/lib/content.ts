import lpContent from "@/content/lp-content.json";
import { formatPrice, planPrices, type PlanPrices } from "@/lib/founder-price";
// Páginas de capitais ficam num arquivo próprio para o lp-content.json não crescer demais.
import lpCities from "@/content/lp-cities.json";

export type LpContentMeta = {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
};

export type LpContentHero = {
  badge: string;
  title: string;
  titleHighlight: string;
  titleSuffix: string;
  subtitle: string;
  socialProof: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type LpContentBenefits = {
  title: string;
  subtitle: string;
  cards: { title: string; description: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
  footer: string;
};

export type LpContentHowItWorks = {
  badge: string;
  title: string;
  subtitle: string;
  steps: { step: string; title: string; description: string }[];
};

export type LpContentResults = {
  badge: string;
  title: string;
  subtitle: string;
  stats: { label: string }[];
  cta: string;
};

export type LpContentMultiDevice = {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
};

export type LpContentPlan = {
  id: string;
  name: string;
  price: string;
  priceSuffix: string;
  billingNote: string;
  savingsBadge?: string;
  destaque: boolean;
  features: string[];
  cta: string;
};

export type LpContentPricing = {
  badge: string;
  title: string;
  guarantee: string;
  plans: LpContentPlan[];
  disclaimer: string;
};

export type LpContentFaq = {
  title: string;
  items: { question: string; answer: string }[];
  ctaPrompt: string;
  ctaButton: string;
};

export type LpContentShared = {
  headerCta: string;
  footerCtaTitle: string;
  footerCtaSubtitle: string;
  footerCtaButton: string;
  stickyCtaMobile: string;
};

export type LpContentSchema = {
  siteName: string;
  siteDescription: string;
  organizationDescription: string;
  localBusinessDescription: string;
  areaServed: string[];
};

export type LpContentTestimonialItem = {
  name: string;
  city: string;
  business?: string;
  quote: string;
};

export type LpContentTestimonials = {
  badge?: string;
  title: string;
  subtitle?: string;
  items: LpContentTestimonialItem[];
};

export type LpContentPath = {
  meta: LpContentMeta;
  hero: LpContentHero;
  benefits: LpContentBenefits;
  howItWorks: LpContentHowItWorks;
  results: LpContentResults;
  multiDevice: LpContentMultiDevice;
  pricing: LpContentPricing;
  faq: LpContentFaq;
  shared: LpContentShared;
  schema: LpContentSchema;
  testimonials?: LpContentTestimonials;
};

type LpContentMap = Record<string, LpContentPath>;

const contentMap = { ...lpContent, ...lpCities } as LpContentMap;

const DEFAULT_PATH = "main";

export function getLpContent(path: string): LpContentPath {
  const data = contentMap[path] ?? contentMap[DEFAULT_PATH];
  if (!data) {
    throw new Error(
      `LP content not found for path "${path}" and fallback "${DEFAULT_PATH}" is missing.`,
    );
  }
  return data;
}

export function getLpContentPaths(): string[] {
  return Object.keys(contentMap);
}

/**
 * Preços do plano no conteúdo: os textos usam {{mensal}}, {{anual}} e {{anual_mes}} (sem o R$),
 * e os cards mensal/anual ganham a nota do preço de fundadora até 30/11 (o "depois" em linha própria,
 * com \n, para não quebrar no meio no celular). Os valores vêm de
 * planPrices (src/lib/founder-price.ts), que vira sozinho em 01/12.
 */
export function mergeWithLivePrices(content: LpContentPath, prices: PlanPrices): LpContentPath {
  const values: Record<string, string> = {
    mensal: formatPrice(prices.monthly),
    anual: formatPrice(prices.yearly),
    anual_mes: formatPrice(prices.yearlyPerMonth),
  };
  const filled = JSON.parse(
    JSON.stringify(content).replace(/\{\{(mensal|anual_mes|anual)\}\}/g, (_, key: string) => values[key]),
  ) as LpContentPath;

  const founder = prices.founder;
  const plans = filled.pricing.plans.map((plan) => {
    if (plan.id === "mensal")
      return {
        ...plan,
        billingNote: founder
          ? `Preço de fundadora até 30/11\ndepois, R$ ${formatPrice(founder.regularMonthly)}/mês`
          : "Cobrado mensalmente",
      };
    if (plan.id === "anual")
      return {
        ...plan,
        billingNote: founder
          ? `Cobrado R$ ${values.anual}/ano até 30/11\ndepois, R$ ${formatPrice(founder.regularYearly)}/ano`
          : `Cobrado R$ ${values.anual}/ano`,
        savingsBadge: `Economize ${prices.savingsPercent}%`,
      };
    return plan;
  });

  return { ...filled, pricing: { ...filled.pricing, plans } };
}

/** Textos compartilhados (rodapé, CTAs) da página, já com os preços. */
export function getLpShared(path: string, now: Date = new Date()): LpContentShared {
  return mergeWithLivePrices(getLpContent(path), planPrices(now)).shared;
}

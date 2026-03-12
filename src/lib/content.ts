import lpContent from "@/content/lp-content.json";

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

export type LpContentPricing = {
  badge: string;
  price: string;
  priceSuffix: string;
  trialText: string;
  trialSubtext: string;
  features: string[];
  cta: string;
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
};

type LpContentMap = Record<string, LpContentPath>;

const contentMap = lpContent as LpContentMap;

const DEFAULT_PATH = "main";

export function getLpContent(path: string): LpContentPath {
  const data = contentMap[path] ?? contentMap[DEFAULT_PATH];
  if (!data) {
    throw new Error(`LP content not found for path "${path}" and fallback "${DEFAULT_PATH}" is missing.`);
  }
  return data;
}

export function getLpContentPaths(): string[] {
  return Object.keys(contentMap);
}

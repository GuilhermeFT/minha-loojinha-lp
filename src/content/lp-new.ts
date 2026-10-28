// Textos da landing page nova (src/components/lp/new-lp.tsx). As páginas de cidade trocam o título
// do hero, ganham a seção da cidade e o FAQ local (de lp-content.json / lp-cities.json). Os preços
// entram por função, a partir de planPrices (src/lib/founder-price.ts), para virarem sozinhos em 01/12.
// Regras: sem preço riscado, sem "% de desconto" sobre o mensal (só "x% a menos" do anual × mensal),
// sem número de clientes ou depoimento, sem Pix/pagamento online, frete ou app. "Sem cartão" só no grátis.

import { formatPrice, founderCountdown, founderPhase, type PlanPrices } from "@/lib/founder-price";

/**
 * Rótulo da oferta até 30/11 (card do hero, card do preço, faixa do topo e og-image): "Preço de
 * lançamento"; na semana da Black Friday, "Última semana..."; nas últimas 24 h, "Último dia...".
 * null a partir de 01/12. O preço fica garantido enquanto a pessoa for assinante (founder-price.ts).
 */
export function offerLabel(now: Date = new Date()): string | null {
  const left = founderCountdown(now);
  if (!left) return null;
  if (left.days === 0) return "Último dia do preço de lançamento";
  if (founderPhase(now) === "black_friday") return "Última semana do preço de lançamento";
  return "Preço de lançamento";
}

/** Frase da oferta somada à meta description da home e das cidades (vazia a partir de 01/12). */
export function offerMetaSentence(prices: PlanPrices): string {
  return prices.founder ? ` Preço de lançamento: R$ ${formatPrice(prices.monthly)}/mês até 30/11.` : "";
}

export const HERO = {
  kicker: "Para quem vende moda",
  // Até 8 palavras e 3 linhas a 320 px
  titleBefore: "Do link na bio ao ",
  titleEmphasis: "pedido",
  titleAfter: " no WhatsApp.",
  subtitle: "A cliente escolhe peça, cor e tamanho pelo celular. O pedido chega pronto para você confirmar.",
  // Botões com até ~3 palavras, numa linha só
  cta: "Criar loja grátis",
  demo: "Ver loja de exemplo",
  fineprint: "Grátis até 10 produtos, sem cartão.",
};

export const BENEFITS = {
  kicker: "O que muda",
  title: "Menos conversa no privado. Mais pedido pronto.",
  items: [
    {
      title: "A cliente vê tudo sem te perguntar.",
      text: "Foto, preço e tamanhos de cada peça num link só. Ela olha na hora que quiser.",
      figure: "A vitrine, como a cliente vê no celular",
    },
    {
      title: "O pedido chega pronto.",
      text: "Peça, cor, tamanho, total, nome e entrega numa mensagem só no seu WhatsApp.",
      figure: "A mensagem que chega para você",
    },
    {
      title: "Esgotou, ela já sabe.",
      text: "Acabou um tamanho, a vitrine mostra esgotado. O estoque baixa sozinho a cada pedido.",
      figure: "Os tamanhos de uma peça, com o GG esgotado",
    },
  ],
};

export const HOW_IT_WORKS = {
  kicker: "Como funciona",
  title: "Três passos. O primeiro dá para fazer hoje.",
  steps: [
    {
      title: "Cadastre as peças",
      text: "Pelo celular: foto, preço, tamanhos e quanto tem de cada um.",
      screen: "Tela do painel: cadastro de uma peça com foto, preço, cores e estoque por tamanho.",
    },
    {
      title: "Coloque o link na bio",
      text: "Sua loja ganha um endereço próprio. Coloque na bio e mande nos grupos.",
      screen: "Perfil de Instagram de uma loja com o link da vitrine na bio.",
    },
    {
      title: "Receba o pedido no WhatsApp",
      text: "Ela escolhe e envia, sem criar conta. Você confirma e combina o pagamento do seu jeito.",
      screen: "Conversa no WhatsApp da loja com o pedido completo que a cliente enviou.",
    },
  ],
};

export const VARIATIONS = {
  kicker: "Novidade",
  title: "Um anúncio, várias cores.",
  text: "Em vez de postar a mesma peça três vezes, mande um link só. A cliente toca na cor e vê as fotos e o estoque dela.",
  bullets: [
    "Cada cor com as fotos dela",
    "Cada cor com a grade e o estoque dela",
    "Serve para cor, estampa, modelo ou o que você quiser",
  ],
  hint: "Toque numa estampa",
};

export const BEFORE_AFTER = {
  kicker: "Antes e depois",
  title: "A mesma venda, de dois jeitos.",
  beforeLabel: "Antes",
  beforeSub: "no privado",
  afterLabel: "Depois",
  afterSub: "com a sua loja",
  // Conversa escrita por nós: cliente (c) e loja (v). Sem nome nem foto de ninguém.
  chat: [
    { from: "c", text: "oi, boa noite", time: "23:08" },
    { from: "c", text: "tem esse vestido no M?", time: "23:08" },
    { from: "v", text: "oii, tenho sim! qual cor?", time: "23:31" },
    { from: "c", text: "qual o preço?", time: "23:40" },
    { from: "c", text: "manda foto da verde", time: "23:40" },
    { from: "v", text: "foto", time: "23:52" },
    { from: "c", text: "e a off-white tem no M?", time: "23:55" },
    { from: "v", text: "deixa eu ver e te falo", time: "00:12" },
    { from: "c", text: "?", time: "08:03" },
    { from: "c", text: "ainda tem??", time: "08:40" },
  ] as const,
  beforeCaption: "10 mensagens, e a venda ainda não fechou.",
  afterCaption: "Uma mensagem, com tudo para você separar a peça e combinar a entrega.",
};

export const VIDEO = {
  kicker: "Em 30 segundos",
  title: "Veja uma loja funcionando.",
};

export function pricingCopy(prices: PlanPrices) {
  const founder = prices.founder;
  return {
    kicker: "Preço",
    title: founder ? "Preço de lançamento até 30/11." : "Comece grátis. Cresça com o plano Loojinha.",
    founderNote: founder
      ? `Assine até 30/11 às 23h59 e pague R$ ${formatPrice(prices.monthly)}/mês ou R$ ${formatPrice(prices.yearly)}/ano. Preço de lançamento garantido enquanto você for assinante.`
      : null,
    // Cada linha do preço quebra num ponto natural (uma frase por linha), para nunca vazar do card
    yearly: {
      name: "Loojinha anual",
      price: formatPrice(prices.yearly),
      suffix: "/ano",
      lines: [
        `Dá R$ ${formatPrice(prices.yearlyPerMonth)} por mês.`,
        `${prices.savingsPercent}% a menos que 12 meses no mensal.`,
      ],
      after: founder ? `A partir de 01/12: R$ ${formatPrice(founder.regularYearly)}/ano.` : null,
      cta: "Assinar anual",
    },
    monthly: {
      name: "Loojinha mensal",
      price: formatPrice(prices.monthly),
      suffix: "/mês",
      lines: ["Cobrado todo mês.", "Cancele quando quiser."],
      after: founder ? `A partir de 01/12: R$ ${formatPrice(founder.regularMonthly)}/mês.` : null,
      cta: "Assinar mensal",
    },
    paidFeatures: [
      "Produtos ilimitados",
      "Sem o selo da Minha Loojinha na vitrine",
      "Cores e estampas com fotos e estoque próprios",
      "Pedidos organizados no seu WhatsApp",
      "Sem taxa por venda e sem fidelidade",
    ],
    trial: "14 dias de teste no plano Loojinha. O cartão é pedido no início do teste e você cancela quando quiser.",
    free: {
      name: "Grátis",
      text: "Até 10 produtos, sem cartão. Link próprio, pedidos no WhatsApp e o selo “Feito com Minha Loojinha” no rodapé da vitrine.",
      cta: "Começar grátis",
    },
  };
}

type Faq = { question: string; answer: string };

/** Perguntas da home (as de sempre, revisadas). */
export function mainFaq(prices: PlanPrices): Faq[] {
  return [
    {
      question: "Preciso ter CNPJ para usar?",
      answer:
        "Não. Dá para começar com CPF. Funciona do mesmo jeito para MEI, sacoleira, revendedora e quem vende por conta própria.",
    },
    {
      question: "Como minha cliente faz o pedido?",
      answer:
        "Você divulga o link da sua loja (minhaloojinha.com/sua-loja) no Instagram, no WhatsApp ou onde quiser. Ela abre no celular, escolhe as peças, a cor e o tamanho, coloca nome e telefone e envia. O pedido chega no seu WhatsApp com tudo calculado. Ela não precisa baixar app nem criar conta.",
    },
    {
      question: "Como recebo o pagamento das vendas?",
      answer:
        "Direto com a sua cliente, do jeito que você já faz hoje. A Minha Loojinha organiza o pedido e manda tudo no seu WhatsApp; o pagamento você combina com ela. Não cobramos taxa sobre as suas vendas.",
    },
    {
      question: "Preciso de cartão de crédito para começar?",
      answer: `Não. Você cria a conta e já usa o plano grátis, com até 10 produtos, sem cartão. Se quiser produtos ilimitados e tirar o selo da vitrine, assine o plano Loojinha (R$ ${formatPrice(prices.monthly)}/mês ou R$ ${formatPrice(prices.yearly)}/ano) com 14 dias de teste; o cartão é pedido no início do teste.`,
    },
    {
      question: "O sistema controla os tamanhos?",
      answer:
        "Sim. Você cadastra cada peça com os tamanhos (PP, P, M, G, GG...) e o estoque de cada um. Quando um tamanho acaba, a vitrine mostra esgotado e a cliente não consegue pedir. Com variações, cada cor ou estampa tem a própria grade.",
    },
    {
      question: "E se eu tiver dúvidas depois que assinar?",
      answer:
        "Tem suporte por WhatsApp em horário comercial. Você não fica sozinha depois de assinar.",
    },
  ];
}

/** As duas perguntas do preço de lançamento (só até 30/11). */
export function founderFaq(prices: PlanPrices): Faq[] {
  const founder = prices.founder;
  if (!founder) return [];
  return [
    {
      question: "O que é o preço de lançamento?",
      answer: `É o preço de quem assina o plano Loojinha até 30/11/2026, às 23h59: R$ ${formatPrice(prices.monthly)} por mês ou R$ ${formatPrice(prices.yearly)} por ano. Ele fica travado enquanto você for assinante, mesmo depois que o preço mudar.`,
    },
    {
      question: "O que acontece em 01/12?",
      answer: `A partir de 01/12/2026, o plano Loojinha passa a custar R$ ${formatPrice(founder.regularMonthly)} por mês ou R$ ${formatPrice(founder.regularYearly)} por ano para quem assinar a partir dessa data. Quem assinou até 30/11 continua com o preço de lançamento enquanto for assinante.`,
    },
  ];
}

export const FINAL_CTA = {
  title: "Sua loja pode receber o primeiro pedido hoje.",
  founderLine: "O preço de lançamento termina em",
  cta: "Criar loja grátis",
  fineprint: "Grátis até 10 produtos, sem cartão.",
};

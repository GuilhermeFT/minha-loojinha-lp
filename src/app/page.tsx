import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Package, TrendingUp, CheckCircle, Lock, Star, Zap, Smartphone } from "lucide-react";
import asset1 from "@/assets/images/asset-1.png";
import asset2 from "@/assets/images/asset-2.png";
import asset3 from "@/assets/images/asset-3.png";
import asset4 from "@/assets/images/asset-4.png";
import asset5 from "@/assets/images/asset-5.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckoutTrigger } from "@/components/checkout-trigger";
import { JsonLd } from "@/components/json-ld";

const siteUrlDefault = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";

export const metadata: Metadata = {
  title: "Minha Loojinha | Venda no WhatsApp em Anápolis, Goiânia e região",
  description:
    "Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp. Catálogo estruturado, pedidos organizados, pagamento online e estoque automático. 90 dias grátis.",
  alternates: {
    canonical: siteUrlDefault.replace(/\/$/, ""),
  },
};

export default function Home() {
  const faqItems = [
    {
      question: "O que é o acesso antecipado?",
      answer:
        "O Minha Loojinha está em fase beta: você já pode usar a ferramenta e nos ajudar a melhorar. Podem haver ajustes e novas funções. Estamos atentos ao seu feedback para entregar a melhor experiência.",
    },
    {
      question: "Como funciona o período de 90 dias grátis?",
      answer:
        "Você cadastra seu cartão agora, mas a primeira cobrança só acontece após 90 dias. Durante esse período você usa o Minha Loojinha sem pagar nada. Se quiser cancelar antes, é só avisar.",
    },
    {
      question: "O preço de R$ 49,90 é promocional?",
      answer:
        "Sim. Esse valor é uma oferta para os primeiros inscritos. Quem garantir a vaga agora paga R$ 49,90/mês mesmo após o trial. Os próximos podem ter outro valor.",
    },
    {
      question: "Qual a diferença para um catálogo simples no WhatsApp?",
      answer:
        "No catálogo simples, o cliente manda mensagem solta com itens e você precisa interpretar e organizar. No Minha Loojinha, o cliente monta o pedido no catálogo e envia já estruturado, com totais e forma de pagamento. Você recebe tudo organizado e o estoque é atualizado sozinho.",
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer:
        "Sim. Você pode cancelar quando quiser. Não há fidelidade. Após o cancelamento, você continua com acesso até o fim do período já pago.",
    },
    {
      question: "Funciona na minha cidade? (Anápolis, Goiânia e região)",
      answer:
        "Sim. O Minha Loojinha funciona em qualquer lugar do Brasil via internet. É ideal para quem vende em Anápolis, Goiânia e toda a região, pois seu catálogo fica disponível no WhatsApp para seus clientes locais acessarem e fazerem pedidos a qualquer hora.",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "A assinatura é cobrada no cartão de crédito (Visa, Mastercard, etc.) de forma recorrente mensal. O pagamento é processado de forma segura na página de checkout.",
    },
  ];

  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br";
  const baseUrl = siteUrl.replace(/\/$/, "");

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Minha Loojinha",
    url: baseUrl,
    description:
      "Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp. Catálogo estruturado, pedidos organizados, pagamento online e estoque automático.",
    inLanguage: "pt-BR",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Minha Loojinha",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Catálogo estruturado para WhatsApp. Pedidos organizados, estoque automático. Para negócios em Anápolis, Goiânia e região.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Minha Loojinha",
    description:
      "Solução para vendas online via WhatsApp em Anápolis, Goiânia e região. Catálogo estruturado, pedidos organizados, estoque automático.",
    areaServed: ["Anápolis", "Goiânia", "Região Metropolitana de Goiânia"],
    url: baseUrl,
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Minha Loojinha",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: baseUrl,
    description:
      "Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp. Catálogo estruturado, pedidos organizados, pagamento online e estoque automático.",
    offers: {
      "@type": "Offer",
      price: "49.90",
      priceCurrency: "BRL",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "49.90",
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--background)]">
        {/* Blob de gradiente decorativo */}
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
              {/* Badge pill */}
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--palette-mid)]/30 bg-[var(--palette-mid)]/10 px-4 py-1.5 text-sm font-medium text-[var(--palette-mid)]">
                  <Star className="size-3.5 fill-current" />
                  90 dias grátis para testar — sem cobrança agora
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Venda mais no{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  WhatsApp
                </span>{" "}
                em Anápolis, Goiânia e região
              </h1>

              <p className="text-base text-[var(--text-secondary)] sm:text-lg md:text-xl">
                Seu cliente escolhe os produtos, envia o pedido pronto e paga online.
                Você recebe tudo organizado com controle de estoque automático —
                sem mensagem bagunçada.
              </p>

              <p className="text-sm text-[var(--text-muted)]">
                Lojistas da região já estão garantindo vaga no acesso antecipado.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <CheckoutTrigger asChild>
                  <Button type="button" size="lg" className="w-full sm:w-auto md:h-14 md:px-8 md:text-lg">
                    Quero acesso antecipado — R$ 49,90/mês
                  </Button>
                </CheckoutTrigger>
                <Button variant="outline" size="lg" asChild className="md:h-14 md:px-8 md:text-lg">
                  <Link href="/#beneficios">Ver benefícios</Link>
                </Button>
              </div>
            </div>

            {/* Asset 1 */}
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

      {/* Benefícios */}
      <section
        id="beneficios"
        className="border-t border-[hsl(var(--border))] py-16 sm:py-24"
        style={{ background: "var(--gradient-soft)" }}
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
              Feito para quem vende em Anápolis, Goiânia e região
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] sm:text-lg">
              Chega de mensagens bagunçadas. Seu catálogo fica estruturado, o
              cliente manda o pedido pronto e você foca em vender mais.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                title: "Pedido estruturado no WhatsApp",
                description:
                  "Seu cliente monta o pedido no catálogo e envia uma única mensagem organizada, com itens e totais.",
              },
              {
                icon: Package,
                title: "Estoque automático",
                description:
                  "Controle de estoque atualizado a cada pedido. Menos erro e menos trabalho manual.",
              },
              {
                icon: TrendingUp,
                title: "Menos tempo, mais vendas",
                description:
                  "Menos tempo enviando foto e preço. Mais tempo atendendo e fechando vendas.",
              },
            ].map((item) => (
              <Card key={item.title} className="border border-[hsl(var(--border))] bg-white/80 backdrop-blur-sm transition-shadow hover:shadow-[var(--shadow-card)]">
                <CardHeader className="pb-3">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-[var(--palette-mid)]/10">
                    <item.icon className="size-6 text-[var(--palette-mid)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <CheckoutTrigger asChild>
              <Button type="button" size="lg" className="w-full sm:w-auto">
                Quero acesso antecipado — R$ 49,90/mês
              </Button>
            </CheckoutTrigger>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto bg-white/60">
              <Link href="/#preco">Ver preço e oferta</Link>
            </Button>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[var(--text-muted)]">
            Suporte em português, pensado para o comércio local de Anápolis,
            Goiânia e toda a região.
          </p>
        </div>
      </section>

      {/* Como funciona */}
      <section className="border-t border-[hsl(var(--border))] bg-[var(--background)] py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-10">
              <div>
                <span className="inline-block rounded-full bg-[var(--palette-mid)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--palette-mid)]">
                  Simples de configurar
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
                  Comece a vender em minutos
                </h2>
                <p className="mt-3 text-base text-[var(--text-secondary)] sm:text-lg">
                  Sem complicação técnica. Você cadastra seus produtos, compartilha o link e seu cliente já faz o pedido.
                </p>
              </div>

              <ol className="space-y-7">
                {[
                  {
                    step: "1",
                    title: "Cadastre seus produtos",
                    description: "Adicione nome, preço, foto e estoque. Em minutos seu catálogo está pronto.",
                  },
                  {
                    step: "2",
                    title: "Compartilhe o link no WhatsApp",
                    description: "Envie para seus clientes e eles já podem escolher os produtos e montar o pedido.",
                  },
                  {
                    step: "3",
                    title: "Receba pedidos organizados",
                    description: "O cliente envia tudo estruturado. Estoque atualizado automaticamente a cada pedido.",
                  },
                ].map((item) => (
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

            {/* Asset 2 */}
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

      {/* Resultados — dark section */}
      <section
        className="relative overflow-hidden py-16 sm:py-24"
        style={{ background: "var(--color-surface-dark)" }}
      >
        {/* Glow decoration */}
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
                  Resultados reais
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Transforme mensagens bagunçadas em vendas organizadas
                </h2>
                <p className="mt-3 text-base text-white/70 sm:text-lg">
                  Chega de anotar pedido no papel ou perder cliente no meio da conversa. Tudo no lugar certo, do jeito certo.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { icon: CheckCircle, label: "Pedidos sempre organizados" },
                  { icon: Package, label: "Estoque em tempo real" },
                  { icon: Zap, label: "Atendimento muito mais rápido" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/8 px-4 py-3 backdrop-blur-sm"
                  >
                    <stat.icon className="size-5 shrink-0 text-[var(--palette-mid)]" />
                    <span className="text-sm font-medium text-white">{stat.label}</span>
                  </div>
                ))}
              </div>

              <CheckoutTrigger asChild>
                <Button type="button" variant="dark" size="lg" className="w-full sm:w-auto">
                  Quero organizar minhas vendas
                </Button>
              </CheckoutTrigger>
            </div>

            {/* Asset 3 */}
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

      {/* Showcase — multi-dispositivo */}
      <section
        className="border-t border-[hsl(var(--border))] py-16 sm:py-24"
        style={{ background: "var(--gradient-soft)" }}
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--palette-mid)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--palette-mid)]">
              <Smartphone className="size-3.5" />
              Funciona em qualquer dispositivo
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
              Sua loja em qualquer lugar
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] sm:text-lg">
              Seus clientes acessam o catálogo pelo celular, tablet ou computador — sem precisar instalar nada. Você gerencia tudo pelo painel.
            </p>
          </div>

          {/* Asset 4 */}
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
            <CheckoutTrigger asChild>
              <Button type="button" size="lg" className="w-full sm:w-auto">
                Criar minha loja agora
              </Button>
            </CheckoutTrigger>
          </div>
        </div>
      </section>

      {/* Preço e CTA */}
      <section
        id="preco"
        className="border-t border-[hsl(var(--border))] bg-[var(--background)] py-12 sm:py-24"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-xl">
            <div className="overflow-hidden rounded-2xl border border-[var(--palette-mid)]/20 shadow-[var(--shadow-card)]">
              {/* Card header com gradiente */}
              <div
                className="px-8 py-8 text-center text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                <span className="inline-block rounded-full border border-yellow-300/40 bg-yellow-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-200">
                  Oferta Beta — Vagas limitadas
                </span>
                <p className="mt-4 text-5xl font-bold tracking-tight">
                  R$ 49,90
                  <span className="text-xl font-normal opacity-80">/mês</span>
                </p>
                <p className="mt-2 flex items-center justify-center gap-2 text-base font-semibold text-white/90">
                  <Lock className="size-4" />
                  90 dias grátis para testar
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Primeira cobrança só após 3 meses.
                </p>
              </div>

              {/* Card body */}
              <div className="space-y-6 bg-white p-8 text-center">
                <ul className="space-y-3 text-left">
                  {[
                    "Catálogo ilimitado de produtos",
                    "Pedidos estruturados via WhatsApp",
                    "Controle de estoque automático",
                    "Cancele quando quiser, sem fidelidade",
                    "Suporte em português",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                      <CheckCircle className="size-4 shrink-0 text-[var(--palette-mid)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <CheckoutTrigger asChild>
                  <Button type="button" size="xl" className="w-full">
                    Garantir minha vaga
                  </Button>
                </CheckoutTrigger>
                <p className="text-xs text-[var(--text-muted)]">
                  Cartão de crédito. Cancele a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="duvidas"
        className="relative overflow-hidden border-t border-[hsl(var(--border))] py-12 sm:py-24"
      >
        {/* Asset 5 — background pattern */}
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
            Dúvidas frequentes
          </h2>
          <div className="mt-10 rounded-2xl border border-[hsl(var(--border))] bg-white/80 px-4 backdrop-blur-sm sm:px-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="early-access">
                <AccordionTrigger>O que é o acesso antecipado?</AccordionTrigger>
                <AccordionContent>
                  O Minha Loojinha está em fase beta: você já pode usar a ferramenta
                  e nos ajudar a melhorar. Podem haver ajustes e novas funções.
                  Estamos atentos ao seu feedback para entregar a melhor experiência.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="trial">
                <AccordionTrigger>
                  Como funciona o período de 90 dias grátis?
                </AccordionTrigger>
                <AccordionContent>
                  Você cadastra seu cartão agora, mas a primeira cobrança só
                  acontece após 90 dias. Durante esse período você usa o Minha
                  Loojinha sem pagar nada. Se quiser cancelar antes, é só avisar.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>O preço de R$ 49,90 é promocional?</AccordionTrigger>
                <AccordionContent>
                  Sim. Esse valor é uma oferta para os primeiros inscritos. Quem
                  garantir a vaga agora paga R$ 49,90/mês mesmo após o trial. Os
                  próximos podem ter outro valor.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="difference">
                <AccordionTrigger>
                  Qual a diferença para um catálogo simples no WhatsApp?
                </AccordionTrigger>
                <AccordionContent>
                  No catálogo simples, o cliente manda mensagem solta com itens e
                  você precisa interpretar e organizar. No Minha Loojinha, o
                  cliente monta o pedido no catálogo e envia já estruturado, com
                  totais e forma de pagamento. Você recebe tudo organizado e o
                  estoque é atualizado sozinho.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cancel">
                <AccordionTrigger>Posso cancelar a qualquer momento?</AccordionTrigger>
                <AccordionContent>
                  Sim. Você pode cancelar quando quiser. Não há fidelidade. Após
                  o cancelamento, você continua com acesso até o fim do período
                  já pago.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="region">
                <AccordionTrigger>
                  Funciona na minha cidade? (Anápolis, Goiânia e região)
                </AccordionTrigger>
                <AccordionContent>
                  Sim. O Minha Loojinha funciona em qualquer lugar do Brasil via
                  internet. É ideal para quem vende em Anápolis, Goiânia e toda a
                  região, pois seu catálogo fica disponível no WhatsApp para seus
                  clientes locais acessarem e fazerem pedidos a qualquer hora.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="payment">
                <AccordionTrigger>Quais formas de pagamento são aceitas?</AccordionTrigger>
                <AccordionContent>
                  A assinatura é cobrada no cartão de crédito (Visa, Mastercard,
                  etc.) de forma recorrente mensal. O pagamento é processado de
                  forma segura na página de checkout.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-lg font-medium text-[var(--foreground)]">
              Pronto para organizar suas vendas no WhatsApp?
            </p>
            <CheckoutTrigger asChild>
              <Button type="button" size="xl" className="w-full sm:w-auto">
                Quero acesso antecipado — R$ 49,90/mês
              </Button>
            </CheckoutTrigger>
          </div>
        </div>
      </section>
    </div>
  );
}

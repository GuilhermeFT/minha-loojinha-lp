import Image from "next/image";
import Link from "next/link";
import lpCart from "@/assets/lp-cart.svg";
import lpCartMobile from "@/assets/lp-cart-mobile.svg";
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

export default function Home() {
  const faqItems = [
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
      question:
        "Funciona na minha cidade? (Anápolis, Goiânia e região)",
      answer:
        "Sim. O Minha Loojinha funciona em qualquer lugar do Brasil via internet. É ideal para quem vende em Anápolis, Goiânia e toda a região, pois seu catálogo fica disponível no WhatsApp para seus clientes locais acessarem e fazerem pedidos a qualquer hora.",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "A assinatura é cobrada no cartão de crédito (Visa, Mastercard, etc.) de forma recorrente mensal. O pagamento é processado de forma segura na página de checkout.",
    },
  ];

  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com";
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

  return (
    <div className="flex flex-col">
      <JsonLd
        data={[webSiteSchema, organizationSchema, faqSchema, localBusinessSchema]}
      />
        {/* Hero */}
        <section className="container mx-auto max-w-6xl px-3 py-12 sm:px-6 sm:py-24 md:px-6 md:py-32">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl lg:text-6xl">
                Venda mais no WhatsApp em Anápolis, Goiânia e região
              </h1>
              <p className="text-base text-[hsl(var(--muted-foreground))] sm:text-lg md:text-xl">
                Solução para MEIs, lojistas e microempreendedores da região que
                querem vender online. Seu cliente escolhe os produtos, envia o
                pedido pronto, paga online e você recebe tudo organizado com
                controle de estoque automático.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center lg:justify-start">
                <CheckoutTrigger asChild>
                  <Button type="button" size="lg" className="w-full sm:w-auto md:h-14 md:px-8 md:text-lg">
                    Garantir minha vaga — R$ 49,90/mês
                  </Button>
                </CheckoutTrigger>
                <Button variant="outline" size="lg" asChild className="md:h-14 md:px-8 md:text-lg">
                  <Link href="/#beneficios">Ver benefícios</Link>
                </Button>
              </div>
            </div>
          <div className="relative flex justify-center">
            <div className="hidden w-full max-w-lg md:block">
              <Image
                src={lpCart}
                alt="Catálogo e pedidos no WhatsApp"
                width={630}
                height={594}
                className="w-full"
                priority
              />
            </div>
            <div className="w-full max-w-sm md:hidden">
              <Image
                src={lpCartMobile}
                alt="Catálogo e pedidos no WhatsApp"
                width={566}
                height={553}
                className="w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section
        id="beneficios"
        className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 py-16 sm:py-24"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl md:text-4xl">
            Feito para quem vende em Anápolis, Goiânia e região
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
            Chega de mensagens bagunçadas. Seu catálogo fica estruturado, o
            cliente manda o pedido pronto e você foca em vender mais.
          </p>
          <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Pedido estruturado no WhatsApp",
                description:
                  "Seu cliente monta o pedido no catálogo e envia uma única mensagem organizada, com itens e totais.",
              },
              {
                title: "Pagamento online",
                description:
                  "Integre com meios de pagamento e receba confirmação sem precisar cobrar manualmente.",
              },
              {
                title: "Estoque automático",
                description:
                  "Controle de estoque atualizado a cada pedido. Menos erro e menos trabalho manual.",
              },
              {
                title: "Menos tempo, mais vendas",
                description:
                  "Menos tempo enviando foto e preço. Mais tempo atendendo e fechando vendas.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-2 min-h-[140px] sm:min-h-0">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[hsl(var(--muted-foreground))]">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <CheckoutTrigger asChild>
              <Button type="button" size="lg" className="w-full sm:w-auto">
                Garantir minha vaga — R$ 49,90/mês
              </Button>
            </CheckoutTrigger>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href="/#preco">Ver preço e oferta</Link>
            </Button>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-[hsl(var(--muted-foreground))]">
            Suporte em português, pensado para o comércio local de Anápolis,
            Goiânia e toda a região.
          </p>
        </div>
      </section>

      {/* Preço e CTA */}
      <section
        id="preco"
        className="container mx-auto max-w-6xl px-3 py-12 sm:px-6 sm:py-24 md:py-24"
      >
        <div className="mx-auto max-w-xl px-1 sm:px-0">
          <Card className="overflow-hidden border-2 border-[hsl(var(--primary))]/20 shadow-[var(--shadow-card)]">
            <CardHeader className="space-y-1 text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-[hsl(var(--primary))]">
                Oferta para primeiros inscritos
              </p>
              <CardTitle className="text-4xl font-bold">
                R$ 49,90
                <span className="text-lg font-normal text-[hsl(var(--muted-foreground))]">
                  /mês
                </span>
              </CardTitle>
              <p className="text-lg font-semibold text-[hsl(var(--primary))]">
                90 dias grátis para testar
              </p>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-[hsl(var(--muted-foreground))]">
                Coloque seu cartão agora e só comece a pagar depois de 90 dias.
                Cancele quando quiser.
              </p>
              <CheckoutTrigger asChild>
                <Button type="button" size="xl" className="w-full">
                  Garantir minha vaga
                </Button>
              </CheckoutTrigger>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="duvidas"
        className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 py-12 sm:py-24"
      >
        <div className="container mx-auto max-w-3xl px-3 sm:px-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Dúvidas frequentes
          </h2>
          <Accordion type="single" collapsible className="mt-10">
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
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-lg font-medium text-[var(--foreground)]">
              Pronto para organizar suas vendas no WhatsApp?
            </p>
            <CheckoutTrigger asChild>
              <Button type="button" size="xl" className="w-full max-w-sm">
                Garantir minha vaga — R$ 49,90/mês
              </Button>
            </CheckoutTrigger>
          </div>
        </div>
      </section>
    </div>
  );
}

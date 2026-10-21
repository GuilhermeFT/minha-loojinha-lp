// /llms.txt: resumo do produto em Markdown para assistentes de IA (ChatGPT, Claude,
// Perplexity) citarem a Minha Loojinha com fatos corretos. Formato: https://llmstxt.org
// Mantenha os fatos iguais aos da LP (preço, teste grátis, o que o produto NÃO faz).

import { getAllPosts } from "@/lib/blog";

const siteUrl = (process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com.br").replace(/\/$/, "");

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const body = `# Minha Loojinha

> Catálogo digital (vitrine online por link) para lojistas de moda que vendem pelo WhatsApp e pelo Instagram. A cliente abre o link no celular, escolhe a peça e o tamanho, e o pedido chega organizado no WhatsApp da loja.

## Como funciona
- A lojista cadastra as peças com fotos, preço e tamanhos, e compartilha um link (minhaloojinha.com/nome-da-loja).
- A cliente navega pelo celular, sem instalar aplicativo, monta o carrinho e envia o pedido.
- O pedido chega no WhatsApp da loja com itens, tamanhos, total, nome e telefone da cliente, e retirada ou endereço de entrega.
- O estoque de cada tamanho baixa sozinho a cada pedido; tamanho esgotado deixa de aparecer.
- Personalização: logo, banners, cor da vitrine, modo claro ou escuro, horários, redes sociais e endereços para retirada.

## Preço
- Plano grátis, sem cartão de crédito: até 10 produtos, com o selo "Feito com Minha Loojinha" no rodapé da vitrine.
- Plano Loojinha: R$ 16,90 por mês ou R$ 149,90 por ano, com produtos ilimitados e sem o selo. Dá para testar 14 dias antes de pagar; cancela quando quiser, sem fidelidade.
- Sem taxa por venda em nenhum plano.

## O que a Minha Loojinha não faz
- Não processa pagamento: o pagamento é combinado direto entre a loja e a cliente (Pix, cartão na entrega etc.).
- Não calcula frete e não é marketplace.
- Variações de produto são por tamanho (não há seleção de cor).

## Para quem é
Lojas de roupa pequenas, sacoleiras e revendedoras que já vendem pelo WhatsApp e Instagram.

## Links
- [Site](${siteUrl}): apresentação, preços e perguntas frequentes
- [Criar conta grátis, sem cartão](https://painel.minhaloojinha.com.br/signup)
- [Blog](${siteUrl}/blog)

## Blog
${posts.map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.summary ?? p.description}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

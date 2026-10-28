// Loja de demonstração desenhada nas telas da LP (celular do hero, recortes, variações, og-image).
// É a ACME Moda de verdade (https://minhaloojinha.com/acme): nomes, preços, tamanhos e estoque do
// catálogo dela; fotos (Unsplash, créditos em public/demo/CREDITOS.md) reduzidas para ~600px em
// public/demo/. Mudou algo na loja? Mude aqui; nada nas telas tem foto/nome fixo fora deste arquivo.

export type DemoOption = {
  name: string;
  image: string;
  /** Estoque por tamanho desta opção (0 = esgotado). */
  stock: Record<string, number>;
};

export type DemoVariant = {
  id: string;
  name: string;
  price: number;
  /** Preço promocional da vitrine (null = sem promoção). */
  promoPrice: number | null;
  variationLabel: string;
  sizes: string[];
  options: DemoOption[];
};

export type DemoProduct = {
  id: string;
  name: string;
  price: number;
  promoPrice: number | null;
  image: string;
};

export const DEMO_STORE = {
  name: "ACME Moda",
  slug: "acme",
  /** Cor do tema da vitrine: só dentro do celular (fora dele, a LP usa a paleta da Minha Loojinha). */
  themeColor: "#8C4A3B",
  logo: "/demo/acme-logo.png",
  /** Proporção do logo (839×411). */
  logoRatio: 839 / 411,
  bio: "Moda feminina leve, pra dias de sol. Linho, viscose e malha do PP ao GG, com envio pra todo o Brasil.",
  banner: "/demo/banner-verao.jpg",
};

export const DEMO_STORE_URL = `https://minhaloojinha.com/${DEMO_STORE.slug}`;
export const DEMO_STORE_DISPLAY_URL = `minhaloojinha.com/${DEMO_STORE.slug}`;

/** Peça do hero: o vestido de linho em 2 cores (toca em Verde Oliva e a foto troca). */
export const DEMO_DRESS: DemoVariant = {
  id: "vestido-linho",
  name: "Vestido Linho com Cinto de Corda",
  price: 159.9,
  promoPrice: null,
  variationLabel: "Cor",
  sizes: ["PP", "P", "M", "G", "GG"],
  options: [
    { name: "Off-white", image: "/demo/vestido-linho-offwhite.jpg", stock: { PP: 2, P: 4, M: 5, G: 3, GG: 0 } },
    { name: "Verde Oliva", image: "/demo/vestido-linho-verde-oliva.jpg", stock: { PP: 0, P: 3, M: 4, G: 2, GG: 1 } },
  ],
};

/** Peça da seção "Novidade: variações": a pantalona em 3 estampas. */
export const DEMO_PANTS: DemoVariant = {
  id: "pantalona-estampada",
  name: "Pantalona Estampada de Viscose",
  price: 129.9,
  promoPrice: 99.9,
  variationLabel: "Estampa",
  sizes: ["PP", "P", "M", "G", "GG"],
  options: [
    { name: "Folhagem", image: "/demo/pantalona-estampada-folhagem.jpg", stock: { PP: 1, P: 3, M: 2, G: 2, GG: 0 } },
    { name: "Palmeiras", image: "/demo/pantalona-estampada-palmeiras.jpg", stock: { PP: 2, P: 2, M: 3, G: 1, GG: 1 } },
    { name: "Floral", image: "/demo/pantalona-estampada-floral.jpg", stock: { PP: 0, P: 2, M: 2, G: 0, GG: 0 } },
  ],
};

/** Grade da home da loja, na ordem da vitrine. */
export const DEMO_PRODUCTS: DemoProduct[] = [
  { id: "vestido-linho", name: DEMO_DRESS.name, price: 159.9, promoPrice: null, image: "/demo/vestido-linho-offwhite.jpg" },
  { id: "vestido-chemise", name: "Vestido Chemise Terracota", price: 149.9, promoPrice: 119.9, image: "/demo/vestido-chemise-terracota.jpg" },
  { id: "vestido-midi", name: "Vestido Midi de Alcinha Verde-água", price: 139.9, promoPrice: null, image: "/demo/vestido-midi-alcinha-verde-agua.jpg" },
  { id: "cropped", name: "Cropped Canelado", price: 59.9, promoPrice: null, image: "/demo/cropped-canelado-azul-bebe.jpg" },
  { id: "blusa", name: "Blusa Floral com Amarração", price: 79.9, promoPrice: null, image: "/demo/blusa-floral-amarracao.jpg" },
  { id: "saia", name: "Saia Midi Poá", price: 119.9, promoPrice: null, image: "/demo/saia-midi-poa-frente.jpg" },
  { id: "pantalona", name: DEMO_PANTS.name, price: 129.9, promoPrice: 99.9, image: "/demo/pantalona-estampada-folhagem.jpg" },
  { id: "bolsa", name: "Bolsa Saco de Palha", price: 89.9, promoPrice: null, image: "/demo/bolsa-saco-palha.jpg" },
];

/** O pedido de exemplo (carrinho, WhatsApp). Cliente fictícia. */
export const DEMO_ORDER = {
  number: 128,
  customerName: "Juliana",
  customerPhone: "(62) 9 9999-0000",
  delivery: "Retirada na loja",
  items: [
    { qty: 1, name: DEMO_DRESS.name, variation: "Cor: Verde Oliva", size: "M", price: 159.9, image: "/demo/vestido-linho-verde-oliva.jpg" },
    { qty: 1, name: "Cropped Canelado", variation: "Cor: Bege", size: "P", price: 59.9, image: "/demo/cropped-canelado-bege.jpg" },
  ],
};

export const DEMO_ORDER_TOTAL = DEMO_ORDER.items.reduce((sum, item) => sum + item.qty * item.price, 0);

/** " (Cor: Verde Oliva, Tamanho: M)": o mesmo sufixo que a vitrine põe na mensagem do pedido. */
export function itemSuffix(item: { variation: string | null; size: string }): string {
  const parts = [item.variation, `Tamanho: ${item.size}`].filter(Boolean);
  return ` (${parts.join(", ")})`;
}

export function brl(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

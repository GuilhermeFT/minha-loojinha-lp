import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_URL ?? "https://minhaloojinha.com";
const baseUrl = siteUrl.replace(/\/$/, "");

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Minha Loojinha",
    short_name: "Minha Loojinha",
    description:
      "Solução para MEIs e lojistas de Anápolis, Goiânia e região venderem online no WhatsApp. Catálogo estruturado, pedidos organizados, estoque automático.",
    start_url: baseUrl,
    display: "standalone",
    background_color: "#faf8fc",
    theme_color: "#27003e",
    lang: "pt-BR",
  };
}

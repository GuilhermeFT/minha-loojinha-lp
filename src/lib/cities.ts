// Páginas por cidade servidas por src/app/[slug] (conteúdo em lp-content.json e
// lp-cities.json). Usado nos links "Outras cidades" e no rodapé, para que todas
// fiquem rastreáveis. Ao criar uma página de cidade nova, adicione aqui.
export type CityPage = { slug: string; name: string };

export const CITY_PAGES: CityPage[] = [
  { slug: "anapolis", name: "Anápolis" },
  { slug: "belo-horizonte", name: "Belo Horizonte" },
  { slug: "brasilia", name: "Brasília" },
  { slug: "curitiba", name: "Curitiba" },
  { slug: "fortaleza", name: "Fortaleza" },
  { slug: "goiania", name: "Goiânia" },
  { slug: "porto-alegre", name: "Porto Alegre" },
  { slug: "recife", name: "Recife" },
  { slug: "rio-de-janeiro", name: "Rio de Janeiro" },
  { slug: "salvador", name: "Salvador" },
  { slug: "sao-paulo", name: "São Paulo" },
];

export function isCityPage(slug: string): boolean {
  return CITY_PAGES.some((c) => c.slug === slug);
}

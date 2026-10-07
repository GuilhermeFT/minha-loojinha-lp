// Link do botão "criar loja": vai direto ao cadastro do painel (não ao login) e
// repassa UTMs e ids de clique da visita atual. O cookie ml_attr já leva a origem
// no domínio .minhaloojinha.com.br; os parâmetros na URL são a garantia extra.

const PANEL_URL = process.env.NEXT_PUBLIC_PANEL_URL ?? "https://painel.minhaloojinha.com.br/";
const FORWARDED = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];

export function panelSignupUrl(): string {
  const url = new URL("signup", PANEL_URL.endsWith("/") ? PANEL_URL : `${PANEL_URL}/`);
  if (typeof window !== "undefined") {
    const current = new URLSearchParams(window.location.search);
    for (const key of FORWARDED) {
      const value = current.get(key);
      if (value) url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

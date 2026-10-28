// /og-image.png: imagem de compartilhamento (1200×630) gerada por data. Até 30/11, "Preço de
// lançamento" (fundo preto na semana da Black Friday); a partir de 01/12, a versão normal. O caminho
// é o mesmo do antigo arquivo estático, então metadata, posts do blog e JSON-LD não mudaram.
// Não depende de rede no build: usa a fonte padrão do next/og e lê as fotos da ACME de public/demo
// (src/content/demo-store.ts), incluídas no deploy por outputFileTracingIncludes (next.config.ts).

import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { DEMO_PRODUCTS, DEMO_STORE, DEMO_STORE_DISPLAY_URL, brl } from "@/content/demo-store";
import { offerLabel } from "@/content/lp-new";
import { formatPrice, founderPhase, planPrices } from "@/lib/founder-price";

export const dynamic = "force-static";
export const revalidate = 3600;

async function dataUri(src: string): Promise<string> {
  const file = await fs.readFile(path.join(process.cwd(), "public", src));
  const type = src.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${file.toString("base64")}`;
}

export async function GET() {
  const now = new Date();
  const phase = founderPhase(now);
  const prices = planPrices(now);
  const dark = phase === "black_friday";
  // Paleta do painel (DESIGN.md); no tema Black Friday, #111111 com o roxo e o lilás da marca
  const bg = dark ? "#111111" : "#fcf8fb";
  const title = dark ? "#ffffff" : "#27003e";
  const text2 = dark ? "#c7c2cb" : "#636366";
  const card = dark ? "#1c1c1e" : "#ffffff";
  const hairline = dark ? "#2f2f33" : "#e5e5ea";
  const accent = dark ? "#e2b5ff" : "#530083";

  const label = offerLabel(now);
  const offer = prices.founder && label
    ? {
        label: label.toUpperCase(),
        price: `R$ ${formatPrice(prices.monthly)}/mês`,
        note: "para quem assinar até 30/11",
      }
    : { label: "COMECE GRÁTIS", price: "Até 10 produtos", note: "sem cartão · sem taxa por venda" };

  const cards = DEMO_PRODUCTS.slice(0, 4);
  const [logo, ...images] = await Promise.all([dataUri(DEMO_STORE.logo), ...cards.map((c) => dataUri(c.image))]);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: bg, padding: "56px 64px" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 660, justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: accent, letterSpacing: -0.5 }}>Minha Loojinha</div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 800, lineHeight: 1.06, color: title, letterSpacing: -2 }}>
          Do link na bio ao pedido no WhatsApp.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            background: card,
            border: `2px solid ${hairline}`,
            borderRadius: 24,
            padding: "20px 28px",
          }}
        >
          <div style={{ display: "flex", fontSize: 18, fontWeight: 700, letterSpacing: 1.5, color: accent }}>{offer.label}</div>
          <div style={{ display: "flex", fontSize: 50, fontWeight: 700, color: title, marginTop: 4, letterSpacing: -1 }}>{offer.price}</div>
          <div style={{ display: "flex", fontSize: 22, color: text2, marginTop: 2 }}>{offer.note}</div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
        <div style={{ display: "flex", width: 330, height: 560, background: "#1c1c1e", borderRadius: 48, padding: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, background: "#ffffff", borderRadius: 37, padding: "30px 16px 0", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} height={44} width={Math.round(44 * DEMO_STORE.logoRatio)} alt="" />
            <div style={{ display: "flex", fontSize: 13, color: "#71717a", marginTop: 4 }}>{DEMO_STORE_DISPLAY_URL}</div>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 12, justifyContent: "space-between" }}>
              {cards.map((c, i) => (
                <div
                  key={c.id}
                  style={{ display: "flex", flexDirection: "column", width: 136, border: "2px solid #e4e4e7", borderRadius: 8, marginBottom: 8, overflow: "hidden" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images[i]} width={132} height={132} style={{ objectFit: "cover", objectPosition: "top" }} alt="" />
                  <div style={{ display: "flex", flexDirection: "column", padding: "6px 8px", height: 58 }}>
                    <div style={{ display: "flex", fontSize: 11, color: "#71717a", fontWeight: 600 }}>{c.name}</div>
                    <div style={{ display: "flex", fontSize: 14, color: DEMO_STORE.themeColor, fontWeight: 700 }}>{brl(c.promoPrice ?? c.price)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}

import { ImageResponse } from "next/og";

export const alt = "Minha Loojinha - Venda no WhatsApp em Anápolis, Goiânia e região";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf8fc",
          background: "linear-gradient(135deg, #faf8fc 0%, #f3eef8 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#27003e",
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            Minha Loojinha
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#530083",
              marginBottom: 16,
            }}
          >
            Venda mais no WhatsApp
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#656fbe",
              fontWeight: 500,
            }}
          >
            Anápolis, Goiânia e região
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

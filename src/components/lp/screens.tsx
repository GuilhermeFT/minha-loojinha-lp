// Telas da vitrine, do carrinho, do WhatsApp, do painel e do Instagram desenhadas em HTML, fiéis
// à vitrine real (minha-loojinha-store: templates/classico, product-details, cart-view) e à ACME
// (https://minhaloojinha.com/acme). Dentro do celular vale a cor da loja (terracota da ACME); fora
// dele, a paleta da Minha Loojinha. Medida de 264px de largura (ver phone.tsx). Fotos e nomes vêm
// de src/content/demo-store.ts.

import Image from "next/image";
import { ArrowLeft, ChevronLeft, Minus, Plus, Search, ShoppingCart } from "lucide-react";
import {
  DEMO_DRESS,
  DEMO_ORDER,
  DEMO_ORDER_TOTAL,
  DEMO_PRODUCTS,
  DEMO_STORE,
  DEMO_STORE_DISPLAY_URL,
  brl,
  itemSuffix,
} from "@/content/demo-store";
import { cn } from "@/lib/utils";
import { TapRing } from "@/components/lp/phone";

const theme = { "--theme": DEMO_STORE.themeColor } as React.CSSProperties;

function StoreLogo({ height }: { height: number }) {
  return (
    <Image
      src={DEMO_STORE.logo}
      alt=""
      width={Math.round(height * DEMO_STORE.logoRatio)}
      height={height}
      style={{ height, width: "auto" }}
    />
  );
}

function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative text-zinc-600">
      <ShoppingCart className="size-[18px]" />
      <span className="absolute -right-2.5 -top-2 flex size-[15px] items-center justify-center rounded-full bg-[var(--theme)] text-[9px] font-semibold text-white">
        {count}
      </span>
    </span>
  );
}

function Price({ price, promo, className }: { price: number; promo: number | null; className?: string }) {
  return (
    <div className={className}>
      {promo !== null && <p className="text-[8.5px] text-zinc-400 line-through">{brl(price)}</p>}
      <p className="text-[11.5px] font-bold text-[var(--theme)]">{brl(promo ?? price)}</p>
    </div>
  );
}

/** Início da loja (template clássico): logo, bio, banner e grade de produtos com borda. */
export function StoreHomeScreen({ cartCount = 0, tapDress }: { cartCount?: number; tapDress?: boolean }) {
  return (
    <div className="h-full bg-white text-[#18181b]" style={theme}>
      <div className="flex items-center justify-between px-3.5 pb-2 pt-3">
        <StoreLogo height={34} />
        <div className="flex items-center gap-3 text-zinc-600">
          <Search className="size-[17px]" />
          <CartIcon count={cartCount} />
        </div>
      </div>
      <p className="px-3.5 pb-2 text-[9.5px] leading-snug text-zinc-700">{DEMO_STORE.bio}</p>
      <div className="relative mx-3.5 h-[74px] overflow-hidden rounded-md bg-zinc-100">
        <Image src={DEMO_STORE.banner} alt="" fill sizes="240px" className="object-cover" />
      </div>
      <p className="mt-3 px-3.5 text-[15px] font-bold text-zinc-500">Produtos</p>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5 px-3.5">
        {DEMO_PRODUCTS.slice(0, 4).map((card, i) => (
          <div key={card.id} className="relative overflow-hidden rounded-md border-2 border-zinc-200 bg-white">
            <span className="absolute right-1 top-1 z-10 rounded-sm bg-[var(--theme)] p-[3px]">
              <ShoppingCart className="size-2.5 text-white" />
            </span>
            <div className="relative aspect-square bg-zinc-100">
              <Image src={card.image} alt="" fill sizes="120px" className="object-cover object-top" />
              {i === 0 && tapDress && <TapRing className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
            </div>
            <div className="p-1.5">
              <p className="line-clamp-2 text-[9.5px] font-semibold leading-tight text-zinc-500">{card.name}</p>
              <Price price={card.price} promo={card.promoPrice} className="mt-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type ProductScreenProps = {
  colorIndex: number;
  size?: string | null;
  tap?: "color" | "size" | "buy" | null;
  /** Índice da cor que vai ser tocada (para o círculo de toque). */
  tapColor?: number;
};

/** Página da peça com variação: fotos da cor escolhida, cores com miniatura e tamanhos dela. */
export function ProductScreen({ colorIndex, size = null, tap = null, tapColor }: ProductScreenProps) {
  const color = DEMO_DRESS.options[colorIndex];
  return (
    <div className="flex h-full flex-col bg-white text-[#18181b]" style={theme}>
      <div className="flex items-center justify-between px-3.5 pb-2 pt-2.5">
        <span className="flex items-center gap-2">
          <ArrowLeft className="size-4 text-[var(--theme)]" />
          <StoreLogo height={24} />
        </span>
        <CartIcon count={0} />
      </div>
      <div className="px-3.5">
        <div className="relative h-[176px] overflow-hidden rounded-md bg-zinc-100">
          {DEMO_DRESS.options.map((c, i) => (
            <Image
              key={c.name}
              src={c.image}
              alt=""
              fill
              sizes="240px"
              className={cn("screen-step object-cover object-top", i === colorIndex ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
        <p className="mt-2 text-[13px] font-bold leading-tight">{DEMO_DRESS.name}</p>
        <p className="mt-0.5 text-[16px] font-bold text-[var(--theme)]">{brl(DEMO_DRESS.price)}</p>
        <p className="mt-1.5 text-[10.5px] font-medium">
          {DEMO_DRESS.variationLabel}: <span className="font-semibold">{color.name}</span>
        </p>
        <div className="mt-1 flex gap-1">
          {DEMO_DRESS.options.map((c, i) => (
            <span
              key={c.name}
              className={cn(
                "relative flex items-center gap-1 rounded-md border-2 p-[2px] pr-1.5 text-[9.5px] font-medium",
                i === colorIndex ? "border-[var(--theme)]" : "border-zinc-200",
              )}
            >
              <span className="relative size-[22px] overflow-hidden rounded-sm bg-zinc-100">
                <Image src={c.image} alt="" fill sizes="22px" className="object-cover object-top" />
              </span>
              {c.name}
              {tap === "color" && tapColor === i && <TapRing className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
            </span>
          ))}
        </div>
        <p className="mt-1.5 text-[10.5px] font-medium">Tamanho:</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {DEMO_DRESS.sizes.map((s) => {
            const out = color.stock[s] === 0;
            const selected = s === size;
            return (
              <span
                key={s}
                className={cn(
                  "relative rounded-md border-2 px-2 py-[2px] text-[10px] font-medium",
                  selected ? "border-[var(--theme)] bg-[var(--theme)] text-white" : "border-zinc-200",
                  out && "line-through opacity-50",
                )}
              >
                {s}
                {tap === "size" && s === "M" && <TapRing className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
              </span>
            );
          })}
        </div>
      </div>
      <div className="mt-auto flex gap-2.5 px-4 pb-4 pt-3 shadow-[0_-6px_16px_rgba(0,0,0,0.08)]">
        <span className="flex w-14 items-center justify-center rounded-lg border-2 border-[var(--theme)] text-[var(--theme)]">
          <ShoppingCart className="size-4" />
          <span className="text-[12px]">+</span>
        </span>
        <span className="relative flex-1 rounded-lg bg-[var(--theme)] py-2.5 text-center text-[12px] font-bold text-white">
          Comprar agora
          {tap === "buy" && <TapRing className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
        </span>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9.5px] font-medium text-zinc-600">{label}</p>
      <p className="mt-0.5 rounded-md border border-zinc-300 px-2 py-[5px] text-[10.5px]">{value}</p>
    </div>
  );
}

/** Carrinho: itens com cor e tamanho, dados (só nome e telefone) e retirada/entrega. */
export function CartScreen({ tapFinish }: { tapFinish?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-white text-[#18181b]" style={theme}>
      <div className="flex items-center gap-2 px-3.5 pb-2 pt-3">
        <ArrowLeft className="size-4 text-[var(--theme)]" />
        <span className="text-[17px] font-bold text-[var(--theme)]">Carrinho</span>
      </div>
      <div className="space-y-2.5 px-3.5">
        {DEMO_ORDER.items.map((item) => (
          <div key={item.name} className="flex gap-2">
            <span className="relative size-[50px] shrink-0 overflow-hidden rounded-md bg-zinc-100">
              <Image src={item.image} alt="" fill sizes="50px" className="object-cover object-top" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold">{item.name}</p>
              {item.variation && <p className="text-[9.5px] font-semibold text-zinc-500">{item.variation}</p>}
              <p className="text-[9.5px] text-zinc-500">
                Tamanho: <span className="font-semibold">{item.size}</span>
              </p>
              <p className="text-[10.5px] font-semibold">{brl(item.price)}</p>
            </div>
            <span className="flex h-6 items-center gap-2 self-start rounded-md bg-zinc-100 px-2 text-[10px]">
              <Minus className="size-2.5 text-[var(--theme)]" />1<Plus className="size-2.5 text-[var(--theme)]" />
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5 px-3.5">
        <p className="text-[11px] font-bold text-zinc-500">Seus dados</p>
        <Field label="Nome *" value={DEMO_ORDER.customerName} />
        <Field label="Telefone *" value={DEMO_ORDER.customerPhone} />
        <p className="pt-1 text-[11px] font-bold text-zinc-500">Entrega</p>
        <p className="flex items-center gap-1.5 text-[10.5px]">
          <span className="flex size-3 items-center justify-center rounded-full border-2 border-[var(--theme)]">
            <span className="size-1.5 rounded-full bg-[var(--theme)]" />
          </span>
          Retirada na loja
        </p>
        <p className="flex items-center gap-1.5 text-[10.5px] text-zinc-600">
          <span className="size-3 rounded-full border-2 border-zinc-300" />
          Entregar no endereço
        </p>
      </div>
      <div className="mt-auto flex items-center gap-3 px-4 pb-4 pt-3 shadow-[0_-6px_16px_rgba(0,0,0,0.08)]">
        <p className="text-[9px] font-medium leading-tight text-zinc-500">
          Valor total
          <br />
          <span className="text-[12px] font-bold text-[#18181b]">{brl(DEMO_ORDER_TOTAL)}</span> /2 items
        </p>
        <span className="relative flex-1 rounded-lg bg-[var(--theme)] py-2.5 text-center text-[12px] font-bold text-white">
          Finalizar Pedido
          {tapFinish && <TapRing className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />}
        </span>
      </div>
    </div>
  );
}

/** O texto do pedido como a vitrine monta (cart-view.tsx, formatWhatsAppMessage). */
export function OrderMessageLines() {
  return (
    <>
      <p>Olá! Gostaria de fazer um pedido:</p>
      <p className="mt-2">
        🔢 <b>Pedido #{DEMO_ORDER.number}</b>
      </p>
      <p className="mt-2">
        📦 <b>Produtos:</b>
      </p>
      {DEMO_ORDER.items.map((item) => (
        <p key={item.name}>
          • {item.qty}x {item.name}
          {itemSuffix(item)} - {brl(item.price)}
        </p>
      ))}
      <p className="mt-2">
        💰 <b>Total:</b> {brl(DEMO_ORDER_TOTAL)}
      </p>
      <p className="mt-2">
        👤 <b>Dados do Cliente:</b>
      </p>
      <p>Nome: {DEMO_ORDER.customerName}</p>
      <p>Telefone: {DEMO_ORDER.customerPhone}</p>
      <p className="mt-2">
        🚚 <b>Entrega:</b> {DEMO_ORDER.delivery}
      </p>
    </>
  );
}

/** O balão do pedido, como chega no WhatsApp da loja. */
export function OrderBubble({ className, animate }: { className?: string; animate?: boolean }) {
  return (
    <div
      className={cn(
        "relative max-w-[236px] rounded-lg rounded-tl-none bg-white px-2.5 pb-4 pt-1.5 text-[10.5px] leading-[1.38] text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]",
        animate && "msg-in",
        className,
      )}
    >
      <OrderMessageLines />
      <span className="absolute bottom-1 right-2 text-[8.5px] text-[#667781]">21:52</span>
    </div>
  );
}

/** Fundo de conversa do WhatsApp (pontilhado leve). */
export const chatBackground: React.CSSProperties = {
  backgroundColor: "#efeae2",
  backgroundImage: "radial-gradient(rgba(0,0,0,0.035) 1px, transparent 1px)",
  backgroundSize: "10px 10px",
};

/** Conversa no WhatsApp da loja com o pedido que acabou de chegar. */
export function WhatsAppScreen({ showMessage = true }: { showMessage?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 bg-[#008069] px-2.5 pb-2 pt-2 text-white">
        <ChevronLeft className="size-4" />
        <span className="flex size-7 items-center justify-center rounded-full bg-[#dfe5e7] text-[10px] font-bold text-[#54656f]">
          {DEMO_ORDER.customerName[0]}
        </span>
        <div className="leading-tight">
          <p className="text-[12px] font-semibold">{DEMO_ORDER.customerName}</p>
          <p className="text-[9px] opacity-80">online</p>
        </div>
      </div>
      <div className="flex-1 px-2.5 pt-3" style={chatBackground}>
        <p className="mx-auto w-fit rounded-md bg-white/90 px-2 py-0.5 text-[9px] text-[#54656f] shadow-sm">HOJE</p>
        {showMessage && <OrderBubble animate className="mt-2.5" />}
      </div>
    </div>
  );
}

/** Painel (Stitch): cadastro de uma peça com variação, cor e estoque por tamanho. */
export function PanelScreen() {
  const first = DEMO_DRESS.options[0];
  return (
    <div className="flex h-full flex-col bg-[#fcf8fb] text-[#1c1c1e]">
      <div className="flex items-center justify-between border-b border-[#e5e5ea] bg-white px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 text-[13px] font-extrabold text-[#340055]">
          <ArrowLeft className="size-4" /> Nova peça
        </span>
        <span className="rounded-full bg-[#f2daff] px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wide text-[#530083]">
          Rascunho
        </span>
      </div>
      <div className="space-y-2.5 overflow-hidden px-3.5 pt-3">
        <div className="flex gap-1.5">
          {DEMO_DRESS.options.map((c, i) => (
            <span key={c.name} className="relative h-[92px] flex-1 overflow-hidden rounded-xl bg-zinc-100">
              <Image src={c.image} alt="" fill sizes="110px" className="object-cover object-top" />
              <span className="absolute inset-x-1 bottom-1 truncate rounded-md bg-white/95 px-1 py-[1px] text-center text-[8.5px] font-semibold text-[#340055]">
                {i === 0 ? "Capa · " : ""}
                {c.name}
              </span>
            </span>
          ))}
        </div>
        <PanelField label="Nome da peça" value={DEMO_DRESS.name} />
        <PanelField label="Preço" value={brl(DEMO_DRESS.price)} />
        <div>
          <p className="text-[10px] font-semibold text-[#340055]">{DEMO_DRESS.variationLabel}</p>
          <div className="mt-1 flex gap-1">
            {DEMO_DRESS.options.map((c, i) => (
              <span
                key={c.name}
                className={cn(
                  "rounded-full border px-2 py-[3px] text-[9.5px] font-semibold",
                  i === 0 ? "border-[#f2daff] bg-[#f2daff] text-[#530083]" : "border-[#e5e5ea] bg-white text-[#636366]",
                )}
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-[#340055]">Tamanhos e estoque · {first.name}</p>
          <div className="mt-1 grid grid-cols-5 gap-1">
            {DEMO_DRESS.sizes.map((s) => (
              <span key={s} className="rounded-lg border border-[#e5e5ea] bg-white py-1 text-center">
                <span className="block text-[8.5px] font-semibold text-[#636366]">{s}</span>
                <span className="block text-[12px] font-bold">{first.stock[s]}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto px-3.5 pb-4 pt-3">
        <span className="block rounded-full bg-[#530083] py-2.5 text-center text-[12px] font-bold text-white">Salvar peça</span>
      </div>
    </div>
  );
}

function PanelField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-[#340055]">{label}</p>
      <p className="mt-0.5 truncate rounded-xl border-[1.5px] border-[#e5e5ea] bg-white px-2 py-1.5 text-[10.5px]">{value}</p>
    </div>
  );
}

/** Perfil de Instagram genérico (sem marca) com o link da loja na bio. */
export function BioScreen() {
  const posts = DEMO_PRODUCTS.slice(0, 6).map((p) => p.image);
  return (
    <div className="h-full bg-white text-[#18181b]">
      <div className="flex items-center px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 text-[13px] font-bold">
          <ArrowLeft className="size-4" /> {DEMO_STORE.slug}.moda
        </span>
      </div>
      <div className="flex items-center gap-3.5 px-3.5">
        <span className="flex size-[62px] shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white p-1.5">
          <StoreLogo height={22} />
        </span>
        <div className="min-w-0 space-y-0.5">
          <p className="text-[12.5px] font-bold">{DEMO_STORE.name}</p>
          <p className="line-clamp-3 text-[9.5px] leading-snug text-zinc-700">{DEMO_STORE.bio}</p>
        </div>
      </div>
      <div className="mx-3.5 mt-2.5 rounded-lg bg-[#f2daff]/60 px-2 py-1.5 ring-2 ring-[#530083]">
        <p className="text-[9.5px] text-zinc-600">Pedidos pelo link:</p>
        <p className="text-[11.5px] font-semibold text-[#00376b]">{DEMO_STORE_DISPLAY_URL}</p>
      </div>
      <div className="mt-2.5 flex gap-1.5 px-3.5">
        <span className="flex-1 rounded-md bg-[#0095f6] py-1.5 text-center text-[10.5px] font-semibold text-white">Seguir</span>
        <span className="flex-1 rounded-md bg-zinc-100 py-1.5 text-center text-[10.5px] font-semibold">Mensagem</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-[2px]">
        {posts.map((src, i) => (
          <span key={i} className="relative aspect-square bg-zinc-100">
            <Image src={src} alt="" fill sizes="90px" className="object-cover object-top" />
          </span>
        ))}
      </div>
    </div>
  );
}

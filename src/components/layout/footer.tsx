import Link from "next/link";
import Image from "next/image";
import logoDark from "@/assets/minhaloojinha-logo-dark.svg";
import { FooterCta } from "@/components/footer-cta";

export function Footer() {
  return (
    <footer style={{ background: "var(--color-surface-dark)" }}>
      <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={logoDark}
                alt="Minha Loojinha"
                className="h-7 w-auto"
                width={120}
                height={28}
              />
            </Link>
            <p className="mt-3 text-sm text-white/60">
              Catálogo estruturado para WhatsApp. Pedidos organizados, estoque
              automático.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white/90">Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li>
                <Link
                  href="/#beneficios"
                  className="transition-colors hover:text-white"
                >
                  Benefícios
                </Link>
              </li>
              <li>
                <Link
                  href="/#preco"
                  className="transition-colors hover:text-white"
                >
                  Preço
                </Link>
              </li>
              <li>
                <Link
                  href="/#duvidas"
                  className="transition-colors hover:text-white"
                >
                  Dúvidas frequentes
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="transition-colors hover:text-white"
                >
                  Enviar feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="transition-colors hover:text-white"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-de-uso"
                  className="transition-colors hover:text-white"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <FooterCta />
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          © {new Date().getFullYear()} Minha Loojinha. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}

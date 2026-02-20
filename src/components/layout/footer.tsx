import Link from "next/link";
import Image from "next/image";
import logoLight from "@/assets/minhaloojinha-logo-light.svg";
import logoDark from "@/assets/minhaloojinha-logo-dark.svg";
import { WaitlistForm } from "@/components/forms/waitlist-form";
import { FooterCta } from "@/components/footer-cta";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30">
      <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={logoLight}
                alt="Minha Loojinha"
                className="h-7 w-auto dark:hidden"
                width={120}
                height={28}
              />
              <Image
                src={logoDark}
                alt="Minha Loojinha"
                className="hidden h-7 w-auto dark:block"
                width={120}
                height={28}
              />
            </Link>
            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
              Catálogo estruturado para WhatsApp. Pedidos organizados, estoque
              automático.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--foreground)]">Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
              <li>
                <Link href="/#beneficios" className="hover:underline">
                  Benefícios
                </Link>
              </li>
              <li>
                <Link href="/#preco" className="hover:underline">
                  Preço
                </Link>
              </li>
              <li>
                <Link href="/#duvidas" className="hover:underline">
                  Dúvidas frequentes
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:underline">
                  Enviar feedback
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="hover:underline">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="hover:underline">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <FooterCta />
          </div>
        </div>
        <div className="mt-10 border-t border-[hsl(var(--border))] pt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
          © {new Date().getFullYear()} Minha Loojinha. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}

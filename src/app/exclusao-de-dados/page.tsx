import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Exclusão de dados | Minha Loojinha",
  description:
    "Como apagar os dados da sua conta Minha Loojinha e da conexão com o Facebook, Instagram e WhatsApp.",
};

const SUPPORT_EMAIL = "guilherme@minhaloojinha.com.br";
const SUPPORT_WHATSAPP_URL = `https://wa.me/5566992433225?text=${encodeURIComponent(
  "Oi! Quero apagar os dados da minha conta na Minha Loojinha."
)}`;

export default function ExclusaoDeDadosPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
        Exclusão de dados
      </h1>
      <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
        Última atualização: outubro de 2026
      </p>

      <div className="mt-8">
        <section className="mt-6 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            1. Desconectar o Facebook, Instagram e WhatsApp
          </h2>
          <p>
            Se você conectou o seu catálogo da Meta à Minha Loojinha, pode
            desfazer a conexão de dois jeitos. Nos dois casos apagamos na hora o
            acesso que a Meta nos deu e os registros da conexão.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Pelo painel:</strong> entre no painel, abra{" "}
              <strong>Instagram e WhatsApp</strong> e toque em{" "}
              <strong>Desconectar</strong>.
            </li>
            <li>
              <strong>Pela Meta:</strong> no Meta Business Suite, vá em{" "}
              <strong>
                Configurações do negócio › Integrações › Apps conectados
              </strong>
              , escolha <strong>Minha Loojinha</strong> e remova o app.
            </li>
          </ul>
          <p>
            Os produtos que já foram enviados continuam no seu catálogo da Meta,
            porque o catálogo é seu. Você pode apagá-los ou apagar o catálogo
            inteiro no Gerenciador de Commerce da Meta.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            2. O que guardamos da conexão com a Meta
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>o identificador da sua conta e do seu negócio na Meta;</li>
            <li>o identificador e o nome do catálogo conectado;</li>
            <li>o código de acesso ao catálogo, guardado criptografado;</li>
            <li>
              a lista dos produtos enviados ao catálogo e os avisos de erro de
              cada um.
            </li>
          </ul>
          <p>
            Não recebemos sua senha do Facebook, suas mensagens, seus seguidores
            nem dados das suas clientes.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            3. Apagar a conta inteira
          </h2>
          <p>
            Para apagar sua conta, sua loja e todos os dados ligados a elas
            (produtos, fotos, pedidos e a conexão com a Meta), peça pelo{" "}
            <a
              href={SUPPORT_WHATSAPP_URL}
              className="font-medium text-[var(--foreground)] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp de suporte
            </a>{" "}
            ou pelo e-mail{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-medium text-[var(--foreground)] underline"
            >
              {SUPPORT_EMAIL}
            </a>
            , usando o mesmo e-mail da conta. Confirmamos o pedido e apagamos
            tudo em até 15 dias. Só guardamos o que a lei exige, como registros
            de cobrança.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            4. Mais informações
          </h2>
          <p>
            Veja como tratamos seus dados na{" "}
            <Link
              href="/politica-de-privacidade"
              className="font-medium text-[var(--foreground)] underline"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

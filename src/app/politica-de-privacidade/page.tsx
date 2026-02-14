import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Minha Loojinha",
  description: "Política de Privacidade do Minha Loojinha.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
        Política de Privacidade
      </h1>
      <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
        Última atualização: fevereiro de 2025
      </p>

      <div className="mt-8">
        <section className="mt-6 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            1. Quem somos
          </h2>
          <p>
            O Minha Loojinha (&quot;nós&quot;, &quot;nosso&quot;) é o
            responsável pelo tratamento dos seus dados pessoais nesta
            plataforma, em conformidade com a Lei Geral de Proteção de Dados
            (LGPD - Lei 13.709/2018).
          </p>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            2. Dados que coletamos
          </h2>
          <p>Podemos coletar os seguintes dados:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Formulários (site):</strong> nome e e-mail quando você
              se cadastra na lista de espera ou em formulários de contato.
            </li>
            <li>
              <strong>Assinatura e pagamento:</strong> dados de pagamento
              (processados pelo provedor de pagamento), e-mail e nome associados à conta e à
              cobrança.
            </li>
            <li>
              <strong>Uso do serviço:</strong> dados de acesso, uso do
              catálogo e do produto, quando aplicável.
            </li>
            <li>
              <strong>Cookies e tecnologias semelhantes:</strong> para
              funcionamento do site e, se houver, analytics.
            </li>
          </ul>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            3. Finalidade e base legal
          </h2>
          <p>
            Usamos os dados para: prestar o serviço, processar pagamentos,
            enviar comunicações sobre a conta e ofertas (com base no
            consentimento ou no legítimo interesse), melhorar o site e o
            produto e cumprir obrigações legais. A base legal inclui execução de
            contrato, consentimento e legítimo interesse, conforme o caso.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            4. Compartilhamento
          </h2>
          <p>
            Podemos compartilhar dados com: (a) processador de pagamentos
            de pagamento, para cobrança; (b) ferramentas de e-mail e infraestrutura
            (quando aplicável); (c) autoridades quando exigido por lei. Não
            vendemos seus dados pessoais.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            5. Retenção
          </h2>
          <p>
            Mantemos os dados pelo tempo necessário para as finalidades
            descritas, para cumprimento de obrigações legais e para exercício ou
            defesa de direitos.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            6. Seus direitos
          </h2>
          <p>
            Você pode, em conformidade com a LGPD: acessar e corrigir seus
            dados; solicitar anonimização, bloqueio ou eliminação de dados
            desnecessários; revogar consentimento; solicitar portabilidade e
            informações sobre o tratamento. Para exercer esses direitos, entre
            em contato conosco (e-mail ou canal indicado no site).
          </p>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            7. Segurança e alterações
          </h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger seus
            dados. Esta política pode ser atualizada; alterações relevantes
            serão comunicadas quando necessário.
          </p>
        </section>

        <section className="mt-8 space-y-4 text-[hsl(var(--muted-foreground))]">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            8. Contato
          </h2>
          <p>
            Dúvidas ou pedidos relacionados a esta política e aos seus dados
            pessoais: utilize o canal de contato disponível no site (e-mail ou
            formulário).
          </p>
        </section>
      </div>
    </div>
  );
}

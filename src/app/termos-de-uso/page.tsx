import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | Minha Loojinha",
  description: "Termos de Uso do Minha Loojinha.",
};

export default function TermosDeUsoPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
        Termos de Uso
      </h1>
      <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
        Última atualização: fevereiro de 2025
      </p>

      <div className="mt-8 space-y-8 text-[hsl(var(--muted-foreground))]">
        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            1. Aceitação
          </h2>
          <p className="mt-2">
            Ao acessar o site e/ou utilizar o serviço Minha Loojinha
            (&quot;Serviço&quot;), você concorda com estes Termos de Uso. Se
            não concordar, não utilize o Serviço.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            2. Descrição do Serviço
          </h2>
          <p className="mt-2">
            O Minha Loojinha oferece uma plataforma para criação e gestão de
            catálogo de produtos voltado a vendas via WhatsApp, com pedidos
            estruturados, controle de estoque e integrações de pagamento, entre
            outras funcionalidades oferecidas conforme o plano contratado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            3. Cadastro e período de teste
          </h2>
          <p className="mt-2">
            O uso do Serviço pode estar condicionado ao cadastro e à aceitação
            destes Termos. Ofertas promocionais, como período de teste gratuito
            (ex.: 90 dias), serão informadas no site no momento da oferta. Ao
            final do período de teste, a assinatura poderá ser cobrada
            automaticamente, salvo cancelamento prévio pelo usuário.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            4. Cobrança e pagamento
          </h2>
          <p className="mt-2">
            Os valores, periodicidade e condições de cobrança são os informados
            no site no momento da contratação. O pagamento é processado por
            terceiros (provedor de pagamento). O usuário é responsável por manter dados
            de pagamento válidos. Falhas de cobrança podem resultar em
            suspensão ou cancelamento do acesso ao Serviço.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            5. Cancelamento
          </h2>
          <p className="mt-2">
            O usuário pode cancelar a assinatura a qualquer momento, pelos
            meios disponibilizados (ex.: área logada ou contato). O acesso
            permanece até o fim do período já pago. Não há reembolso de valores
            já cobrados, salvo disposição em contrário na oferta ou na lei.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            6. Uso aceitável
          </h2>
          <p className="mt-2">
            O usuário compromete-se a utilizar o Serviço de forma lícita, sem
            violar direitos de terceiros nem leis aplicáveis. É proibido uso
            para atividades ilegais, abusivas, fraudulentas ou que prejudiquem a
            infraestrutura ou a experiência de outros usuários. Reservamo-nos
            o direito de suspender ou encerrar contas em caso de violação.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            7. Propriedade intelectual
          </h2>
          <p className="mt-2">
            O Minha Loojinha e seu conteúdo (marcas, textos, layout, software)
            são de nossa propriedade ou de nossos licenciadores. O usuário não
            adquire direitos sobre a plataforma, exceto o direito de uso nos
            termos aqui previstos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            8. Limitação de responsabilidade
          </h2>
          <p className="mt-2">
            O Serviço é oferecido &quot;como está&quot;, dentro das
            possibilidades técnicas e legais. Não nos responsabilizamos por
            danos indiretos, lucros cessantes ou perda de dados decorrentes do
            uso ou da indisponibilidade do Serviço, na máxima extensão permitida
            pela lei.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            9. Alterações
          </h2>
          <p className="mt-2">
            Podemos alterar estes Termos e as condições do Serviço. Alterações
            relevantes serão comunicadas por e-mail ou aviso no site. O uso
            continuado após a vigência da alteração constitui aceitação.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            10. Lei aplicável e foro
          </h2>
          <p className="mt-2">
            Estes Termos regem-se pelas leis da República Federativa do Brasil.
            Eventuais disputas serão submetidas ao foro da comarca do domicílio
            do usuário, com renúncia a qualquer outro, por mais privilegiado que
            seja.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            11. Contato
          </h2>
          <p className="mt-2">
            Para dúvidas sobre estes Termos ou o Serviço, utilize o canal de
            contato indicado no site.
          </p>
        </section>
      </div>
    </div>
  );
}

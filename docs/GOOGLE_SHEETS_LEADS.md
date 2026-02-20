# Configurar Google Sheets para receber leads

Este guia explica como configurar o Google Cloud e uma planilha no Google Sheets para que a aplicação envie os leads (nome, e-mail, telefone e data) automaticamente.

## 1. Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto ou selecione um existente (menu do projeto no topo).
3. No menu lateral, vá em **APIs e serviços** > **Biblioteca**.
4. Pesquise por **Google Sheets API** e ative.
5. (Opcional) Se for criar a planilha via API no futuro, ative também **Google Drive API**.

## 2. Credenciais (Service Account)

1. No menu lateral: **APIs e serviços** > **Credenciais**.
2. Clique em **+ Criar credenciais** e escolha **Conta de serviço**.
3. Dê um nome (ex.: `minha-loojinha-leads`) e clique em **Criar e continuar** (pode pular as etapas de permissões).
4. Na lista de contas de serviço, clique na que você criou.
5. Aba **Chaves**: **Adicionar chave** > **Criar nova chave** > **JSON** > **Criar**. O arquivo JSON será baixado.
6. No JSON baixado, anote:
   - **`client_email`**: algo como `nome@projeto.iam.gserviceaccount.com`
   - **`private_key`**: o bloco completo entre `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----` (incluindo essas linhas).

Guarde o JSON em local seguro e nunca o envie para repositórios públicos.

## 3. Planilha no Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com/) e crie uma nova planilha (ou use uma existente).
2. Na primeira aba (onde ficam os leads), na primeira linha, defina os cabeçalhos (recomendado):

   | A     | B     | C        | D    |
   |-------|-------|----------|------|
   | Nome  | Email | Telefone | Data |

   Os novos leads serão adicionados nas linhas seguintes (colunas A–D).

3. Para receber feedback da página “Enviar feedback”, crie uma **segunda aba** na mesma planilha: clique no **+** no canto inferior e renomeie a nova aba para **Feedback**. Na primeira linha dessa aba, use por exemplo:

   | A          | B    |
   |------------|------|
   | Comentário | Data |

   Os envios de feedback serão adicionados nas linhas seguintes dessa aba. Assim os leads e o feedback não se misturam e nada é sobrescrito.

4. Copie o **ID da planilha** na URL do navegador:
   - A URL é da forma: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`
   - O trecho `<SHEET_ID>` é o valor que você usará na variável `SHEET_ID`.

## 4. Compartilhar a planilha com a Service Account

1. Na planilha, clique em **Compartilhar**.
2. No campo de e-mail, cole o **`client_email`** da conta de serviço (ex.: `xxx@yyy.iam.gserviceaccount.com`).
3. Defina a permissão como **Editor** (para a API poder adicionar linhas).
4. Desmarque “Notificar pessoas” se não quiser enviar e-mail para a conta de serviço.
5. Confirme com **Compartilhar** / **Enviar**.

Sem esse passo, a API não conseguirá gravar na planilha.

## 5. Variáveis de ambiente na aplicação

No arquivo `.env` (ou `.env.local`) do projeto, configure:

```env
# App
NEXT_PUBLIC_URL="https://seudominio.com"

# Google Sheets (leads)
GOOGLE_CLIENT_EMAIL="o_client_email_do_json_da_conta_de_serviço"
SHEET_ID="id_da_planilha_copiado_da_url"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

- **GOOGLE_CLIENT_EMAIL**: valor de `client_email` do JSON.
- **SHEET_ID**: ID da planilha (URL: `/d/<SHEET_ID>/edit`).
- **GOOGLE_PRIVATE_KEY**: valor de `private_key` do JSON.

### Formato do `GOOGLE_PRIVATE_KEY`

- Cole a chave inteira, incluindo as linhas `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----`.
- As quebras de linha dentro da chave podem ser:
  - Literais (Enter) no `.env`, ou
  - Sequência `\n` (barra invertida + n) em ambientes que exigem tudo em uma linha.

Em alguns provedores (Vercel, Railway, etc.), use `\n` para cada quebra de linha dentro da chave, por exemplo:

```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----"
```

## 6. Testar

1. Reinicie o servidor da aplicação após alterar o `.env`.
2. Preencha o formulário “Garantir minha vaga” (ou lista de espera) no site.
3. Confira na planilha se uma nova linha foi adicionada com Nome, Email, Telefone e Data.

Se nada aparecer, verifique:

- A planilha foi compartilhada com o e-mail da conta de serviço como **Editor**?
- O `SHEET_ID` está correto (mesmo ID da URL da planilha)?
- As variáveis estão no `.env` sem aspas extras ou espaços indesejados no início/fim?

## Resumo das variáveis e abas

| Variável              | Onde obter |
|-----------------------|------------|
| `GOOGLE_CLIENT_EMAIL` | JSON da conta de serviço, campo `client_email` |
| `GOOGLE_PRIVATE_KEY`  | JSON da conta de serviço, campo `private_key` |
| `SHEET_ID`            | URL da planilha: `/d/<SHEET_ID>/edit` |
| `NEXT_PUBLIC_URL`     | URL pública do site (ex.: `https://minhaloojinha.com`) |

Não é mais necessária a variável `NEXT_PUBLIC_CHECKOUT_URL`; os leads passam apenas para a planilha e o contato é feito depois por você.

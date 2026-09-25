# Prismma Saúde Integrativa

Site institucional com Next.js 15 (App Router), React 19, TypeScript, Prisma 6 e PostgreSQL. Conteúdo no banco; estrutura e apresentação no código.

## Setup

Use Node.js compatível com Next.js 15 e Yarn Classic (1.x). O projeto utiliza `yarn.lock`.

```bash
yarn install --frozen-lockfile
cp .env.example .env
```

Configure `.env` antes de continuar:

| Variável | Uso |
| --- | --- |
| `DATABASE_URL` | Conexão PostgreSQL usada pelo Prisma e pela aplicação. Substitua os placeholders do exemplo. |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site, inicialmente `http://localhost:3000`. Preparada para a futura fase de SEO; ainda não consumida pelo código. |

Nunca versione credenciais. Para desenvolvimento, aponte para um banco isolado. O exemplo usa TLS (`sslmode=require`); ajuste conforme a configuração do seu PostgreSQL local.

```bash
yarn db:generate
yarn db:push
yarn db:seed
yarn dev
```

A aplicação fica disponível em `http://localhost:3000`.

## Banco e atualização de schema

O schema está em `prisma/schema.prisma`. `prisma.config.ts` carrega `.env` e registra o seed. A aplicação consulta PostgreSQL diretamente pelo Prisma; Neon pode ser o provedor, mas não é obrigatório.

O projeto ainda não possui histórico de migrations. `yarn db:push` sincroniza o schema de um banco de desenvolvimento vazio, sem reset. Em um banco existente, revise as alterações e teste em uma cópia isolada antes de aplicá-las. Para operações de schema no Neon, utilize conexão direta, sem pool. Não use `--accept-data-loss` ou reset para contornar problemas.

Para atualizar um banco que ainda possui o schema anterior à Fase 1, revise e execute uma única vez o SQL aditivo (envolvido em transação):

```bash
yarn prisma db execute --schema prisma/schema.prisma --file prisma/phase1-upgrade.sql
yarn db:generate
yarn db:seed
```

Esse arquivo evita a confirmação genérica de possível perda de dados que `db:push` emite ao criar os índices únicos em tabelas preenchidas. As novas colunas começam nulas; os índices permitem múltiplos nulos. Não execute esse SQL em um banco que já recebeu a Fase 1. Ele documenta esta atualização pontual, sem estabelecer um histórico Prisma Migrate.

A Fase 1 adiciona `SiteSettings`, `BrandAsset.updatedAt` (com valor inicial para registros existentes) e `seedKey` opcional e única em FAQ e cards. As chaves opcionais permitem manter registros antigos e textos repetidos sem impor novas restrições aos textos. As consultas da Home continuam compatíveis.

`neon.ts` contém apenas uma configuração vazia para as ferramentas Neon. `@neon/config` é usado nesse arquivo; `@neon/env` não é utilizado pelo código atual. Esses recursos foram preservados e não são necessários para executar a aplicação com `DATABASE_URL`. O vínculo local `.neon` permanece ignorado pelo Git.

## Comentários do banco

Os comentários `///` em `prisma/schema.prisma` documentam tabelas e campos. O gerador de desenvolvimento [`@onozaty/prisma-db-comments-generator`](https://github.com/onozaty/prisma-db-comments-generator) converte essa documentação em SQL `COMMENT ON` ao executar `yarn db:generate`. Use `///`, não `@comment`.

Os scripts ficam em `prisma/comments/<timestamp>_update_comments/migration.sql`. Essa pasta é separada de `prisma/migrations`, pois o projeto ainda usa `db:push` e o SQL pontual da Fase 1. Versione os SQLs e `comments-latest.json`: o JSON registra o último estado **gerado**, não o que foi aplicado em cada banco, e permite gerar somente as diferenças. Gerar novamente sem mudar os comentários não cria outro SQL.

Depois de criar/atualizar o schema do banco, revise e aplique os scripts pendentes em ordem cronológica. Para o primeiro conjunto:

```bash
yarn prisma db execute --schema prisma/schema.prisma --file prisma/comments/20260925174326_update_comments/migration.sql
```

Esse comando usa a conexão configurada em `DATABASE_URL`. `db:generate`, `db:push` e o seed não aplicam os comentários automaticamente. Em cada banco novo, aplique todos os scripts de comentários depois da criação das tabelas; em bancos existentes, acompanhe quais scripts já foram aplicados. O gerador não controla esse histórico no banco. Reaplicar um script `COMMENT ON` define novamente os mesmos comentários, mas reaplicar scripts antigos isoladamente pode restaurar textos antigos.

## Seed

```bash
yarn db:seed
```

O seed inicializa três protocolos, quatro cards, seis perguntas e as configurações com `id = main`, marca `Prismma Saúde Integrativa`, profissional `Fabio Leandro` e papel `Enfermeiro | PhD`, conforme o plano. Não cria depoimentos nem contatos fictícios.

Execuções repetidas preservam conteúdo existente: protocolos usam `upsert` por `slug`, configurações por `id` e FAQ/cards usam `seedKey`. Essas chaves não devem ser alteradas nas edições de conteúdo. Registros do seed anterior são reconhecidos pela pergunta/título original e recebem somente a chave, preservando seus IDs e demais campos. Duplicatas preexistentes não são apagadas; se houver várias correspondências, a mais antiga recebe a chave. Se a pergunta/título já tiver sido alterada antes da primeira execução deste seed, associe a `seedKey` correspondente manualmente para evitar criar uma nova entrada.

A execução é atômica, em transação serializável. Em caso de conflito com outra execução, a transação falha sem gravar parcialmente; execute novamente. Alterar os textos neste arquivo não sobrescreve conteúdo já cadastrado: edite o banco com ferramentas apropriadas, como `yarn prisma studio`.

## Validação e build

```bash
yarn db:generate
yarn prisma validate
yarn lint
yarn build
yarn start
```

`yarn start` serve o build de produção. A Home é dinâmica e precisa de conexão com o banco durante o atendimento das requisições.

## Conteúdo dinâmico e provisório

A Home já está dividida em componentes e usa `lib/home-content.ts` para consultar protocolos e cards ativos, FAQ ativa e somente depoimentos com status `PUBLISHED`. O modelo `BrandAsset` ainda não é consumido pela interface.

`SiteSettings` está preparado no banco, mas a interface ainda utiliza `lib/site.ts`. Conectar essas configurações à Home pertence à próxima fase, assim como revisar o helper de WhatsApp.

Antes da publicação, confirme os contatos provisórios em `lib/site.ts` (WhatsApp, e-mail e Instagram), substitua as imagens Unsplash e o símbolo provisório por materiais aprovados. Fotos genéricas não representam Fabio. Textos sobre protocolos, formação, modalidades, local e oito sessões precisam de aprovação profissional; o seed preserva o conteúdo inicial e não constitui validação dessas informações.

# Refatoração Prismma — Design e Arquitetura

## Status

Fase 1 concluída em 25/09/2026 na branch `refact/design-1`.

- Ambiente e README alinhados com PostgreSQL e Yarn; artefato TypeScript removido do Git.
- `SiteSettings` e `BrandAsset.updatedAt` adicionados; seed idempotente com preservação de edições.
- FAQ/cards usam `seedKey` opcional e única, com reconhecimento dos textos originais do seed anterior.
- Atualização de bancos existentes documentada no README e em `prisma/phase1-upgrade.sql`.
- Validações aprovadas: `yarn db:generate`, `yarn prisma validate`, `yarn lint` e `yarn build`.
- PostgreSQL local descartável: atualização do schema anterior com dados, preservação de IDs/edições e repetição do seed em banco existente e vazio verificadas.
- Nenhuma alteração aplicada ao banco remoto. A aplicação do schema nesse ambiente permanece pendente.

Fase 2 concluída em 25/09/2026 na mesma branch. Os componentes existentes e `lib/home-content.ts` foram preservados e integrados a `SiteSettings.main`, conforme o registro detalhado abaixo. A Fase 3 não foi iniciada.

Branch de trabalho:

```text
refact/design-1
```

Objetivo:

Refatorar a implementação inicial da Prismma Saúde Integrativa para obter uma base organizada, responsiva, performática e preparada para conteúdo dinâmico, sem transformar o projeto em um CMS complexo.

---

# Estado inicial (histórico anterior às fases concluídas)

A implementação atual possui:

- Next.js App Router;
- React;
- TypeScript;
- Prisma;
- PostgreSQL;
- uma Home institucional;
- conteúdo parcialmente armazenado no banco.

Os principais modelos atuais são:

```text
Protocol
Testimonial
Faq
InstitutionalCard
BrandAsset
```

A Home consulta:

- protocolos ativos;
- cards institucionais ativos;
- FAQ ativa;
- depoimentos publicados.

---

# Problemas identificados no planejamento original (histórico)

## Fundação

- `.env.example` aponta para SQLite apesar do Prisma utilizar PostgreSQL.
- `README.md` ainda menciona SQLite.
- `tsconfig.tsbuildinfo` está versionado.
- `.gitignore` está incompleto.
- README usa comandos npm enquanto existe `yarn.lock`.
- configuração Neon deve ser revisada para verificar se é realmente utilizada.

## Arquitetura

- praticamente toda a Home está em `app/page.tsx`;
- componentes visuais conhecem indiretamente detalhes de persistência;
- não existe camada simples de queries;
- contatos estão hardcoded;
- WhatsApp está hardcoded;
- `BrandAsset` existe mas ainda não é utilizado;
- não existe `SiteSettings`.

## Design

- todo CSS está concentrado em `app/globals.css`;
- fontes são importadas por `@import`;
- navegação mobile desaparece em vez de possuir menu;
- imagens ainda são provisórias;
- logo atual é provisório.

## SEO

Atualmente há basicamente:

```text
title
description
```

Ainda faltam:

- metadata completa;
- canonical;
- Open Graph;
- robots;
- sitemap;
- structured data.

---

# Princípio da refatoração

Manter:

> Conteúdo no banco. Estrutura no código.

Não construir CMS genérico.

Não introduzir arquitetura desnecessariamente complexa.

---

# Fase 1 — Fundação

## Objetivo

Corrigir inconsistências da base antes de alterar arquitetura ou aparência.

### `.env.example`

Trocar configuração SQLite por exemplo PostgreSQL.

Adicionar:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Nunca adicionar credenciais reais.

---

### `.gitignore`

Adicionar pelo menos:

```text
node_modules/
.next/
out/

.env
.env.local
.env.*.local

*.tsbuildinfo

prisma/*.db
prisma/*.db-journal

.vercel/
.neon/

.DS_Store
```

---

### `tsconfig.tsbuildinfo`

Remover do Git.

O arquivo é gerado automaticamente pelo TypeScript.

---

### `README.md`

Atualizar stack para:

```text
Next.js
React
TypeScript
Prisma
PostgreSQL
```

Remover referência a SQLite.

Padronizar comandos para Yarn enquanto `yarn.lock` for utilizado.

Documentar:

- setup;
- banco;
- variáveis;
- seed;
- build;
- conteúdo dinâmico;
- conteúdo ainda provisório.

---

### `prisma/schema.prisma`

Adicionar:

```prisma
model SiteSettings {
  id               String   @id @default("main")
  brandName        String
  professionalName String
  professionalRole String?
  whatsapp         String?
  email            String?
  instagramUrl     String?
  bookingUrl       String?
  address          String?
  heroTitle        String?
  heroDescription  String?
  seoTitle         String?
  seoDescription   String?
  updatedAt        DateTime @updatedAt
}
```

Adicionar `updatedAt` ao `BrandAsset`.

Avaliar chaves naturais para entidades utilizadas pelo seed.

Não alterar ainda a estrutura visual.

---

### `prisma/seed.ts`

Transformar seed em idempotente.

Protocolos devem utilizar:

```text
slug
```

como chave para `upsert`.

FAQ e cards devem possuir estratégia que permita executar o seed novamente sem duplicação.

Adicionar `SiteSettings` inicial com:

```text
id = main
brandName = Prismma Saúde Integrativa
professionalName = Fabio Leandro
professionalRole = Enfermeiro | PhD
```

Não adicionar telefone, e-mail ou Instagram fictícios.

---

## Critérios de conclusão da Fase 1

Executar:

```bash
yarn db:generate
yarn lint
yarn build
```

A Fase 1 termina somente quando:

- configuração PostgreSQL estiver coerente;
- seed for seguro para múltiplas execuções;
- README estiver atualizado;
- artefatos gerados não estiverem versionados;
- schema estiver válido;
- lint/build não apresentarem erros introduzidos pela refatoração.

Não iniciar a Fase 2 automaticamente.

---

# Fase 2 — Arquitetura e integração da Home (concluída)

## Implementação realizada

- Preservados os componentes já extraídos, a composição em `app/page.tsx` e as consultas em `lib/home-content.ts`; nenhum arquivo foi movido por organização.
- Adicionada ao `Promise.all` a consulta `siteSettings.findUnique({ where: { id: 'main' }, select: ... })`, apenas com campos consumidos pela Home.
- Criado o tipo explícito `PublicSiteSettings` junto à query; componentes recebem props e não acessam Prisma.
- Removido `siteConfig`; `lib/site.ts` mantém navegação estrutural. Header foi revisado e permanece sem settings, pois usa somente a marca visual estrutural, `mainNav` e o CTA `#contato`.
- Brand mantém a apresentação provisória “PRISMMA / SAÚDE INTEGRATIVA”, sem alterar o SVG ou implementar BrandAsset.
- Hero usa marca, textos opcionais, nome e papel profissional do banco. Textos institucionais anteriores são usados quando título/descrição estão vazios. About usa nome e papel profissional; seus demais textos foram preservados.
- As duas imagens genéricas existentes receberam `alt=""`, sem atribuir a identidade de Fabio às fotos. As imagens não foram substituídas.
- Criado `lib/whatsapp.ts`: normalização de número internacional, validação estrutural, retorno nulo para entrada inválida e codificação de mensagem opcional; sem acesso ao banco ou número fixo.
- CTA final prioriza booking e usa WhatsApp como alternativa; omite botões sem canal disponível. Botão flutuante desaparece sem WhatsApp válido.
- Footer renderiza somente contatos disponíveis, separadores entre links existentes, endereço opcional e copyright com ano atual e marca do banco.
- Removidos telefone/e-mail fictícios e Instagram `#`. A fronteira de leitura rejeita URLs externas fora de HTTP/HTTPS e e-mails estruturalmente inválidos.
- Ausência do registro `main` mantém a página renderizável com marca/nome existentes e contatos/papel profissional nulos. Outros registros não são usados como substitutos. Erros de conexão ou schema ausente não são ocultados.
- `seoTitle` e `seoDescription` não são consultados nesta fase, pois não há consumidor na Home e SEO permanece fora do escopo.
- Mantidos Server Components, `force-dynamic`, cache existente, CSS, fontes, cores e layout. Nenhuma dependência foi adicionada.
- Atualizados README e comentário descritivo de `SiteSettings`; o gerador produziu somente um `COMMENT ON TABLE`, sem alteração estrutural de schema.

## Validações

Passaram `yarn db:generate`, `yarn prisma validate`, `yarn lint` e `yarn build`.

Testes em PostgreSQL local descartável e navegador Chrome verificaram:

- configuração principal presente e ausente, inclusive existência de outro ID sem `main`;
- atualização de conteúdo dinâmico e prioridade booking/WhatsApp;
- WhatsApp, Instagram, e-mail e booking nulos individualmente e todos ausentes;
- contatos inválidos omitidos, ausência de `href="#"`, separadores corretos e botão flutuante condicional;
- imagens genéricas com alt decorativo e ausência de erros JavaScript;
- helper com número formatado, entradas inválidas e mensagem com acentos e caracteres especiais.

Inspeção em 320, 768 e 1440 px. Em 768 e 1440 px não houve overflow horizontal. Em 320 px, a largura do documento chegou a 363 px; a comparação com o código anterior confirmou o mesmo problema preexistente na região do Hero. Sua correção fica para a Fase 3, sem mudança de CSS nesta execução. A remoção de contatos inexistentes reduz naturalmente o conteúdo do CTA/Footer.

Nenhum banco remoto foi alterado. O schema da Fase 1 precisa estar aplicado no ambiente de execução; os contatos reais devem ser preenchidos quando confirmados. A atualização do comentário do banco pode ser aplicada separadamente após revisão do SQL gerado.

---

# Fase 3 — Design System

## Objetivo

Melhorar organização visual e responsividade sem descaracterizar a Prismma.

---

### `app/globals.css`

Reduzir responsabilidade.

Manter principalmente:

- reset;
- tokens;
- estilos globais;
- body;
- tipografia base.

Preservar inicialmente:

```text
#0F3D37
#A7B89F
#F8F7F3
#374151
#D4B483
```

---

### CSS Modules

Mover estilos específicos para módulos junto aos componentes quando isso melhorar manutenção.

Não é necessário criar um CSS Module para cada componente minúsculo.

---

### Fontes

Remover:

```css
@import url(...)
```

Migrar para:

```text
next/font/google
```

Fontes preferenciais:

- Playfair Display;
- DM Sans.

---

### Menu mobile

Criar navegação mobile real.

Não esconder todos os links simplesmente por largura da tela.

Este pode ser Client Component.

---

### Acessibilidade

Adicionar/revisar:

- focus-visible;
- keyboard navigation;
- alt;
- aria-label;
- contraste;
- headings;
- links externos.

---

## Critérios da Fase 3

Validar visualmente:

```text
320px
375px
768px
1024px
1440px
```

Executar:

```bash
yarn lint
yarn build
```

Não iniciar SEO automaticamente.

---

# Fase 4 — Conteúdo e identidade definitiva

Esta fase depende de materiais e informações aprovadas.

Substituir:

- imagens Unsplash;
- retrato provisório;
- imagens institucionais provisórias;
- símbolo provisório;
- contatos provisórios.

Utilizar fotos reais de Fabio quando fornecidas.

---

## Conteúdo que precisa ser confirmado

Antes de publicar:

- telefone;
- e-mail;
- Instagram;
- cidade;
- modalidades de atendimento;
- endereço, se aplicável;
- formação;
- especializações;
- registro profissional, caso seja publicado;
- descrição dos protocolos;
- funcionamento das oito sessões;
- técnicas/recursos;
- biografia.

Não inventar dados para preencher a interface.

---

# Fase 5 — SEO

## `app/layout.tsx`

Expandir metadata.

Considerar:

```text
metadataBase
title template
description
canonical
Open Graph
Twitter
robots
```

Usar `NEXT_PUBLIC_SITE_URL`.

---

## `app/sitemap.ts`

Criar sitemap usando recursos nativos do Next.js.

---

## `app/robots.ts`

Criar configuração de indexação e referência ao sitemap.

---

## Structured Data

Criar:

```text
components/seo/structured-data.tsx
```

Somente usar informações confirmadas.

Não inventar endereço, registro ou especialidades.

---

# Fase 6 — Documentação

Criar/organizar:

```text
docs/
├── architecture.md
├── brand.md
├── content.md
├── client-brief.md
└── refactor-plan.md
```

---

## `docs/architecture.md`

Documentar:

- Next.js;
- Prisma;
- PostgreSQL;
- Server Components;
- queries;
- estratégia de cache;
- conteúdo dinâmico;
- storage futuro.

---

## `docs/brand.md`

Documentar:

- identidade;
- cores;
- tipografia;
- direção fotográfica;
- arquétipos;
- tom visual.

---

## `docs/content.md`

Separar:

```text
CONFIRMADO
PROVISÓRIO
PENDENTE DE APROVAÇÃO
```

Nunca tratar conteúdo provisório como fato confirmado.

---

## `docs/client-brief.md`

Migrar informações úteis do antigo `docs.md`.

Remover:

- notas soltas;
- duplicações;
- brainstorming obsoleto.

Manter histórico útil do briefing.

---

# Fase futura — Administração

Não implementar durante esta refatoração.

Possível estrutura futura:

```text
/admin
/admin/protocolos
/admin/depoimentos
/admin/faq
/admin/marca
/admin/configuracoes
```

Antes disso, o conteúdo pode ser administrado através de:

- seed;
- Prisma Studio;
- banco.

Quando o painel for realmente necessário, definir autenticação e autorização antes de criar CRUDs.

---

# Storage futuro

`BrandAsset` prepara o projeto para assets dinâmicos.

Quando uploads forem implementados, utilizar storage persistente compatível com Vercel.

Não salvar uploads no filesystem local da aplicação esperando persistência.

Possíveis opções devem ser avaliadas somente quando a funcionalidade for implementada.

---

# Fora de escopo

Não adicionar nesta refatoração sem solicitação:

- Tailwind;
- shadcn;
- Zustand;
- React Query;
- CMS externo;
- Repository Pattern;
- DDD;
- painel administrativo;
- autenticação;
- sistema próprio de agendamento;
- pagamentos;
- blog.

---

# Estratégia de commits

Preferir commits pequenos.

Exemplo:

```text
chore: align environment with PostgreSQL

chore: clean generated repository files

feat: add site settings model

refactor: make database seed idempotent

docs: update project setup

refactor: extract home sections

refactor: centralize home queries

refactor: migrate fonts to next font

feat: add responsive navigation

feat: improve site metadata

docs: document Prismma architecture
```

---

# Instrução para execução por agentes

Ao receber uma solicitação como:

> Implemente a Fase 1.

O agente deve:

1. ler `AGENTS.md`;
2. ler este documento;
3. confirmar que está em `refact/design-1`;
4. inspecionar os arquivos atuais;
5. implementar somente a Fase 1;
6. executar as validações possíveis;
7. corrigir erros introduzidos pela alteração;
8. não iniciar a Fase 2;
9. apresentar resumo dos arquivos modificados;
10. apresentar resultado de lint/build;
11. informar qualquer pendência.

O plano é uma orientação.

Se o código atual divergir deste documento, inspecionar a implementação antes de alterar e preservar mudanças mais recentes que sejam válidas.
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

Fase 2 concluída em 25/09/2026 na mesma branch. Os componentes existentes e `lib/home-content.ts` foram preservados e integrados a `SiteSettings.main`, conforme o registro detalhado abaixo. Fase 3 concluída em 25/09/2026, conforme o registro abaixo. Fase 4 e SEO não foram iniciados.

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

# Fase 3 — Refatoração visual da Home (concluída)

## Direção visual e composição

Mantida a identidade forest/sage/cream/graphite/warm, com variações suaves de superfície, bordas e texto. A composição editorial usa largura máxima de 1200 px, espaçamento fluido, hierarquia tipográfica e alternância entre seções claras e verde profundo.

- Header com logo, navegação desktop e CTA; navegação móvel real até 1000 px.
- Hero com colunas proporcionais, imagem contida e tipografia fluida. Nome e papel profissional foram retirados de cima da foto genérica e integrados ao bloco de texto. As fotos originais e `alt=""` foram preservados.
- Pilares institucionais com divisores, sem caixas ou sombras. Protocolos com fotografias e composição alternada no desktop, preservando os textos do banco.
- Avaliação e processo com hierarquia mais clara, sequência numerada e percurso vertical em telas estreitas.
- About com imagem decorativa, conteúdo e formação organizados em uma composição editorial. Saúde integrativa com superfície verde profunda e fotografia original mantida também em mobile.
- Ausência de depoimentos oculta o bloco e permite à FAQ ocupar a seção. FAQ mantém `details`/`summary`, indicador de estado aberto e navegação nativa por teclado.
- CTA final funciona com ou sem canais; Footer organiza contatos sem separadores textuais ou blocos vazios.

## Componentes, fontes e estilos

Criado `components/layout/mobile-navigation.tsx`, único novo Client Component. Usa botão com `aria-expanded`/`aria-controls`, links nativos, fechamento por seleção, Escape, clique externo, saída de foco e mudança para desktop. Escape devolve o foco ao botão. O painel pode rolar em telas baixas; não é um modal e não prende o foco.

Playfair Display e DM Sans migradas para `next/font/google`, com variáveis CSS no layout, `display: swap` e arquivos de fonte servidos pelo Next.js. Removido o `@import` do Google Fonts. O build precisa acessar o provedor de fontes na primeira obtenção dos arquivos.

`globals.css` agora contém reset, tokens, tipografia, espaçamento compartilhado, botões, links, foco e reduced motion. Estilos específicos ficaram em seis CSS Modules:

- `components/brand/brand.module.css`;
- `components/layout/layout.module.css`;
- `components/home/hero-section.module.css`;
- `components/home/approach.module.css` (essência e protocolos);
- `components/home/care.module.css` (avaliação, processo, About e saúde integrativa);
- `components/home/closing.module.css` (FAQ, depoimentos, CTA e WhatsApp flutuante).

Os componentes existentes foram adaptados aos módulos, sem mover arquivos ou adicionar bibliotecas. Nenhum arquivo foi removido. Não existia `docs/architecture.md`; a organização de estilos está registrada aqui.

## Correção do overflow

A inspeção anterior à mudança mediu 363,03 px na coluna do Hero em uma viewport de 320 px. `grid-template-columns: 1fr`, o tamanho mínimo automático do item e o título a 48 px faziam a palavra “individualidade”, somada aos 48 px de padding, impor uma coluna mais larga que a tela.

A correção usa `minmax(0, 1fr)`, `min-width: 0` nos itens, título fluido, quebra de palavras como proteção e ações/pilares que podem se distribuir em novas linhas. Não foi usado `overflow-x: hidden` para mascarar o problema.

## Acessibilidade e validações

Adicionados skip link para o conteúdo, nomes das navegações, foco visível, contraste de texto adequado às superfícies, setas decorativas ocultas das tecnologias assistivas e respeito a `prefers-reduced-motion`. Transições limitadas a 180–220 ms.

Validação em Chrome nos tamanhos exatos:

- 320 × 700;
- 375 × 812;
- 768 × 1024;
- 1024 × 768;
- 1440 × 900.

Em todos, a largura do documento coincidiu com a viewport, sem elementos da Home ultrapassando a borda direita. Imagens originais carregadas, fontes corretas, inspeção de Hero, grids, FAQ, CTA e Footer sem cortes ou sobreposições. Testados teclado/Tab/Enter, Escape, seleção e clique externo no menu, fechamento ao trocar para desktop, skip link, foco visível, abertura/fechamento de FAQ e reduced motion. Sem erros JavaScript nas verificações.

Renderização isolada dos componentes também validou contatos ausentes/presentes, prioridade do booking, WhatsApp condicional, endereço e depoimentos vazios, sem gravar dados no banco.

`yarn lint` e `yarn build` aprovados. Schema, seed, consultas, SiteSettings, helper de WhatsApp, `force-dynamic`, cache, SEO e dependências permaneceram intactos. Nenhuma operação de escrita foi realizada no banco.

## Correções finais da revisão

A revisão visual da Home encontrou dois defeitos reais, corrigidos na mesma branch:

- **Concatenação de palavras com `<br>` oculto.** Quatro títulos perdiam o espaço quando a regra responsiva escondia o `<br>` (`.heading h2 br` até 700 px, `.assessment h2 br` até 700 px, `.cta h2 br` até 500 px), produzindo texto como “propósito:mais qualidade de vida.”. Todos os `<br />` dos títulos passaram a ter espaço explícito (`{' '}`) antes da quebra, em `hero-section`, `essence-section`, `protocols-section`, `assessment-section`, `process-section`, `integrative-section`, `faq-section` e `final-cta`. Com isso, `innerText` e `textContent` dos headings permanecem corretos com o `<br>` visível ou oculto.
- **Sinal “+” do FAQ ultrapassando a divisa.** A rotação de 45° do `<b>` aumentava a caixa pintada além da borda direita do `details` em ~12 px. `summary` recebeu `padding-right: 14px` e o indicador `line-height: 1`, mantendo o giro visual dentro da linha divisória em todas as larguras.

Revalidação após as correções: `yarn lint` e `yarn build` aprovados; sem overflow horizontal em 320, 375, 500, 700, 768, 1024 e 1440 px; nenhum heading com palavras concatenadas; borda direita do “+” girado entre 7 px e 8 px dentro do `details`; contraste sem falhas; menu móvel, skip link, foco visível, reduced motion e navegação por âncoras (`scroll-padding-top: 110px`) comportando-se como esperado.

## Revisão de código da fase

Uma revisão do diff da fase apontou pontos de fragilidade na fronteira entre o CSS global e os módulos. As correções foram:

- **Dependência da ordem de injeção de estilos.** `.section` (global, especificidade 0,1,0) e `.process`/`.cta` (módulos, 0,1,0) definem as mesmas propriedades de `padding`. O resultado dependia apenas da ordem de emissão do CSS. Os seletores passaram a ser `:global(.section).process` e `:global(.section).cta` (0,2,0), tornando a precedência explícita e independente da ordem de importação. Os valores computados foram medidos antes e depois e permaneceram idênticos (`process` com `padding-top: 0`, `cta` com o `clamp` próprio).
- **Deslocamento duplicado nas âncoras.** `scroll-padding-top: 110px` no `html` somava `scroll-margin-top: 20px` de `section[id]`, produzindo 130 px de deslocamento para as seções com `id`. O `scroll-padding-top` já cobre o header fixo; a regra `section[id]` foi removida. As âncoras passam a pousar em 110 px, mantendo distância do header (89 px em desktop, 77 px em mobile).
- **`className` pendurado no símbolo da marca.** `PrismmaMark` mantinha `className = 'mark'` como padrão após a remoção da regra global `.mark`, o que produziria um SVG sem estilo (300×150) em qualquer chamada futura. O `className` passou a ser obrigatório.
- **Token sem uso.** `--radius-md` foi removido. `--color-graphite` foi mantido por constar como cor de identidade em `AGENTS.md` §8.

Revalidação: `yarn lint` e `yarn build` aprovados; padding computado idêntico ao baseline; âncoras em 110 px; marca 44×48 sem classes penduradas; sem overflow horizontal e sem concatenação de palavras em 320, 375, 500, 700, 768, 1024 e 1440 px; contraste sem falhas; menu móvel inalterado.

Permanecem como observação, sem alteração nesta fase: a lista de pilares do Hero usa `span` com separadores `•` ocultos das tecnologias assistivas, e a remoção do texto "Em breve…" do bloco de depoimentos, ambos já registrados abaixo.

## Pendências

Substituir fotos genéricas e símbolo provisório somente quando materiais oficiais forem fornecidos. Confirmar conteúdo profissional, modalidades, protocolos e contatos antes da publicação, como previsto na Fase 4. A refatoração preservou os textos existentes e não valida suas afirmações clínicas ou credenciais. Não foram iniciados Fase 4, SEO, BrandAsset, uploads ou administração.

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
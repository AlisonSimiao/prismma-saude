# AGENTS.md — Prismma Saúde Integrativa

Este arquivo define as regras de desenvolvimento, arquitetura, conteúdo e documentação do projeto Prismma Saúde Integrativa.

Agentes de código devem ler este arquivo antes de realizar alterações no repositório.

---

# 1. Sobre o projeto

Prismma Saúde Integrativa é um site institucional para o trabalho profissional de Fabio Leandro.

Posicionamento principal:

- Saúde integrativa
- Enfermagem
- Cuidado individualizado
- Base científica
- Dor persistente
- Ansiedade
- Vitalidade e qualidade de vida

Protocolos principais:

- Prismma Movimento — dor persistente
- Prismma Equilíbrio — ansiedade e saúde do trabalhador
- Prismma Vital — qualidade de vida e vitalidade

O site deve transmitir:

- confiança;
- acolhimento;
- ciência;
- tranquilidade;
- cuidado individualizado;
- sofisticação.

A identidade não deve parecer excessivamente hospitalar.

---

# 2. Stack

Stack atual:

- Next.js 15
- App Router
- React 19
- TypeScript
- Prisma 6
- PostgreSQL
- CSS

Hospedagem prevista:

- Vercel

Banco:

- PostgreSQL
- Neon pode ser utilizado como provedor

---

# 3. Arquitetura

## 3.1 Regra principal

A arquitetura deve seguir o princípio:

> Conteúdo no banco. Estrutura e apresentação no código.

O projeto NÃO deve se transformar em um CMS genérico.

O banco pode controlar conteúdos como:

- protocolos;
- FAQ;
- depoimentos;
- informações institucionais;
- contatos;
- redes sociais;
- configurações gerais;
- imagens;
- ativos da marca.

O código deve controlar:

- layout;
- componentes;
- design;
- responsividade;
- hierarquia visual;
- comportamento;
- animações;
- navegação;
- estrutura das páginas.

---

# 4. Server Components

Usar Server Components por padrão.

Não adicionar `"use client"` sem necessidade.

Client Components são permitidos quando houver necessidade real de:

- estado do navegador;
- eventos interativos;
- APIs do browser;
- menu mobile;
- formulários interativos;
- componentes que dependam de hooks do React.

A página inteira nunca deve virar Client Component apenas para suportar uma pequena interação.

---

# 5. Acesso ao banco

Componentes visuais não devem acessar Prisma diretamente.

Evitar:

```tsx
const protocols = await prisma.protocol.findMany(...)
```

dentro de componentes de apresentação.

Centralizar consultas em:

```text
lib/queries/
```

Exemplo:

```text
lib/queries/home.ts
```

A página pode chamar uma query agregadora e distribuir os dados para os componentes.

Não criar Repository Pattern, Use Cases ou abstrações de DDD sem necessidade concreta.

Este é um site institucional e deve permanecer simples.

---

# 6. Estrutura esperada

A estrutura alvo é aproximadamente:

```text
app/
├── globals.css
├── layout.tsx
├── page.tsx
├── not-found.tsx
├── robots.ts
└── sitemap.ts

components/
├── brand/
├── layout/
├── home/
└── seo/

lib/
├── prisma.ts
├── whatsapp.ts
└── queries/

prisma/
├── schema.prisma
└── seed.ts

public/
├── brand/
└── images/

docs/
├── architecture.md
├── brand.md
├── content.md
├── client-brief.md
└── refactor-plan.md
```

Não criar diretórios apenas para manter um único arquivo se isso não melhorar a organização.

---

# 7. Home

`app/page.tsx` deve funcionar principalmente como composição das seções.

Evitar colocar toda a implementação da Home no arquivo.

As seções podem ser separadas em:

```text
components/home/
```

Exemplos:

```text
hero-section.tsx
essence-section.tsx
protocols-section.tsx
assessment-section.tsx
process-section.tsx
about-section.tsx
integrative-section.tsx
testimonials-section.tsx
faq-section.tsx
final-cta.tsx
```

Header e Footer devem ficar em:

```text
components/layout/
```

---

# 8. Design

Identidade atual:

```text
Verde profundo: #0F3D37
Verde sálvia:    #A7B89F
Off-white:       #F8F7F3
Grafite:         #374151
Bege/dourado:    #D4B483
```

Esses valores podem evoluir, mas alterações significativas devem preservar a identidade aprovada.

Direção visual:

- natural;
- editorial;
- elegante;
- científica;
- acolhedora;
- sofisticada;
- pouco hospitalar.

Evitar:

- aparência de template genérico;
- excesso de cards;
- excesso de sombras;
- gradientes decorativos desnecessários;
- azul médico genérico;
- animações exageradas;
- ícones sem significado.

---

# 9. Tipografia

Preferir `next/font`.

Não importar Google Fonts usando `@import` em CSS.

Direção:

Títulos:

- Playfair Display ou serif equivalente.

Texto:

- DM Sans, Inter ou sans-serif equivalente.

A tipografia deve manter boa legibilidade em dispositivos móveis.

---

# 10. CSS

`app/globals.css` deve conter principalmente:

- reset;
- design tokens;
- estilos globais;
- tipografia base;
- elementos realmente globais.

Quando uma seção possuir quantidade relevante de estilos próprios, preferir CSS Modules.

Exemplo:

```text
hero-section.tsx
hero-section.module.css
```

Não adicionar Tailwind apenas para esta refatoração.

Não adicionar biblioteca de UI sem necessidade concreta.

---

# 11. Responsividade

Toda alteração visual deve ser validada pelo menos para:

- desktop;
- tablet;
- mobile.

O site deve funcionar adequadamente a partir de aproximadamente 320 px.

Não resolver mobile simplesmente escondendo recursos importantes.

A navegação principal deve permanecer acessível em mobile.

---

# 12. Acessibilidade

Sempre considerar:

- HTML semântico;
- hierarquia correta de headings;
- navegação por teclado;
- `focus-visible`;
- contraste;
- textos alternativos;
- `aria-label` quando necessário;
- links descritivos;
- preferência por elementos HTML nativos.

Preferir:

```html
<details>
```

quando ele resolver corretamente um accordion/FAQ.

Não adicionar JavaScript quando HTML nativo for suficiente.

---

# 13. Imagens

Usar `next/image` quando apropriado.

Toda imagem informativa deve possuir `alt` adequado.

Imagens puramente decorativas podem utilizar:

```tsx
alt=""
```

Não utilizar fotos genéricas como se representassem Fabio.

As imagens atuais do Unsplash são provisórias.

Quando materiais oficiais forem disponibilizados, priorizar:

- retrato profissional;
- Fabio em atendimento;
- ambiente;
- imagens aprovadas da marca.

---

# 14. Conteúdo de saúde

Esta regra é especialmente importante.

NUNCA inventar:

- formação;
- certificações;
- registro profissional;
- especializações;
- resultados clínicos;
- eficácia;
- endereço;
- modalidades de atendimento;
- técnicas utilizadas;
- depoimentos;
- estatísticas;
- benefícios clínicos.

Quando uma informação não estiver confirmada, utilizar placeholder claramente identificável ou manter o conteúdo ausente.

Evitar promessas como:

- cura;
- resultado garantido;
- tratamento eficaz;
- elimina a dor;
- acaba com ansiedade;
- resultados comprovados;

a menos que exista texto explicitamente aprovado e juridicamente/profissionalmente adequado.

Preferir linguagem institucional e informativa.

---

# 15. Depoimentos

Depoimentos somente podem aparecer publicamente quando:

```text
status = PUBLISHED
```

Nunca criar depoimentos fictícios.

Se não houver depoimentos publicados, utilizar estado vazio adequado ou ocultar a seção conforme a decisão de design.

---

# 16. Configurações do site

Informações que podem mudar não devem ficar espalhadas pelos componentes.

Exemplos:

- WhatsApp;
- Instagram;
- e-mail;
- nome da marca;
- nome profissional;
- URL de agendamento;
- endereço;
- SEO.

Centralizar essas informações em `SiteSettings` quando a modelagem estiver disponível.

---

# 17. WhatsApp

Não hardcodar telefone dentro dos componentes.

Criar helper centralizado, por exemplo:

```text
lib/whatsapp.ts
```

O helper pode gerar URL com mensagem inicial.

O telefone deve vir das configurações do site.

---

# 18. Prisma

Schema:

```text
prisma/schema.prisma
```

Banco:

```text
PostgreSQL
```

Não alterar novamente para SQLite.

Seeds devem ser idempotentes.

Executar o seed mais de uma vez não deve:

- duplicar conteúdo;
- quebrar constraints;
- criar registros inconsistentes.

Preferir `upsert` quando existir chave natural.

---

# 19. Alterações de schema

Toda alteração no Prisma deve considerar:

1. compatibilidade com dados existentes;
2. seed;
3. consultas afetadas;
4. documentação;
5. variáveis de ambiente, quando aplicável.

Não utilizar `prisma migrate reset` em banco de produção.

---

# 20. SEO

SEO deve ser implementado usando recursos nativos do Next.js.

Considerar:

```text
metadata
robots.ts
sitemap.ts
Open Graph
canonical
structured data
```

Structured Data somente deve conter informações confirmadas.

Não inventar endereço ou credenciais para melhorar SEO.

---

# 21. Performance

Evitar `force-dynamic` sem necessidade.

Para conteúdo institucional, preferir cache/revalidação quando possível.

Quando existir painel administrativo, alterações de conteúdo podem utilizar:

```ts
revalidatePath('/')
```

Evitar bibliotecas grandes para pequenas interações.

---

# 22. Dependências

Antes de instalar uma dependência:

1. verificar se Next.js/React/HTML/CSS já resolvem o problema;
2. avaliar impacto no bundle;
3. confirmar necessidade real.

Não adicionar bibliotecas por conveniência quando poucas linhas de código resolverem.

---

# 23. Segurança

Nunca:

- versionar `.env`;
- expor secrets em `NEXT_PUBLIC_*`;
- colocar tokens no código;
- confiar somente em validação client-side;
- publicar credenciais em documentação.

`NEXT_PUBLIC_*` deve conter somente informações que podem ser públicas no navegador.

---

# 24. Git

Branch atual desta refatoração:

```text
refact/design-1
```

Não trabalhar diretamente na `main`.

Preferir commits pequenos e semanticamente claros.

Exemplos:

```text
chore: align project foundation
refactor: split home into sections
feat: add site settings
refactor: migrate fonts to next font
feat: improve site metadata
docs: document project architecture
```

Não misturar dezenas de alterações não relacionadas no mesmo commit.

---

# 25. Validação

Antes de considerar uma etapa concluída, executar quando possível:

```bash
yarn lint
yarn build
```

Quando houver alteração no Prisma:

```bash
yarn db:generate
```

Resolver erros introduzidos pela alteração antes de avançar.

Não corrigir problemas completamente não relacionados apenas porque apareceram durante a execução, salvo quando bloquearem a tarefa.

---

# 26. Escopo

Não expandir automaticamente o escopo.

Se a tarefa disser:

> implementar Fase 1

não implementar Fase 2.

Se encontrar uma melhoria futura, registrar em documentação em vez de implementá-la sem solicitação.

---

# 27. Documentação

A documentação é parte do projeto.

Sempre verificar se uma alteração exige atualização em:

```text
README.md
AGENTS.md
docs/
.env.example
```

Exemplos:

Nova variável de ambiente:

```text
→ atualizar .env.example
→ atualizar documentação correspondente
```

Mudança de arquitetura:

```text
→ atualizar docs/architecture.md
```

Mudança relevante de identidade:

```text
→ atualizar docs/brand.md
```

Mudança de conteúdo:

```text
→ atualizar docs/content.md
```

A documentação deve representar o estado atual do projeto, não decisões antigas.

---

# 28. Regra para agentes

Antes de implementar qualquer tarefa:

1. Ler `AGENTS.md`.
2. Ler os documentos relevantes em `docs/`.
3. Inspecionar o código atual.
4. Confirmar a branch.
5. Alterar somente o necessário.
6. Executar validações.
7. Informar quais arquivos foram alterados.
8. Informar resultados de lint/build.
9. Informar pendências ou decisões que precisam de confirmação.

Não assumir que um plano antigo ainda corresponde exatamente ao código atual.

O código atual é sempre a fonte primária para o estado da implementação.
# Prismma Saúde Integrativa

Site institucional em Next.js (App Router) com Prisma e SQLite para o conteúdo administrável.

## Início rápido

```bash
cp .env.example .env
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

## Conteúdo dinâmico

Os modelos em `prisma/schema.prisma` atendem protocolos, depoimentos, FAQ, cards institucionais e ativos de marca. A Home consulta protocolos e cards ativos, FAQ ativo e somente depoimentos com status `PUBLISHED`.

Use `prisma/seed.ts` como conteúdo inicial. Antes da publicação, substitua o WhatsApp provisório (`5500000000000`) e as imagens de demonstração pelos materiais aprovados da Prismma.

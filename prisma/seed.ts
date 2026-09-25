import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const protocols = [
  {slug:'movimento',name:'Prismma Movimento',shortName:'Dor persistente',title:'Dor persistente',shortDescription:'Para pessoas que convivem com dor persistente e desejam construir uma estratégia individualizada de cuidado.',description:'Um caminho de escuta, compreensão e cuidado para a dor persistente.',image:'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=80',icon:'△',order:1},
  {slug:'equilibrio',name:'Prismma Equilíbrio',shortName:'Ansiedade e saúde do trabalhador',title:'Ansiedade e saúde do trabalhador',shortDescription:'Uma abordagem voltada à ansiedade, aos desafios da rotina e ao equilíbrio da vida cotidiana.',description:'Uma proposta de cuidado para ansiedade, rotina e trabalho.',image:'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',icon:'◌',order:2},
  {slug:'vital',name:'Prismma Vital',shortName:'Qualidade de vida e vitalidade',title:'Qualidade de vida e vitalidade',shortDescription:'Cuidado preventivo e integrado para quem busca mais qualidade de vida e vitalidade.',description:'Uma visão integrada e preventiva da saúde.',image:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',icon:'✦',order:3}

];

const cards = [{seedKey:'avaliacao-individualizada',icon:'⌁',title:'Avaliação individualizada',text:'Cada pessoa possui uma história, necessidades e contexto únicos.',order:1},{seedKey:'base-cientifica',icon:'✦',title:'Base científica',text:'Decisões fundamentadas em conhecimento científico e experiência clínica.',order:2},{seedKey:'cuidado-integral',icon:'♡',title:'Cuidado integral',text:'Corpo, mente, contexto e estilo de vida em equilíbrio.',order:3},{seedKey:'mais-que-tratamento',icon:'◜',title:'Mais que tratamento',text:'Um processo de cuidado pensado para acompanhar sua evolução.',order:4}];

const faqs = [
  { seedKey: 'avaliacao', question: 'Como funciona a avaliação?', answer: 'O primeiro encontro é dedicado à escuta e à compreensão da sua história, necessidades e contexto.', order: 0 },
  { seedKey: 'sessoes', question: 'Quantas sessões são realizadas?', answer: 'O acompanhamento pode ser estruturado em 8 sessões, conforme a avaliação individualizada.', order: 1 },
  { seedKey: 'modalidades', question: 'O atendimento é presencial ou online?', answer: 'O formato é definido de acordo com a disponibilidade e as necessidades de cada pessoa.', order: 2 },
  { seedKey: 'local', question: 'Onde acontecem os atendimentos?', answer: 'As informações sobre local e modalidades são apresentadas no momento do agendamento.', order: 3 },
  { seedKey: 'exames', question: 'É necessário levar exames?', answer: 'Se você tiver exames disponíveis, eles podem contribuir para uma compreensão mais completa do seu contexto.', order: 4 },
  { seedKey: 'agendamento', question: 'Como faço para agendar?', answer: 'Entre em contato pelo WhatsApp para receber as orientações iniciais.', order: 5 }
];

async function main() {
  await prisma.$transaction(async (tx) => {
    for (const protocol of protocols) {
      await tx.protocol.upsert({
        where: { slug: protocol.slug },
        update: {},
        create: protocol,
      });
    }

    // Adopt legacy rows by their original text without changing IDs or content.
    // Nullable seed keys avoid imposing uniqueness on editable titles/questions.
    for (const card of cards) {
      const existing = await tx.institutionalCard.findUnique({ where: { seedKey: card.seedKey } });
      if (existing) continue;
      const legacy = await tx.institutionalCard.findFirst({
        where: { seedKey: null, title: card.title },
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
      });
      if (legacy) {
        await tx.institutionalCard.update({ where: { id: legacy.id }, data: { seedKey: card.seedKey } });
      } else {
        await tx.institutionalCard.upsert({ where: { seedKey: card.seedKey }, update: {}, create: card });
      }
    }

    for (const faq of faqs) {
      const existing = await tx.faq.findUnique({ where: { seedKey: faq.seedKey } });
      if (existing) continue;
      const legacy = await tx.faq.findFirst({
        where: { seedKey: null, question: faq.question },
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
      });
      if (legacy) {
        await tx.faq.update({ where: { id: legacy.id }, data: { seedKey: faq.seedKey } });
      } else {
        await tx.faq.upsert({ where: { seedKey: faq.seedKey }, update: {}, create: faq });
      }
    }

    await tx.siteSettings.upsert({
      where: { id: 'main' },
      update: {},
      create: {
        id: 'main',
        brandName: 'Prismma Saúde Integrativa',
        professionalName: 'Fabio Leandro',
        professionalRole: 'Enfermeiro | PhD',
      },
    });
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, timeout: 30000 });
}

main()
  .catch(() => {
    console.error('Falha ao executar o seed. Verifique a conexão, o schema e se há outro seed em execução.');
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

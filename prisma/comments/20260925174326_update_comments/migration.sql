-- Prisma Database Comments Generator v1.8.0

-- Protocol comments
COMMENT ON TABLE "Protocol" IS 'Protocolos de cuidado apresentados no site.';
COMMENT ON COLUMN "Protocol"."id" IS 'Identificador interno único do registro.';
COMMENT ON COLUMN "Protocol"."slug" IS 'Identificador público único e estável; usado pelo seed para reconhecer o protocolo.';
COMMENT ON COLUMN "Protocol"."name" IS 'Nome completo do protocolo.';
COMMENT ON COLUMN "Protocol"."shortName" IS 'Nome curto ou tema do protocolo usado na interface.';
COMMENT ON COLUMN "Protocol"."title" IS 'Título de apresentação do protocolo.';
COMMENT ON COLUMN "Protocol"."shortDescription" IS 'Resumo exibido na apresentação do protocolo.';
COMMENT ON COLUMN "Protocol"."description" IS 'Descrição completa do protocolo; conteúdo sujeito à aprovação profissional.';
COMMENT ON COLUMN "Protocol"."image" IS 'URL da imagem de apresentação do protocolo.';
COMMENT ON COLUMN "Protocol"."icon" IS 'Símbolo textual usado para representar o protocolo.';
COMMENT ON COLUMN "Protocol"."order" IS 'Posição de exibição em ordem crescente; valores menores aparecem primeiro.';
COMMENT ON COLUMN "Protocol"."active" IS 'Indica se o registro está habilitado para uso no site.';
COMMENT ON COLUMN "Protocol"."createdAt" IS 'Data e hora de criação do registro.';
COMMENT ON COLUMN "Protocol"."updatedAt" IS 'Data e hora da última atualização registrada pelo Prisma.';

-- Testimonial comments
COMMENT ON TABLE "Testimonial" IS 'Depoimentos reais; somente registros PUBLISHED podem ser exibidos publicamente.';
COMMENT ON COLUMN "Testimonial"."id" IS 'Identificador interno único do registro.';
COMMENT ON COLUMN "Testimonial"."name" IS 'Nome de exibição autorizado pela pessoa que enviou o depoimento.';
COMMENT ON COLUMN "Testimonial"."text" IS 'Texto do depoimento aprovado para uso.';
COMMENT ON COLUMN "Testimonial"."photo" IS 'URL opcional da foto autorizada para publicação.';
COMMENT ON COLUMN "Testimonial"."protocolId" IS 'Identificador do protocolo relacionado, quando informado.';
COMMENT ON COLUMN "Testimonial"."order" IS 'Posição de exibição em ordem crescente; valores menores aparecem primeiro.';
COMMENT ON COLUMN "Testimonial"."status" IS 'Estado editorial: DRAFT é rascunho, PUBLISHED permite exibição pública e ARCHIVED permanece oculto.';
COMMENT ON COLUMN "Testimonial"."createdAt" IS 'Data e hora de criação do registro.';
COMMENT ON COLUMN "Testimonial"."updatedAt" IS 'Data e hora da última atualização registrada pelo Prisma.';

-- Faq comments
COMMENT ON TABLE "Faq" IS 'Perguntas e respostas frequentes exibidas quando ativas.';
COMMENT ON COLUMN "Faq"."id" IS 'Identificador interno único do registro.';
COMMENT ON COLUMN "Faq"."seedKey" IS 'Chave estável do conteúdo inicial; não editar. Nula para registros sem vínculo com o seed.';
COMMENT ON COLUMN "Faq"."question" IS 'Texto da pergunta exibida no site.';
COMMENT ON COLUMN "Faq"."answer" IS 'Resposta institucional à pergunta; informações de atendimento precisam de aprovação.';
COMMENT ON COLUMN "Faq"."order" IS 'Posição de exibição em ordem crescente; valores menores aparecem primeiro.';
COMMENT ON COLUMN "Faq"."active" IS 'Indica se o registro está habilitado para uso no site.';
COMMENT ON COLUMN "Faq"."createdAt" IS 'Data e hora de criação do registro.';
COMMENT ON COLUMN "Faq"."updatedAt" IS 'Data e hora da última atualização registrada pelo Prisma.';

-- InstitutionalCard comments
COMMENT ON TABLE "InstitutionalCard" IS 'Conteúdos institucionais apresentados na seção sobre a essência da marca.';
COMMENT ON COLUMN "InstitutionalCard"."id" IS 'Identificador interno único do registro.';
COMMENT ON COLUMN "InstitutionalCard"."seedKey" IS 'Chave estável do conteúdo inicial; não editar. Nula para registros sem vínculo com o seed.';
COMMENT ON COLUMN "InstitutionalCard"."title" IS 'Título do conteúdo institucional.';
COMMENT ON COLUMN "InstitutionalCard"."text" IS 'Texto de apresentação do conteúdo institucional.';
COMMENT ON COLUMN "InstitutionalCard"."icon" IS 'Símbolo textual exibido junto ao conteúdo.';
COMMENT ON COLUMN "InstitutionalCard"."order" IS 'Posição de exibição em ordem crescente; valores menores aparecem primeiro.';
COMMENT ON COLUMN "InstitutionalCard"."active" IS 'Indica se o registro está habilitado para uso no site.';
COMMENT ON COLUMN "InstitutionalCard"."createdAt" IS 'Data e hora de criação do registro.';
COMMENT ON COLUMN "InstitutionalCard"."updatedAt" IS 'Data e hora da última atualização registrada pelo Prisma.';

-- BrandAsset comments
COMMENT ON TABLE "BrandAsset" IS 'Referências de arquivos da identidade visual; ainda não consumidas pela interface.';
COMMENT ON COLUMN "BrandAsset"."id" IS 'Identificador interno único do registro.';
COMMENT ON COLUMN "BrandAsset"."type" IS 'Finalidade do arquivo na identidade visual; existe no máximo um registro por tipo.';
COMMENT ON COLUMN "BrandAsset"."storageKey" IS 'Chave que identifica o arquivo no serviço de armazenamento.';
COMMENT ON COLUMN "BrandAsset"."fileName" IS 'Nome do arquivo da marca.';
COMMENT ON COLUMN "BrandAsset"."mimeType" IS 'Tipo MIME do arquivo, por exemplo image/svg+xml.';
COMMENT ON COLUMN "BrandAsset"."active" IS 'Indica se o registro está habilitado para uso no site.';
COMMENT ON COLUMN "BrandAsset"."createdAt" IS 'Data e hora de criação do registro.';
COMMENT ON COLUMN "BrandAsset"."updatedAt" IS 'Data e hora da última atualização registrada pelo Prisma.';

-- SiteSettings comments
COMMENT ON TABLE "SiteSettings" IS 'Configurações institucionais preparadas para integração futura; a interface ainda usa lib/site.ts.';
COMMENT ON COLUMN "SiteSettings"."id" IS 'Identificador das configurações principais: main. O schema não impede a criação de outros IDs.';
COMMENT ON COLUMN "SiteSettings"."brandName" IS 'Nome público da marca.';
COMMENT ON COLUMN "SiteSettings"."professionalName" IS 'Nome público do profissional responsável.';
COMMENT ON COLUMN "SiteSettings"."professionalRole" IS 'Descrição profissional aprovada para publicação.';
COMMENT ON COLUMN "SiteSettings"."whatsapp" IS 'Número de WhatsApp com código do país e DDD, somente dígitos; nulo enquanto não confirmado.';
COMMENT ON COLUMN "SiteSettings"."email" IS 'Endereço de e-mail institucional confirmado.';
COMMENT ON COLUMN "SiteSettings"."instagramUrl" IS 'URL completa do perfil oficial do Instagram.';
COMMENT ON COLUMN "SiteSettings"."bookingUrl" IS 'URL completa do canal de agendamento confirmado.';
COMMENT ON COLUMN "SiteSettings"."address" IS 'Endereço de atendimento confirmado; manter nulo enquanto não aprovado.';
COMMENT ON COLUMN "SiteSettings"."heroTitle" IS 'Título opcional para a seção inicial da Home.';
COMMENT ON COLUMN "SiteSettings"."heroDescription" IS 'Descrição opcional para a seção inicial da Home.';
COMMENT ON COLUMN "SiteSettings"."seoTitle" IS 'Título opcional preparado para os metadados do site.';
COMMENT ON COLUMN "SiteSettings"."seoDescription" IS 'Descrição opcional preparada para os metadados do site.';
COMMENT ON COLUMN "SiteSettings"."updatedAt" IS 'Data e hora da última atualização registrada pelo Prisma.';

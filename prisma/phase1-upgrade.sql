-- Upgrade único do schema anterior à Fase 1. Testar em cópia isolada antes de aplicar.
BEGIN;

-- AlterTable
ALTER TABLE "Faq" ADD COLUMN     "seedKey" TEXT;

-- AlterTable
ALTER TABLE "InstitutionalCard" ADD COLUMN     "seedKey" TEXT;

-- AlterTable
ALTER TABLE "BrandAsset" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "brandName" TEXT NOT NULL,
    "professionalName" TEXT NOT NULL,
    "professionalRole" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "instagramUrl" TEXT,
    "bookingUrl" TEXT,
    "address" TEXT,
    "heroTitle" TEXT,
    "heroDescription" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Faq_seedKey_key" ON "Faq"("seedKey");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionalCard_seedKey_key" ON "InstitutionalCard"("seedKey");


COMMIT;

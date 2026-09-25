import { cache } from 'react';

import { prisma } from '@/lib/prisma';

export type PublicSiteSettings = {
  brandName: string;
  professionalName: string;
  professionalRole: string | null;
  whatsapp: string | null;
  email: string | null;
  instagramUrl: string | null;
  bookingUrl: string | null;
  address: string | null;
  heroTitle: string | null;
  heroDescription: string | null;
};

const fallbackSettings: PublicSiteSettings = {
  brandName: 'Prismma Saúde Integrativa',
  professionalName: 'Fabio Leandro',
  professionalRole: null,
  whatsapp: null,
  email: null,
  instagramUrl: null,
  bookingUrl: null,
  address: null,
  heroTitle: null,
  heroDescription: null,
};

function publicUrl(value: string | null): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export type HomeContent = {
  settings: PublicSiteSettings;
  protocols: ProtocolItem[];
  cards: InstitutionalCardItem[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
};

export type ProtocolItem = {
  id: string;
  name: string;
  shortName: string;
  shortDescription: string;
  image: string;
  icon: string;
};

export type InstitutionalCardItem = {
  id: string;
  icon: string;
  title: string;
  text: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  text: string;
};

const selectProtocol = {
  id: true,
  name: true,
  shortName: true,
  shortDescription: true,
  image: true,
  icon: true,
} as const;

const selectCard = {
  id: true,
  icon: true,
  title: true,
  text: true,
} as const;

const selectFaq = {
  id: true,
  question: true,
  answer: true,
} as const;

const selectTestimonial = {
  id: true,
  name: true,
  text: true,
} as const;

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const [siteSettings, protocols, cards, faqs, testimonials] = await Promise.all([
    prisma.siteSettings.findUnique({
      where: { id: 'main' },
      select: {
        brandName: true,
        professionalName: true,
        professionalRole: true,
        whatsapp: true,
        email: true,
        instagramUrl: true,
        bookingUrl: true,
        address: true,
        heroTitle: true,
        heroDescription: true,
      },
    }),
    prisma.protocol.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: selectProtocol,
    }),
    prisma.institutionalCard.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: selectCard,
    }),
    prisma.faq.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: selectFaq,
    }),
    prisma.testimonial.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { order: 'asc' },
      select: selectTestimonial,
    }),
  ]);

  const settings: PublicSiteSettings = siteSettings ? {
    ...siteSettings,
    professionalRole: siteSettings.professionalRole?.trim() || null,
    heroTitle: siteSettings.heroTitle?.trim() || null,
    heroDescription: siteSettings.heroDescription?.trim() || null,
    address: siteSettings.address?.trim() || null,
    instagramUrl: publicUrl(siteSettings.instagramUrl),
    bookingUrl: publicUrl(siteSettings.bookingUrl),
    email: siteSettings.email && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(siteSettings.email.trim())
      ? siteSettings.email.trim() : null,
  } : fallbackSettings;

  return { settings, protocols, cards, faqs, testimonials };
});

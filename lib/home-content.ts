import { cache } from 'react';

import { prisma } from '@/lib/prisma';
import { siteConfig, type SiteSettings } from '@/lib/site';

export type HomeContent = {
  settings: SiteSettings;
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
  const [protocols, cards, faqs, testimonials] = await Promise.all([
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

  return { settings: siteConfig, protocols, cards, faqs, testimonials };
});

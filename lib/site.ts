export const siteConfig = {
  name: 'Prismma Saúde Integrativa',
  shortName: 'PRISMMA',
  tagline: 'SAÚDE INTEGRATIVA',
  professional: {
    name: 'Fabio Leandro',
    firstName: 'Fabio',
    role: 'Enfermeiro | PhD',
  },
  contact: {
    whatsapp: 'https://wa.me/5500000000000',
    whatsappLabel: 'Falar pelo WhatsApp',
  },
  social: {
    instagram: '#',
    whatsapp: 'https://wa.me/5500000000000',
    email: 'contato@prismma.com.br',
  },
  copyright: `© ${new Date().getFullYear()} Prismma Saúde Integrativa. Todos os direitos reservados.`,
} as const;

export const mainNav = [
  { label: 'Home', href: '#inicio' },
  { label: 'A Prismma', href: '#prismma' },
  { label: 'Protocolos', href: '#protocolos' },
  { label: 'Fabio', href: '#fabio' },
  { label: 'Contato', href: '#contato' },
] as const;

export type SiteSettings = typeof siteConfig;
export type NavItem = (typeof mainNav)[number];

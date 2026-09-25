export const mainNav = [
  { label: 'Home', href: '#inicio' },
  { label: 'A Prismma', href: '#prismma' },
  { label: 'Protocolos', href: '#protocolos' },
  { label: 'Fabio', href: '#fabio' },
  { label: 'Contato', href: '#contato' },
] as const;

export type NavItem = (typeof mainNav)[number];

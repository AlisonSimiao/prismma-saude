export const mainNav = [
  { label: 'Home', href: '#inicio' },
  { label: 'A Prismma', href: '#prismma' },
  { label: 'Protocolos', href: '#protocolos' },
  { label: 'Fabio', href: '#fabio' },
  { label: 'Contato', href: '#contato' },
] as const;

export type NavItem = (typeof mainNav)[number];

const EXTERNAL_HREF = /^https?:\/\//i;

/**
 * External links leave the site, so they open in a new tab and are isolated
 * from the opening page. `mailto:` and internal anchors stay in the same tab.
 */
export function externalLinkProps(href: string): { target?: '_blank'; rel?: string } {
  return EXTERNAL_HREF.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

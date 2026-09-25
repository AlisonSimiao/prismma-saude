import { Brand } from '@/components/brand/brand';
import { mainNav, type SiteSettings } from '@/lib/site';

type FooterProps = {
  settings: SiteSettings;
};

export function Footer({ settings }: FooterProps) {
  return (
    <footer>
      <Brand />
      <nav>
        {mainNav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div>
        <a href={settings.social.instagram}>Instagram</a>
        {' · '}
        <a href={settings.social.whatsapp}>WhatsApp</a>
        {' · '}
        <a href={`mailto:${settings.social.email}`}>E-mail</a>
      </div>
      <small>{settings.copyright}</small>
    </footer>
  );
}

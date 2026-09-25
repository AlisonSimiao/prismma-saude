import styles from './layout.module.css';
import { Brand } from '@/components/brand/brand';
import { mainNav } from '@/lib/site';
import type { PublicSiteSettings } from '@/lib/home-content';
import { getWhatsappUrl } from '@/lib/whatsapp';

type FooterProps = {
  settings: PublicSiteSettings;
};

export function Footer({ settings }: FooterProps) {
  const whatsappUrl = getWhatsappUrl(settings.whatsapp);
  const contacts = [
    { label: 'Instagram', href: settings.instagramUrl },
    { label: 'WhatsApp', href: whatsappUrl },
    { label: 'E-mail', href: settings.email ? `mailto:${settings.email}` : null },
  ].filter((contact): contact is { label: string; href: string } => Boolean(contact.href));

  return (
    <footer className={`section ${styles.footer}`}>
      <div className={styles.footerGrid}>
        <Brand />
        <nav aria-label="Navegação do rodapé">
          {mainNav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        {(contacts.length > 0 || settings.address) && (
          <div className={styles.contacts}>
            {contacts.map((contact) => <a key={contact.label} href={contact.href}>{contact.label}</a>)}
            {settings.address && <p>{settings.address}</p>}
          </div>
        )}
      </div>
      <small className={styles.copyright}>© {new Date().getFullYear()} {settings.brandName}. Todos os direitos reservados.</small>
    </footer>
  );
}

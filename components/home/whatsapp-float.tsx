import styles from './closing.module.css';
import { getWhatsappUrl } from '@/lib/whatsapp';
import type { PublicSiteSettings } from '@/lib/home-content';

type WhatsappFloatProps = {
  settings: PublicSiteSettings;
};

export function WhatsappFloat({ settings }: WhatsappFloatProps) {
  const whatsappUrl = getWhatsappUrl(settings.whatsapp);
  if (!whatsappUrl) return null;

  return (
    <a
      className={styles.whatsapp}
      href={whatsappUrl}
      aria-label="Falar pelo WhatsApp"
    >
      ◔ WhatsApp
    </a>
  );
}

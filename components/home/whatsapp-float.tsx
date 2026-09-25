import type { SiteSettings } from '@/lib/site';

type WhatsappFloatProps = {
  settings: SiteSettings;
};

export function WhatsappFloat({ settings }: WhatsappFloatProps) {
  return (
    <a
      className="whatsapp"
      href={settings.contact.whatsapp}
      aria-label={settings.contact.whatsappLabel}
    >
      ◔ WhatsApp
    </a>
  );
}

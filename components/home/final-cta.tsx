import styles from './closing.module.css';
import { getWhatsappUrl } from '@/lib/whatsapp';
import { externalLinkProps } from '@/lib/site';
import type { PublicSiteSettings } from '@/lib/home-content';

type FinalCtaProps = {
  settings: PublicSiteSettings;
};

export function FinalCta({ settings }: FinalCtaProps) {
  const whatsappUrl = getWhatsappUrl(settings.whatsapp);
  const bookingUrl = settings.bookingUrl ?? whatsappUrl;

  return (
    <section className={`section ${styles.cta}`} id="contato">
      <p className="eyebrow">{settings.brandName.toUpperCase()}</p>
      <h2>
        Comece a olhar para sua saúde{' '}
        <br />
        de uma nova forma.
      </h2>
      {(bookingUrl || whatsappUrl) && (
        <div>
          {bookingUrl && (
            <a className="button light" href={bookingUrl} {...externalLinkProps(bookingUrl)}>
              Agendar avaliação <b aria-hidden="true">↗</b>
            </a>
          )}
          {whatsappUrl && (
            <a className="button outline" href={whatsappUrl} {...externalLinkProps(whatsappUrl)}>
              Falar pelo WhatsApp
            </a>
          )}
        </div>
      )}
    </section>
  );
}

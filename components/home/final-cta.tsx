import type { SiteSettings } from '@/lib/site';

type FinalCtaProps = {
  settings: SiteSettings;
};

export function FinalCta({ settings }: FinalCtaProps) {
  return (
    <section className="cta" id="contato">
      <p className="eyebrow">PRISMMA SAÚDE INTEGRATIVA</p>
      <h2>
        Comece a olhar para sua saúde
        <br />
        de uma nova forma.
      </h2>
      <div>
        <a className="button light" href={settings.contact.whatsapp}>
          Agendar avaliação <b>↗</b>
        </a>
        <a className="button outline" href={settings.contact.whatsapp}>
          {settings.contact.whatsappLabel}
        </a>
      </div>
    </section>
  );
}

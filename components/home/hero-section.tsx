import Image from 'next/image';

import { type SiteSettings } from '@/lib/site';

type HeroSectionProps = {
  settings: SiteSettings;
};

export function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="hero" id="inicio">
      <div className="heroCopy">
        <p className="eyebrow">PRISMMA SAÚDE INTEGRATIVA</p>
        <h1>
          Ciência, cuidado
          <br />
          e individualidade.
        </h1>
        <p className="lead">
          Um olhar integrativo para compreender você além dos sintomas e
          construir um plano de cuidado feito para a sua realidade.
        </p>
        <div className="actions">
          <a className="button" href="#contato">
            Agendar avaliação <b>↗</b>
          </a>
          <a className="button ghost" href="#prismma">
            Conheça a Prismma <b>→</b>
          </a>
        </div>
        <p className="pillars">
          Dor persistente <i>•</i> Ansiedade <i>•</i> Vitalidade
        </p>
      </div>
      <div className="portrait">
        <Image
          priority
          fill
          sizes="(max-width: 800px) 100vw, 53vw"
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=85"
          alt={`${settings.professional.name}, ${settings.professional.role}`}
        />
        <div className="caption">
          <strong>{settings.professional.name}</strong>
          <span>{settings.professional.role}</span>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';

import { type PublicSiteSettings } from '@/lib/home-content';

type HeroSectionProps = {
  settings: PublicSiteSettings;
};

export function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="hero" id="inicio">
      <div className="heroCopy">
        <p className="eyebrow">{settings.brandName.toUpperCase()}</p>
        <h1>
          {settings.heroTitle ?? <>Ciência, cuidado<br />e individualidade.</>}
        </h1>
        <p className="lead">
          {settings.heroDescription ?? 'Um olhar integrativo para compreender você além dos sintomas e construir um plano de cuidado feito para a sua realidade.'}
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
          alt=""
        />
        <div className="caption">
          <strong>{settings.professionalName}</strong>
          {settings.professionalRole && <span>{settings.professionalRole}</span>}
        </div>
      </div>
    </section>
  );
}

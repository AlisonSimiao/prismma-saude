import styles from './hero-section.module.css';
import Image from 'next/image';

import { type PublicSiteSettings } from '@/lib/home-content';

type HeroSectionProps = {
  settings: PublicSiteSettings;
};

export function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.copy}>
        <p className="eyebrow">{settings.brandName.toUpperCase()}</p>
        <h1>
          {settings.heroTitle ?? <>Ciência, cuidado{' '}<br />e individualidade.</>}
        </h1>
        <p className={styles.lead}>
          {settings.heroDescription ?? 'Um olhar integrativo para compreender você além dos sintomas e construir um plano de cuidado feito para a sua realidade.'}
        </p>
        <div className={styles.actions}>
          <a className="button" href="#contato">
            Agendar avaliação <b aria-hidden="true">↗</b>
          </a>
          <a className="button ghost" href="#prismma">
            Conheça a Prismma <b aria-hidden="true">→</b>
          </a>
        </div>
        <p className={styles.pillars}>
          <span>Dor persistente</span><i aria-hidden="true">•</i><span>Ansiedade</span><i aria-hidden="true">•</i><span>Vitalidade</span>
        </p>
        <div className={styles.professional}>
          <strong>{settings.professionalName}</strong>
          {settings.professionalRole && <span>{settings.professionalRole}</span>}
        </div>
      </div>
      <div className={styles.portrait}>
        <Image
          priority
          fill
          sizes="(max-width: 760px) 90vw, (max-width: 1440px) 42vw, 510px"
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=85"
          alt=""
        />
      </div>
    </section>
  );
}

import Image from 'next/image';
import { Fragment } from 'react';

import type { PublicSiteSettings } from '@/lib/home-content';

type AboutSectionProps = {
  settings: PublicSiteSettings;
};

const FORMATION = [
  'Enfermagem',
  'Mestrado e PhD',
  'Saúde Integrativa',
  'Processo de Enfermagem',
  'Consulta de Enfermagem',
];

export function AboutSection({ settings }: AboutSectionProps) {
  const { professionalName: name, professionalRole: role } = settings;
  const firstName = name.trim().split(/\s+/)[0];

  return (
    <section className="about" id="fabio">
      <div className="aboutImage">
        <Image
          fill
          sizes="(max-width:800px) 100vw, 38vw"
          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=85"
          alt=""
        />
      </div>
      <div className="aboutCopy">
        <p className="eyebrow">SOBRE {firstName.toUpperCase()}</p>
        <h2>
          {role ? role.split('|').map((part, index) => (
            <Fragment key={index}>{index > 0 && <> <i>|</i> </>}{part.trim()}</Fragment>
          )) : name}
        </h2>
        <p>
          {name} une a formação em enfermagem, a trajetória acadêmica e a
          experiência clínica a uma visão ampla de saúde e cuidado humano.
        </p>
        <p>
          Seu trabalho valoriza o processo de enfermagem e a consulta como
          espaços de escuta, investigação e construção conjunta.
        </p>
        <a className="textLink" href="#contato">
          Conheça a trajetória <b>→</b>
        </a>
      </div>
      <aside>
        <p className="eyebrow">FORMAÇÃO E EXPERIÊNCIA</p>
        <ul>
          {FORMATION.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}

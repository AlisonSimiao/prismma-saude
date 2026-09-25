import styles from './approach.module.css';
import Image from 'next/image';

import type { ProtocolItem } from '@/lib/home-content';

type ProtocolsSectionProps = {
  protocols: ProtocolItem[];
};

export function ProtocolsSection({ protocols }: ProtocolsSectionProps) {
  return (
    <section className={`section ${styles.protocols}`} id="protocolos">
      <div className="heading">
        <div>
          <p className="eyebrow">PROTOCOLOS PRISMMA</p>
          <h2>
            Três caminhos, um mesmo propósito:{' '}
            <br />
            mais qualidade de vida.
          </h2>
        </div>
        <a className="textLink" href="#contato">
          Conheça os protocolos <b aria-hidden="true">→</b>
        </a>
      </div>
      <div className={styles.protocolGrid}>
        {protocols.map((protocol) => (
          <article className={styles.protocol} key={protocol.id}>
            <div className={styles.protocolImage}>
              <Image
                fill
                sizes="(max-width: 700px) 90vw, (max-width: 1440px) 30vw, 380px"
                src={protocol.image}
                alt=""
              />
              <span>{protocol.icon}</span>
            </div>
            <div className={styles.protocolCopy}>
              <h3>{protocol.name}</h3>
              <h4>{protocol.shortName}</h4>
              <p>{protocol.shortDescription}</p>
              <a className="textLink" href="#contato" aria-label={`Saiba mais sobre ${protocol.name}`}>
                Saiba mais <b aria-hidden="true">→</b>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

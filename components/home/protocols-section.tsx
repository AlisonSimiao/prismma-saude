import Image from 'next/image';

import type { ProtocolItem } from '@/lib/home-content';

type ProtocolsSectionProps = {
  protocols: ProtocolItem[];
};

export function ProtocolsSection({ protocols }: ProtocolsSectionProps) {
  return (
    <section className="section protocols" id="protocolos">
      <div className="heading">
        <div>
          <p className="eyebrow">PROTOCOLOS PRISMMA</p>
          <h2>
            Três caminhos, um mesmo propósito:
            <br />
            mais qualidade de vida.
          </h2>
        </div>
        <a className="textLink" href="#contato">
          Conheça os protocolos <b>→</b>
        </a>
      </div>
      <div className="protocolGrid">
        {protocols.map((protocol) => (
          <article className="protocol" key={protocol.id}>
            <div className="protocolImage">
              <Image
                fill
                sizes="(max-width: 800px) 100vw, 33vw"
                src={protocol.image}
                alt=""
              />
              <span>{protocol.icon}</span>
            </div>
            <div className="protocolCopy">
              <h3>{protocol.name}</h3>
              <h4>{protocol.shortName}</h4>
              <p>{protocol.shortDescription}</p>
              <a className="textLink" href="#contato">
                Saiba mais <b>→</b>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

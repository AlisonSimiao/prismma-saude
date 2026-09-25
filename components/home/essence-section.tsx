import type { InstitutionalCardItem } from '@/lib/home-content';

type EssenceSectionProps = {
  cards: InstitutionalCardItem[];
};

export function EssenceSection({ cards }: EssenceSectionProps) {
  return (
    <section className="section values" id="prismma">
      <div className="intro">
        <p className="eyebrow">A ESSÊNCIA DA PRISMMA</p>
        <h2>
          Um cuidado que começa
          <br />
          por compreender você.
        </h2>
      </div>
      <div className="valueGrid">
        {cards.map((card) => (
          <article key={card.id}>
            <span>{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

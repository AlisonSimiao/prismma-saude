import styles from './approach.module.css';
import type { InstitutionalCardItem } from '@/lib/home-content';

type EssenceSectionProps = {
  cards: InstitutionalCardItem[];
};

export function EssenceSection({ cards }: EssenceSectionProps) {
  return (
    <section className={`section ${styles.essence}`} id="prismma">
      <div className={styles.intro}>
        <p className="eyebrow">A ESSÊNCIA DA PRISMMA</p>
        <h2>
          Um cuidado que começa{' '}
          <br />
          por compreender você.
        </h2>
      </div>
      <div className={styles.valueGrid}>
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

import styles from './care.module.css';
const STEPS: ReadonlyArray<readonly [string, string, string]> = [
  ['01', 'Avaliação', 'Conhecimento inicial e escuta ativa.'],
  ['02', 'Identificação', 'Análise dos dados, histórico, exames e contexto.'],
  ['03', 'Protocolo de cuidado', 'Estratégia individualizada para suas necessidades.'],
  ['04', 'Acompanhamento', 'Monitoramento da evolução e ajustes quando necessário.'],
];

export function ProcessSection() {
  return (
    <section className={`section ${styles.process}`}>
      <div className="heading">
        <div>
          <p className="eyebrow">COMO FUNCIONA</p>
          <h2>
            Uma jornada estruturada{' '}
            <br />
            para o seu cuidado.
          </h2>
        </div>
        <p>Do primeiro encontro ao acompanhamento.</p>
      </div>
      <div className={styles.steps}>
        {STEPS.map(([number, title, description]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

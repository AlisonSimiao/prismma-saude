import styles from './care.module.css';
export function IntegrativeSection() {
  return (
    <section className={`section ${styles.integrative}`}>
      <div className={styles.integrativeImg} />
      <div className={styles.integrativeCopy}>
        <p className="eyebrow">ENFERMAGEM + SAÚDE INTEGRATIVA</p>
        <h2>
          Duas forças,{' '}
          <br />
          um mesmo cuidado.
        </h2>
        <p>
          A enfermagem traz o olhar técnico e humano. A saúde integrativa amplia
          a visão, conectando ciência, bem-estar e qualidade de vida.
        </p>
        <a className="button light" href="#contato">
          Saiba mais <b aria-hidden="true">→</b>
        </a>
      </div>
      <aside>
        <span>✦</span>
        <h3>Base científica</h3>
        <p>
          Formação sólida, experiência clínica e pesquisa acadêmica para
          decisões mais seguras e eficazes.
        </p>
        <a className="textLink" href="#fabio">
          Conheça minha trajetória <b aria-hidden="true">→</b>
        </a>
      </aside>
    </section>
  );
}

import styles from './brand.module.css';
import { PrismmaMark } from '@/components/brand/prismma-mark';

type BrandProps = {
  href?: string;
};

export function Brand({ href = '#inicio' }: BrandProps) {
  return (
    <a className={styles.brand} href={href}>
      <PrismmaMark className={styles.mark} />
      <span>
        <b>PRISMMA</b>
        <small>SAÚDE INTEGRATIVA</small>
      </span>
    </a>
  );
}

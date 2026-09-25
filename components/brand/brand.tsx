import { PrismmaMark } from '@/components/brand/prismma-mark';

type BrandProps = {
  href?: string;
};

export function Brand({ href = '#inicio' }: BrandProps) {
  return (
    <a className="brand" href={href}>
      <PrismmaMark />
      <span>
        <b>PRISMMA</b>
        <small>SAÚDE INTEGRATIVA</small>
      </span>
    </a>
  );
}

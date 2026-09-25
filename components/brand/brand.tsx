import { PrismmaMark } from '@/components/brand/prismma-mark';
import { siteConfig } from '@/lib/site';

type BrandProps = {
  href?: string;
};

export function Brand({ href = '#inicio' }: BrandProps) {
  return (
    <a className="brand" href={href}>
      <PrismmaMark />
      <span>
        <b>{siteConfig.shortName}</b>
        <small>{siteConfig.tagline}</small>
      </span>
    </a>
  );
}

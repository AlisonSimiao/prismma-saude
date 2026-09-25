import { Brand } from '@/components/brand/brand';
import { mainNav } from '@/lib/site';

export function Header() {
  return (
    <header>
      <Brand />
      <nav>
        {mainNav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a className="button small" href="#contato">
          Agendar avaliação <b>↗</b>
        </a>
      </nav>
    </header>
  );
}

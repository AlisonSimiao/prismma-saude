import { Brand } from '@/components/brand/brand';
import { mainNav } from '@/lib/site';
import { MobileNavigation } from './mobile-navigation';
import styles from './layout.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <a className="skipLink" href="#conteudo">Ir para o conteúdo</a>
      <div className={styles.headerInner}>
        <Brand />
        <nav className={styles.desktopNav} aria-label="Navegação principal">
          {mainNav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a className="button small" href="#contato">Agendar avaliação <b aria-hidden="true">↗</b></a>
        </nav>
        <MobileNavigation />
      </div>
    </header>
  );
}

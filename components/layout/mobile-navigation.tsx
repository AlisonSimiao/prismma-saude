'use client';

import { useEffect, useRef, useState } from 'react';
import { mainNav } from '@/lib/site';
import styles from './layout.module.css';

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    const closeOutside = (event: Event) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1001px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('focusin', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('focusin', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  function selectItem() {
    setOpen(false);
  }

  return (
    <div className={styles.mobile} ref={root}>
      <button ref={button} type="button" className={styles.menuButton} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
        {open ? 'Fechar' : 'Menu'}
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d={open ? 'M4 4l12 12M16 4L4 16' : 'M2 5h16M2 10h16M2 15h16'} /></svg>
      </button>
      <nav id="mobile-navigation" aria-label="Navegação principal móvel" className={styles.mobilePanel} hidden={!open}>
        {mainNav.map((item) => <a key={item.href} href={item.href} onClick={selectItem}>{item.label}</a>)}
        <a className="button" href="#contato" onClick={selectItem}>Agendar avaliação <b aria-hidden="true">↗</b></a>
      </nav>
    </div>
  );
}

'use client';
import Image from 'next/image'; import { useRef, useState } from 'react';
type Item = { id: string; name: string; text: string; photo: string | null };
export default function Testimonials({ items }: { items: Item[] }) {
 const track = useRef<HTMLDivElement>(null); const [active, setActive] = useState(0);
 const go = (i: number) => { const n = (i + items.length) % items.length; track.current?.children[n]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }); setActive(n); };
 if (!items.length) return <div className="slider"><div className="quote empty">Em breve, este espaço reunirá experiências compartilhadas por pacientes.</div></div>;
 return <div className="slider">
  {items.length > 1 && <button className="arrow prev" aria-label="Depoimento anterior" onClick={() => go(active - 1)}>‹</button>}
  <div className="track" ref={track}>{items.map(t => <figure className="quote" key={t.id}>{t.photo ? <Image unoptimized width={64} height={64} src={t.photo} alt="" /> : <span className="avatar">{t.name[0]}</span>}<div><blockquote>“{t.text}”</blockquote><figcaption><b>{t.name}</b><small>Paciente Prismma</small></figcaption></div></figure>)}</div>
  {items.length > 1 && <button className="arrow next" aria-label="Próximo depoimento" onClick={() => go(active + 1)}>›</button>}
  {items.length > 1 && <div className="dots">{items.map((t, i) => <button key={t.id} aria-label={`Depoimento ${i + 1}`} className={i === active ? 'on' : ''} onClick={() => go(i)} />)}</div>}
 </div>;
}

import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const display = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-display' });
const sans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Prismma Saúde Integrativa | Fabio Leandro',
  description: 'Ciência, cuidado e individualidade. Saúde integrativa com Fabio Leandro, Enfermeiro | PhD.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}><body>{children}</body></html>;
}

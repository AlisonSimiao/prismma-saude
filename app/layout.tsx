import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const display = Playfair_Display({ subsets: ['latin'], variable: '--serif', display: 'swap' });
const sans = DM_Sans({ subsets: ['latin'], variable: '--sans', display: 'swap' });

export const metadata: Metadata = {
  title: 'Prismma Saúde Integrativa | Fabio Leandro',
  description: 'Ciência, cuidado e individualidade. Saúde integrativa com Fabio Leandro.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

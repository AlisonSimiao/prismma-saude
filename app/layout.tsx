import type { Metadata } from 'next'; import './globals.css';
export const metadata: Metadata = { title:'Prismma Saúde Integrativa | Fabio Leandro', description:'Ciência, cuidado e individualidade. Saúde integrativa com Fabio Leandro, Enfermeiro | PhD.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }

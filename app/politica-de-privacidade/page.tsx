import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Política de Privacidade | Prismma Saúde Integrativa' };

export default function PrivacyPolicy() {
 return <main className="section legal"><p className="eyebrow">PRISMMA SAÚDE INTEGRATIVA</p><h1>Política de Privacidade</h1>
  <p>A PRISMMA Saúde Integrativa, sob responsabilidade de Fabio Leandro (COREN-SP: 758.892), respeita a privacidade e a confidencialidade das informações de seus usuários e clientes, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).</p>
  <p>Os dados pessoais fornecidos por meio do site, WhatsApp ou durante as Consultas de Enfermagem poderão ser utilizados exclusivamente para agendamento, comunicação, prestação dos serviços de saúde, elaboração de planos de cuidado, acompanhamento e cumprimento de obrigações legais e profissionais.</p>
  <p>As informações pessoais e de saúde serão tratadas com sigilo profissional, sendo adotadas medidas para prevenir acessos não autorizados, perdas ou divulgações indevidas.</p>
  <p>Os dados não serão comercializados e somente poderão ser compartilhados quando necessário à prestação dos serviços, mediante fundamento legal adequado ou para cumprimento de obrigações legais.</p>
  <p>Para dúvidas sobre privacidade e proteção de dados, entre em contato pelo canal oficial disponibilizado neste site.</p>
  <Link className="textLink" href="/">Voltar para o início <b>→</b></Link>
 </main>;
}

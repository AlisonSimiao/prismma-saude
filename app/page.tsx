import { AboutSection } from '@/components/home/about-section';
import { AssessmentSection } from '@/components/home/assessment-section';
import { EssenceSection } from '@/components/home/essence-section';
import { FinalCta } from '@/components/home/final-cta';
import { HeroSection } from '@/components/home/hero-section';
import { IntegrativeSection } from '@/components/home/integrative-section';
import { ProcessSection } from '@/components/home/process-section';
import { ProofSection } from '@/components/home/proof-section';
import { ProtocolsSection } from '@/components/home/protocols-section';
import { WhatsappFloat } from '@/components/home/whatsapp-float';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { getHomeContent } from '@/lib/home-content';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getHomeContent();
  const { settings, protocols, cards, faqs, testimonials } = content;

  return (
    <>
      <Header />

      <main>
        <HeroSection settings={settings} />
        <EssenceSection cards={cards} />
        <ProtocolsSection protocols={protocols} />
        <AssessmentSection />
        <ProcessSection />
        <AboutSection settings={settings} />
        <IntegrativeSection />
        <ProofSection testimonials={testimonials} faqs={faqs} />
        <FinalCta settings={settings} />
      </main>

      <Footer settings={settings} />
      <WhatsappFloat settings={settings} />
    </>
  );
}

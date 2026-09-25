import { FaqSection } from '@/components/home/faq-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import type { FaqItem, TestimonialItem } from '@/lib/home-content';

type ProofSectionProps = {
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
};

export function ProofSection({ testimonials, faqs }: ProofSectionProps) {
  return (
    <section className="section proof">
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={faqs} />
    </section>
  );
}

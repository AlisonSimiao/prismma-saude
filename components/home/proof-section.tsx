import styles from './closing.module.css';
import { FaqSection } from '@/components/home/faq-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import type { FaqItem, TestimonialItem } from '@/lib/home-content';

type ProofSectionProps = {
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
};

export function ProofSection({ testimonials, faqs }: ProofSectionProps) {
  return (
    <section className={`section ${styles.proof} ${testimonials.length ? styles.withTestimonials : ''}`}>
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={faqs} />
    </section>
  );
}

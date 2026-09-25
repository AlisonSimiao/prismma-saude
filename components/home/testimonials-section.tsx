import styles from './closing.module.css';
import type { TestimonialItem } from '@/lib/home-content';

type TestimonialsSectionProps = {
  testimonials: TestimonialItem[];
};

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <div className={styles.testimonials}>
      <p className="eyebrow">DEPOIMENTOS</p>
      <h2>Histórias reais de quem já viveu essa experiência.</h2>
      {testimonials.map((testimonial) => (
        <blockquote key={testimonial.id}>
          “{testimonial.text}” <cite>{testimonial.name}</cite>
        </blockquote>
      ))}
    </div>
  );
}

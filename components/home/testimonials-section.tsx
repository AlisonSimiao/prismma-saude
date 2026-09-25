import type { TestimonialItem } from '@/lib/home-content';

type TestimonialsSectionProps = {
  testimonials: TestimonialItem[];
};

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <div>
      <p className="eyebrow">DEPOIMENTOS</p>
      <h2>Histórias reais de quem já viveu essa experiência.</h2>
      {testimonials.length > 0 ? (
        testimonials.map((testimonial) => (
          <blockquote key={testimonial.id}>
            “{testimonial.text}” <cite>{testimonial.name}</cite>
          </blockquote>
        ))
      ) : (
        <div className="empty">
          Em breve, este espaço reunirá experiências compartilhadas por
          pacientes.
        </div>
      )}
    </div>
  );
}

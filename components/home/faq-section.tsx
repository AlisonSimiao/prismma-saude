import type { FaqItem } from '@/lib/home-content';

type FaqSectionProps = {
  faqs: FaqItem[];
};

export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <div className="faq">
      <p className="eyebrow">PERGUNTAS FREQUENTES</p>
      <h2>
        Tire suas dúvidas antes
        <br />
        do atendimento.
      </h2>
      {faqs.map((faq, index) => (
        <details key={faq.id} open={index === 0}>
          <summary>
            {faq.question}
            <b>+</b>
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

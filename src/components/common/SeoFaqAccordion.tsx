// FAQ 아코디언 UI와 FAQPage JSON-LD 구조화 데이터를 함께 렌더링하는 재사용 컴포넌트
export type FaqItem = {
  question: string;
  answer: string;
};

export function SeoFaqAccordion({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((item) => (
        <details key={item.question} className="group p-4 open:pb-4 sm:p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground">
            {item.question}
            <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
        </details>
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

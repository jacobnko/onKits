// 개인정보처리방침/이용약관 등 법적 문서의 제목+본문 섹션을 렌더링하는 공용 컴포넌트
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

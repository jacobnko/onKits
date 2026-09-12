// 계산 위젯 결과 카드의 라벨-값 한 줄을 렌더링하는 공용 컴포넌트
export function ResultRow({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={emphasize ? "text-lg font-bold text-primary" : "text-sm font-medium text-foreground"}>
        {value}
      </span>
    </div>
  );
}

// CLS(레이아웃 시프트) 방지를 위해 고정 최소 높이를 예약하는 광고 슬롯 래퍼
const VARIANT_CLASS = {
  "top-leaderboard": "min-h-[90px] md:min-h-[100px] w-full",
  "in-content-native": "min-h-[250px] md:min-h-[280px] w-full",
  "sticky-sidebar": "min-h-[600px] w-[300px]",
} as const;

type AdVariant = keyof typeof VARIANT_CLASS;

export function AdSlot({
  variant,
  className = "",
}: {
  variant: AdVariant;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted text-xs text-muted-foreground ${VARIANT_CLASS[variant]} ${className}`}
    >
      스폰서 / Advertisement
    </div>
  );
}

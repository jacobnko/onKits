// CLS(레이아웃 시프트) 방지를 위해 고정 최소 높이를 예약하는 광고 슬롯 래퍼
import { useTranslations } from "next-intl";

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
  const t = useTranslations("ad");

  return (
    <div
      className={`flex items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400 ${VARIANT_CLASS[variant]} ${className}`}
    >
      {t("label")}
    </div>
  );
}

// 카테고리 C 히어로용 - 아이콘을 큰 스퀴클 도형 + 떠 있는 장식 원으로 감싼 일러스트형 배지
import type { LucideIcon } from "lucide-react";

export function ToolIllustration({
  icon: Icon,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div className="relative h-28 w-28 shrink-0">
      <span
        className={`absolute -right-2 -top-2 h-8 w-8 rounded-full opacity-70 ${className}`}
        aria-hidden
      />
      <span
        className={`absolute -bottom-1 -left-3 h-6 w-6 rounded-full opacity-50 ${className}`}
        aria-hidden
      />
      <span
        className={`relative flex h-28 w-28 items-center justify-center rounded-[2rem] ${className}`}
      >
        <Icon className="h-12 w-12" strokeWidth={1.75} />
      </span>
    </div>
  );
}

// 홈페이지 툴 그리드의 카테고리 탭 (전체 + 카테고리별)
import { CATEGORIES, type ToolCategory } from "@/lib/tools";

type FilterValue = ToolCategory | "all";

export function CategoryFilter({
  value,
  onChange,
  counts,
}: {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
}) {
  const options: { key: FilterValue; label: string }[] = [
    { key: "all", label: "전체" },
    ...CATEGORIES.map((c) => ({ key: c.key, label: c.label })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key)}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            value === option.key
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary/40"
          }`}
        >
          {option.label}
          <span className="ml-1.5 opacity-70">{counts[option.key] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}

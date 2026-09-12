// 홈페이지 그리드에서 개별 툴을 소개하는 카드 - 컬러 아이콘 타일 + 이름 + 설명
import Link from "next/link";
import type { ToolMeta } from "@/lib/tools";

export function ToolCard({ tool }: { tool: ToolMeta }) {
  const Icon = tool.icon;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tool.iconClassName} transition-transform group-hover:scale-105`}
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </span>
      <div>
        <p className="font-semibold text-foreground">{tool.name}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
      </div>
    </Link>
  );
}

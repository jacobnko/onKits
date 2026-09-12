// 카테고리 C(생산성·콘텐츠·텍스트) 전용 레이아웃 - 좌우 분할 일러스트 히어로 + 위젯/팁 2단 구성으로
// 카테고리 A(중앙 정렬 아이콘 + 단일 컬럼)와 시각적으로 차별화한다.
import type { ReactNode } from "react";
import { AdSlot } from "@/components/common/AdSlot";
import { SeoFaqAccordion, type FaqItem } from "@/components/common/SeoFaqAccordion";
import { ToolIllustration } from "@/components/tools/ToolIllustration";
import { TOOLS } from "@/lib/tools";
import Link from "next/link";

type RuleRow = { label: string; value: string };
type RelatedTool = { slug: string; name: string; description: string };

type Props = {
  toolSlug: string;
  heroTitle: string;
  heroSubtitle: string;
  tip: string;
  widget: ReactNode;
  overviewTitle: string;
  overviewBody: string[];
  rulesTitle: string;
  rules: RuleRow[];
  faqTitle: string;
  faqItems: FaqItem[];
  relatedTitle: string;
  relatedTools: RelatedTool[];
};

export function ProductivityToolShell({
  toolSlug,
  heroTitle,
  heroSubtitle,
  tip,
  widget,
  overviewTitle,
  overviewBody,
  rulesTitle,
  rules,
  faqTitle,
  faqItems,
  relatedTitle,
  relatedTools,
}: Props) {
  const tool = TOOLS.find((t) => t.slug === toolSlug);
  const Icon = tool?.icon;

  return (
    <div className="theme-productivity mx-auto max-w-6xl px-4 py-10">
      {/* Zone 1 히어로: 좌측 일러스트 + 우측 텍스트 (카테고리 A의 중앙 정렬과 구분) */}
      <section className="mb-8 flex flex-col items-center gap-6 rounded-3xl bg-secondary/60 p-6 sm:flex-row sm:gap-8 sm:p-10">
        {Icon && tool && <ToolIllustration icon={Icon} className={tool.iconClassName} />}
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{heroTitle}</h1>
          <p className="text-muted-foreground">{heroSubtitle}</p>
        </div>
      </section>

      <AdSlot variant="top-leaderboard" className="mb-8" />

      {/* Zone 1 위젯 + 사이드 팁 카드: 카테고리 A의 단일 중앙 컬럼과 달리 좌우 2단 구성 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">{widget}</div>
        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-primary">빠른 팁</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip}</p>
          </div>
          <AdSlot variant="sticky-sidebar" className="hidden w-full lg:flex" />
        </aside>
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-10">
        {/* Zone 2: Native In-Article Ad Slot */}
        <AdSlot variant="in-content-native" />

        {/* Zone 3: Rich Structured Documentation */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-foreground">{overviewTitle}</h2>
          {overviewBody.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-foreground">{rulesTitle}</h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {rules.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0 even:bg-secondary/30">
                    <th className="w-1/3 px-4 py-3 text-left font-medium text-foreground">{row.label}</th>
                    <td className="px-4 py-3 text-muted-foreground">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-foreground">{faqTitle}</h2>
          <SeoFaqAccordion items={faqItems} />
        </section>

        <AdSlot variant="in-content-native" />

        {/* Zone 4: Related Tools Grid */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-foreground">{relatedTitle}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {relatedTools.map((related) => {
              const relatedTool = TOOLS.find((t) => t.slug === related.slug);
              const RelatedIcon = relatedTool?.icon;
              return (
                <Link
                  key={related.slug}
                  href={`/tools/${related.slug}`}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
                >
                  {RelatedIcon && relatedTool && (
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${relatedTool.iconClassName}`}
                    >
                      <RelatedIcon className="h-4 w-4" strokeWidth={2} />
                    </span>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{related.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{related.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

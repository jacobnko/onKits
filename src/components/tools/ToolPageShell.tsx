// 툴 상세 페이지 공통 레이아웃 - 4-Zone 구조 + 광고 인벤토리(상단/본문 2곳/xl 사이드바)를 배치
import type { ReactNode } from "react";
import { AdSlot } from "@/components/common/AdSlot";
import { SeoFaqAccordion, type FaqItem } from "@/components/common/SeoFaqAccordion";
import { TOOLS } from "@/lib/tools";
import Link from "next/link";

type RuleRow = { label: string; value: string };
type RelatedTool = { slug: string; name: string; description: string };

type Props = {
  toolSlug: string;
  heroTitle: string;
  heroSubtitle: string;
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

export function ToolPageShell({
  toolSlug,
  heroTitle,
  heroSubtitle,
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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <AdSlot variant="top-leaderboard" className="mb-8" />

      <div className="flex items-start gap-8">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10">
          {/* Zone 1: Interactive Tool Widget */}
          <section className="flex flex-col items-center gap-4 text-center">
            {Icon && tool && (
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.iconClassName}`}>
                <Icon className="h-7 w-7" strokeWidth={2} />
              </span>
            )}
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{heroTitle}</h1>
            <p className="text-muted-foreground">{heroSubtitle}</p>
          </section>

          {widget}

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

          {/* Zone 2 (추가): FAQ 이후 두 번째 인콘텐츠 광고 슬롯 */}
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

        <aside className="hidden shrink-0 xl:block">
          <div className="sticky top-20">
            <AdSlot variant="sticky-sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}

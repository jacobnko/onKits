// youth-savings 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { YouthSavingsWidget } from "@/components/tools/youth-savings/YouthSavingsWidget";
import { youthSavingsContent } from "./content";

export const metadata: Metadata = {
  title: youthSavingsContent.meta.title,
  description: youthSavingsContent.meta.description,
};

export default function YouthSavingsPage() {
  return (
    <ToolPageShell
      heroTitle={youthSavingsContent.heroTitle}
      heroSubtitle={youthSavingsContent.heroSubtitle}
      widget={<YouthSavingsWidget />}
      overviewTitle={youthSavingsContent.overview.title}
      overviewBody={youthSavingsContent.overview.body}
      rulesTitle={youthSavingsContent.rules.title}
      rules={youthSavingsContent.rules.rows}
      faqTitle={youthSavingsContent.faq.title}
      faqItems={youthSavingsContent.faq.items}
      relatedTitle={youthSavingsContent.related.title}
      relatedTools={youthSavingsContent.related.tools}
    />
  );
}

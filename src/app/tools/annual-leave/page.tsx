// annual-leave 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { AnnualLeaveWidget } from "@/components/tools/annual-leave/AnnualLeaveWidget";
import { annualLeaveContent } from "./content";

export const metadata: Metadata = {
  title: annualLeaveContent.meta.title,
  description: annualLeaveContent.meta.description,
};

export default function AnnualLeavePage() {
  return (
    <ToolPageShell
      heroTitle={annualLeaveContent.heroTitle}
      heroSubtitle={annualLeaveContent.heroSubtitle}
      widget={<AnnualLeaveWidget />}
      overviewTitle={annualLeaveContent.overview.title}
      overviewBody={annualLeaveContent.overview.body}
      rulesTitle={annualLeaveContent.rules.title}
      rules={annualLeaveContent.rules.rows}
      faqTitle={annualLeaveContent.faq.title}
      faqItems={annualLeaveContent.faq.items}
      relatedTitle={annualLeaveContent.related.title}
      relatedTools={annualLeaveContent.related.tools}
    />
  );
}

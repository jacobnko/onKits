// unemployment-benefit 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { UnemploymentBenefitWidget } from "@/components/tools/unemployment-benefit/UnemploymentBenefitWidget";
import { unemploymentBenefitContent } from "./content";

export const metadata: Metadata = {
  title: unemploymentBenefitContent.meta.title,
  description: unemploymentBenefitContent.meta.description,
};

export default function UnemploymentBenefitPage() {
  return (
    <ToolPageShell
      toolSlug="unemployment-benefit"
      heroTitle={unemploymentBenefitContent.heroTitle}
      heroSubtitle={unemploymentBenefitContent.heroSubtitle}
      widget={<UnemploymentBenefitWidget />}
      overviewTitle={unemploymentBenefitContent.overview.title}
      overviewBody={unemploymentBenefitContent.overview.body}
      rulesTitle={unemploymentBenefitContent.rules.title}
      rules={unemploymentBenefitContent.rules.rows}
      faqTitle={unemploymentBenefitContent.faq.title}
      faqItems={unemploymentBenefitContent.faq.items}
      relatedTitle={unemploymentBenefitContent.related.title}
      relatedTools={unemploymentBenefitContent.related.tools}
    />
  );
}

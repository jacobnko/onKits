// tax-calc 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TaxCalcWidget } from "@/components/tools/tax-calc/TaxCalcWidget";
import { taxCalcContent } from "./content";

export const metadata: Metadata = {
  title: taxCalcContent.meta.title,
  description: taxCalcContent.meta.description,
};

export default function TaxCalcPage() {
  return (
    <ToolPageShell
      toolSlug="tax-calc"
      heroTitle={taxCalcContent.heroTitle}
      heroSubtitle={taxCalcContent.heroSubtitle}
      widget={<TaxCalcWidget />}
      overviewTitle={taxCalcContent.overview.title}
      overviewBody={taxCalcContent.overview.body}
      rulesTitle={taxCalcContent.rules.title}
      rules={taxCalcContent.rules.rows}
      faqTitle={taxCalcContent.faq.title}
      faqItems={taxCalcContent.faq.items}
      relatedTitle={taxCalcContent.related.title}
      relatedTools={taxCalcContent.related.tools}
    />
  );
}

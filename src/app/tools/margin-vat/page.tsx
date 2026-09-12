// margin-vat 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { MarginVatWidget } from "@/components/tools/margin-vat/MarginVatWidget";
import { marginVatContent } from "./content";

export const metadata: Metadata = {
  title: marginVatContent.meta.title,
  description: marginVatContent.meta.description,
};

export default function MarginVatPage() {
  return (
    <ToolPageShell
      toolSlug="margin-vat"
      heroTitle={marginVatContent.heroTitle}
      heroSubtitle={marginVatContent.heroSubtitle}
      widget={<MarginVatWidget />}
      overviewTitle={marginVatContent.overview.title}
      overviewBody={marginVatContent.overview.body}
      rulesTitle={marginVatContent.rules.title}
      rules={marginVatContent.rules.rows}
      faqTitle={marginVatContent.faq.title}
      faqItems={marginVatContent.faq.items}
      relatedTitle={marginVatContent.related.title}
      relatedTools={marginVatContent.related.tools}
    />
  );
}

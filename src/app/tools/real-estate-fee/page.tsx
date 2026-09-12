// real-estate-fee 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { RealEstateFeeWidget } from "@/components/tools/real-estate-fee/RealEstateFeeWidget";
import { realEstateFeeContent } from "./content";

export const metadata: Metadata = {
  title: realEstateFeeContent.meta.title,
  description: realEstateFeeContent.meta.description,
};

export default function RealEstateFeePage() {
  return (
    <ToolPageShell
      heroTitle={realEstateFeeContent.heroTitle}
      heroSubtitle={realEstateFeeContent.heroSubtitle}
      widget={<RealEstateFeeWidget />}
      overviewTitle={realEstateFeeContent.overview.title}
      overviewBody={realEstateFeeContent.overview.body}
      rulesTitle={realEstateFeeContent.rules.title}
      rules={realEstateFeeContent.rules.rows}
      faqTitle={realEstateFeeContent.faq.title}
      faqItems={realEstateFeeContent.faq.items}
      relatedTitle={realEstateFeeContent.related.title}
      relatedTools={realEstateFeeContent.related.tools}
    />
  );
}

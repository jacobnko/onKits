// transparent-seal 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { TransparentSealWidget } from "@/components/tools/transparent-seal/TransparentSealWidget";
import { transparentSealContent } from "./content";

export const metadata: Metadata = {
  title: transparentSealContent.meta.title,
  description: transparentSealContent.meta.description,
};

export default function TransparentSealPage() {
  return (
    <ToolPageShell
      toolSlug="transparent-seal"
      heroTitle={transparentSealContent.heroTitle}
      heroSubtitle={transparentSealContent.heroSubtitle}
      widget={<TransparentSealWidget />}
      overviewTitle={transparentSealContent.overview.title}
      overviewBody={transparentSealContent.overview.body}
      rulesTitle={transparentSealContent.rules.title}
      rules={transparentSealContent.rules.rows}
      faqTitle={transparentSealContent.faq.title}
      faqItems={transparentSealContent.faq.items}
      relatedTitle={transparentSealContent.related.title}
      relatedTools={transparentSealContent.related.tools}
    />
  );
}

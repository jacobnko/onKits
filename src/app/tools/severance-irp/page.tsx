// severance-irp 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { SeveranceIrpWidget } from "@/components/tools/severance-irp/SeveranceIrpWidget";
import { severanceIrpContent } from "./content";

export const metadata: Metadata = {
  title: severanceIrpContent.meta.title,
  description: severanceIrpContent.meta.description,
};

export default function SeveranceIrpPage() {
  return (
    <ToolPageShell
      heroTitle={severanceIrpContent.heroTitle}
      heroSubtitle={severanceIrpContent.heroSubtitle}
      widget={<SeveranceIrpWidget />}
      overviewTitle={severanceIrpContent.overview.title}
      overviewBody={severanceIrpContent.overview.body}
      rulesTitle={severanceIrpContent.rules.title}
      rules={severanceIrpContent.rules.rows}
      faqTitle={severanceIrpContent.faq.title}
      faqItems={severanceIrpContent.faq.items}
      relatedTitle={severanceIrpContent.related.title}
      relatedTools={severanceIrpContent.related.tools}
    />
  );
}

// pdf-merge 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { PdfMergeWidget } from "@/components/tools/pdf-merge/PdfMergeWidget";
import { pdfMergeContent } from "./content";

export const metadata: Metadata = {
  title: pdfMergeContent.meta.title,
  description: pdfMergeContent.meta.description,
};

export default function PdfMergePage() {
  return (
    <ToolPageShell
      toolSlug="pdf-merge"
      heroTitle={pdfMergeContent.heroTitle}
      heroSubtitle={pdfMergeContent.heroSubtitle}
      widget={<PdfMergeWidget />}
      overviewTitle={pdfMergeContent.overview.title}
      overviewBody={pdfMergeContent.overview.body}
      rulesTitle={pdfMergeContent.rules.title}
      rules={pdfMergeContent.rules.rows}
      faqTitle={pdfMergeContent.faq.title}
      faqItems={pdfMergeContent.faq.items}
      relatedTitle={pdfMergeContent.related.title}
      relatedTools={pdfMergeContent.related.tools}
    />
  );
}

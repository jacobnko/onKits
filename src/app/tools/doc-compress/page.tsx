// doc-compress 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { DocCompressWidget } from "@/components/tools/doc-compress/DocCompressWidget";
import { docCompressContent } from "./content";

export const metadata: Metadata = {
  title: docCompressContent.meta.title,
  description: docCompressContent.meta.description,
};

export default function DocCompressPage() {
  return (
    <ToolPageShell
      toolSlug="doc-compress"
      heroTitle={docCompressContent.heroTitle}
      heroSubtitle={docCompressContent.heroSubtitle}
      widget={<DocCompressWidget />}
      overviewTitle={docCompressContent.overview.title}
      overviewBody={docCompressContent.overview.body}
      rulesTitle={docCompressContent.rules.title}
      rules={docCompressContent.rules.rows}
      faqTitle={docCompressContent.faq.title}
      faqItems={docCompressContent.faq.items}
      relatedTitle={docCompressContent.related.title}
      relatedTools={docCompressContent.related.tools}
    />
  );
}

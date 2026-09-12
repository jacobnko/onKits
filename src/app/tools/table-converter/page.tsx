// table-converter 툴 페이지 - ProductivityToolShell(카테고리 C 전용 레이아웃)로 구성
import type { Metadata } from "next";
import { ProductivityToolShell } from "@/components/tools/ProductivityToolShell";
import { TableConverterWidget } from "@/components/tools/table-converter/TableConverterWidget";
import { tableConverterContent } from "./content";

export const metadata: Metadata = {
  title: tableConverterContent.meta.title,
  description: tableConverterContent.meta.description,
};

export default function TableConverterPage() {
  return (
    <ProductivityToolShell
      toolSlug="table-converter"
      heroTitle={tableConverterContent.heroTitle}
      heroSubtitle={tableConverterContent.heroSubtitle}
      tip={tableConverterContent.tip}
      widget={<TableConverterWidget />}
      overviewTitle={tableConverterContent.overview.title}
      overviewBody={tableConverterContent.overview.body}
      rulesTitle={tableConverterContent.rules.title}
      rules={tableConverterContent.rules.rows}
      faqTitle={tableConverterContent.faq.title}
      faqItems={tableConverterContent.faq.items}
      relatedTitle={tableConverterContent.related.title}
      relatedTools={tableConverterContent.related.tools}
    />
  );
}

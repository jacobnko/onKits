// unit-converter 툴 페이지 - ProductivityToolShell(카테고리 C 전용 레이아웃)로 구성
import type { Metadata } from "next";
import { ProductivityToolShell } from "@/components/tools/ProductivityToolShell";
import { UnitConverterWidget } from "@/components/tools/unit-converter/UnitConverterWidget";
import { unitConverterContent } from "./content";

export const metadata: Metadata = {
  title: unitConverterContent.meta.title,
  description: unitConverterContent.meta.description,
};

export default function UnitConverterPage() {
  return (
    <ProductivityToolShell
      toolSlug="unit-converter"
      heroTitle={unitConverterContent.heroTitle}
      heroSubtitle={unitConverterContent.heroSubtitle}
      tip={unitConverterContent.tip}
      widget={<UnitConverterWidget />}
      overviewTitle={unitConverterContent.overview.title}
      overviewBody={unitConverterContent.overview.body}
      rulesTitle={unitConverterContent.rules.title}
      rules={unitConverterContent.rules.rows}
      faqTitle={unitConverterContent.faq.title}
      faqItems={unitConverterContent.faq.items}
      relatedTitle={unitConverterContent.related.title}
      relatedTools={unitConverterContent.related.tools}
    />
  );
}

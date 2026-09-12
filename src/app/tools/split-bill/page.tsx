// split-bill 툴 페이지 - ProductivityToolShell(카테고리 C 전용 레이아웃)로 구성
import type { Metadata } from "next";
import { ProductivityToolShell } from "@/components/tools/ProductivityToolShell";
import { SplitBillWidget } from "@/components/tools/split-bill/SplitBillWidget";
import { splitBillContent } from "./content";

export const metadata: Metadata = {
  title: splitBillContent.meta.title,
  description: splitBillContent.meta.description,
};

export default function SplitBillPage() {
  return (
    <ProductivityToolShell
      toolSlug="split-bill"
      heroTitle={splitBillContent.heroTitle}
      heroSubtitle={splitBillContent.heroSubtitle}
      tip={splitBillContent.tip}
      widget={<SplitBillWidget />}
      overviewTitle={splitBillContent.overview.title}
      overviewBody={splitBillContent.overview.body}
      rulesTitle={splitBillContent.rules.title}
      rules={splitBillContent.rules.rows}
      faqTitle={splitBillContent.faq.title}
      faqItems={splitBillContent.faq.items}
      relatedTitle={splitBillContent.related.title}
      relatedTools={splitBillContent.related.tools}
    />
  );
}

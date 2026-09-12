// receipt-pdf 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ReceiptPdfWidget } from "@/components/tools/receipt-pdf/ReceiptPdfWidget";
import { receiptPdfContent } from "./content";

export const metadata: Metadata = {
  title: receiptPdfContent.meta.title,
  description: receiptPdfContent.meta.description,
};

export default function ReceiptPdfPage() {
  return (
    <ToolPageShell
      toolSlug="receipt-pdf"
      heroTitle={receiptPdfContent.heroTitle}
      heroSubtitle={receiptPdfContent.heroSubtitle}
      widget={<ReceiptPdfWidget />}
      overviewTitle={receiptPdfContent.overview.title}
      overviewBody={receiptPdfContent.overview.body}
      rulesTitle={receiptPdfContent.rules.title}
      rules={receiptPdfContent.rules.rows}
      faqTitle={receiptPdfContent.faq.title}
      faqItems={receiptPdfContent.faq.items}
      relatedTitle={receiptPdfContent.related.title}
      relatedTools={receiptPdfContent.related.tools}
    />
  );
}

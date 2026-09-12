// qr-code 툴 페이지 - ProductivityToolShell(카테고리 C 전용 레이아웃)로 구성
import type { Metadata } from "next";
import { ProductivityToolShell } from "@/components/tools/ProductivityToolShell";
import { QrCodeWidget } from "@/components/tools/qr-code/QrCodeWidget";
import { qrCodeContent } from "./content";

export const metadata: Metadata = {
  title: qrCodeContent.meta.title,
  description: qrCodeContent.meta.description,
};

export default function QrCodePage() {
  return (
    <ProductivityToolShell
      toolSlug="qr-code"
      heroTitle={qrCodeContent.heroTitle}
      heroSubtitle={qrCodeContent.heroSubtitle}
      tip={qrCodeContent.tip}
      widget={<QrCodeWidget />}
      overviewTitle={qrCodeContent.overview.title}
      overviewBody={qrCodeContent.overview.body}
      rulesTitle={qrCodeContent.rules.title}
      rules={qrCodeContent.rules.rows}
      faqTitle={qrCodeContent.faq.title}
      faqItems={qrCodeContent.faq.items}
      relatedTitle={qrCodeContent.related.title}
      relatedTools={qrCodeContent.related.tools}
    />
  );
}

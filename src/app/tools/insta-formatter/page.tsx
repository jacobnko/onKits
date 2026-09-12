// insta-formatter 툴 페이지 - ProductivityToolShell(카테고리 C 전용 레이아웃)로 구성
import type { Metadata } from "next";
import { ProductivityToolShell } from "@/components/tools/ProductivityToolShell";
import { InstaFormatterWidget } from "@/components/tools/insta-formatter/InstaFormatterWidget";
import { instaFormatterContent } from "./content";

export const metadata: Metadata = {
  title: instaFormatterContent.meta.title,
  description: instaFormatterContent.meta.description,
};

export default function InstaFormatterPage() {
  return (
    <ProductivityToolShell
      toolSlug="insta-formatter"
      heroTitle={instaFormatterContent.heroTitle}
      heroSubtitle={instaFormatterContent.heroSubtitle}
      tip={instaFormatterContent.tip}
      widget={<InstaFormatterWidget />}
      overviewTitle={instaFormatterContent.overview.title}
      overviewBody={instaFormatterContent.overview.body}
      rulesTitle={instaFormatterContent.rules.title}
      rules={instaFormatterContent.rules.rows}
      faqTitle={instaFormatterContent.faq.title}
      faqItems={instaFormatterContent.faq.items}
      relatedTitle={instaFormatterContent.related.title}
      relatedTools={instaFormatterContent.related.tools}
    />
  );
}

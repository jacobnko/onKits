// image-converter 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ImageConverterWidget } from "@/components/tools/image-converter/ImageConverterWidget";
import { imageConverterContent } from "./content";

export const metadata: Metadata = {
  title: imageConverterContent.meta.title,
  description: imageConverterContent.meta.description,
};

export default function ImageConverterPage() {
  return (
    <ToolPageShell
      toolSlug="image-converter"
      heroTitle={imageConverterContent.heroTitle}
      heroSubtitle={imageConverterContent.heroSubtitle}
      widget={<ImageConverterWidget />}
      overviewTitle={imageConverterContent.overview.title}
      overviewBody={imageConverterContent.overview.body}
      rulesTitle={imageConverterContent.rules.title}
      rules={imageConverterContent.rules.rows}
      faqTitle={imageConverterContent.faq.title}
      faqItems={imageConverterContent.faq.items}
      relatedTitle={imageConverterContent.related.title}
      relatedTools={imageConverterContent.related.tools}
    />
  );
}

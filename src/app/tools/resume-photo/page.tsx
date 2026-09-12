// resume-photo 툴 페이지 - ToolPageShell로 4-Zone(+추가 광고 슬롯) 구조를 구성
import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ResumePhotoWidget } from "@/components/tools/resume-photo/ResumePhotoWidget";
import { resumePhotoContent } from "./content";

export const metadata: Metadata = {
  title: resumePhotoContent.meta.title,
  description: resumePhotoContent.meta.description,
};

export default function ResumePhotoPage() {
  return (
    <ToolPageShell
      toolSlug="resume-photo"
      heroTitle={resumePhotoContent.heroTitle}
      heroSubtitle={resumePhotoContent.heroSubtitle}
      widget={<ResumePhotoWidget />}
      overviewTitle={resumePhotoContent.overview.title}
      overviewBody={resumePhotoContent.overview.body}
      rulesTitle={resumePhotoContent.rules.title}
      rules={resumePhotoContent.rules.rows}
      faqTitle={resumePhotoContent.faq.title}
      faqItems={resumePhotoContent.faq.items}
      relatedTitle={resumePhotoContent.related.title}
      relatedTools={resumePhotoContent.related.tools}
    />
  );
}

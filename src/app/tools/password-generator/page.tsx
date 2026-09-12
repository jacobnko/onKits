// password-generator 툴 페이지 - ProductivityToolShell(카테고리 C 전용 레이아웃)로 구성
import type { Metadata } from "next";
import { ProductivityToolShell } from "@/components/tools/ProductivityToolShell";
import { PasswordGeneratorWidget } from "@/components/tools/password-generator/PasswordGeneratorWidget";
import { passwordGeneratorContent } from "./content";

export const metadata: Metadata = {
  title: passwordGeneratorContent.meta.title,
  description: passwordGeneratorContent.meta.description,
};

export default function PasswordGeneratorPage() {
  return (
    <ProductivityToolShell
      toolSlug="password-generator"
      heroTitle={passwordGeneratorContent.heroTitle}
      heroSubtitle={passwordGeneratorContent.heroSubtitle}
      tip={passwordGeneratorContent.tip}
      widget={<PasswordGeneratorWidget />}
      overviewTitle={passwordGeneratorContent.overview.title}
      overviewBody={passwordGeneratorContent.overview.body}
      rulesTitle={passwordGeneratorContent.rules.title}
      rules={passwordGeneratorContent.rules.rows}
      faqTitle={passwordGeneratorContent.faq.title}
      faqItems={passwordGeneratorContent.faq.items}
      relatedTitle={passwordGeneratorContent.related.title}
      relatedTools={passwordGeneratorContent.related.tools}
    />
  );
}

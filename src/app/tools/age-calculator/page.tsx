// age-calculator 툴 페이지 - ProductivityToolShell(카테고리 C 전용 레이아웃)로 구성
import type { Metadata } from "next";
import { ProductivityToolShell } from "@/components/tools/ProductivityToolShell";
import { AgeCalculatorWidget } from "@/components/tools/age-calculator/AgeCalculatorWidget";
import { ageCalculatorContent } from "./content";

export const metadata: Metadata = {
  title: ageCalculatorContent.meta.title,
  description: ageCalculatorContent.meta.description,
};

export default function AgeCalculatorPage() {
  return (
    <ProductivityToolShell
      toolSlug="age-calculator"
      heroTitle={ageCalculatorContent.heroTitle}
      heroSubtitle={ageCalculatorContent.heroSubtitle}
      tip={ageCalculatorContent.tip}
      widget={<AgeCalculatorWidget />}
      overviewTitle={ageCalculatorContent.overview.title}
      overviewBody={ageCalculatorContent.overview.body}
      rulesTitle={ageCalculatorContent.rules.title}
      rules={ageCalculatorContent.rules.rows}
      faqTitle={ageCalculatorContent.faq.title}
      faqItems={ageCalculatorContent.faq.items}
      relatedTitle={ageCalculatorContent.related.title}
      relatedTools={ageCalculatorContent.related.tools}
    />
  );
}

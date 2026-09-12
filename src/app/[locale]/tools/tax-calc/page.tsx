// tax-calc 툴 페이지 - Zone1 계산기, Zone2 광고, Zone3 문서, Zone4 관련 도구로 구성
// 한국 세법/근로기준법 기준 도구이므로 ko 로케일에서만 제공한다.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { AdSlot } from "@/components/common/AdSlot";
import { SeoFaqAccordion, type FaqItem } from "@/components/common/SeoFaqAccordion";
import { TaxCalcWidget } from "@/components/tools/tax-calc/TaxCalcWidget";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: "ko" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "ko") {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "tools.taxCalc.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

type RuleRow = { label: string; value: string };

const RELATED_TOOLS = [
  { slug: "margin-vat", key: "marginVat" },
  { slug: "annual-leave", key: "annualLeave" },
  { slug: "severance-irp", key: "severanceIrp" },
] as const;

export default async function TaxCalcPage({ params }: Props) {
  const { locale } = await params;

  if (locale !== "ko") {
    notFound();
  }

  setRequestLocale(locale);

  return <TaxCalcPageContent />;
}

function TaxCalcPageContent() {
  const t = useTranslations("tools.taxCalc");
  const tCards = useTranslations("toolCards");
  const rows = t.raw("rules.rows") as RuleRow[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10">
      {/* Zone 1: Interactive Tool Widget */}
      <section className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t("heroTitle")}
        </h1>
        <p className="text-muted-foreground">{t("heroSubtitle")}</p>
      </section>

      <TaxCalcWidget />

      {/* Zone 2: Native In-Article Ad Slot */}
      <AdSlot variant="in-content-native" />

      {/* Zone 3: Rich Structured Documentation */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-foreground">{t("overview.title")}</h2>
        <p className="leading-relaxed text-muted-foreground">{t("overview.body1")}</p>
        <p className="leading-relaxed text-muted-foreground">{t("overview.body2")}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-foreground">{t("rules.title")}</h2>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0 even:bg-secondary/30">
                  <th className="w-1/3 px-4 py-3 text-left font-medium text-foreground">{row.label}</th>
                  <td className="px-4 py-3 text-muted-foreground">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-foreground">{t("faq.title")}</h2>
        <SeoFaqAccordion items={faqItems} />
      </section>

      {/* Zone 4: Related Tools Grid */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-foreground">{t("related.title")}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {RELATED_TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <p className="font-semibold text-foreground">{tCards(`${tool.key}.name`)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tCards(`${tool.key}.description`)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

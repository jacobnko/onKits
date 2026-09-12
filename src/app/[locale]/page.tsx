// OnKits 허브 홈페이지 - 히어로, 신뢰 지표, 광고 슬롯 배치를 확인하기 위한 최소 뼈대
import { useTranslations } from "next-intl";
import { AdSlot } from "@/components/common/AdSlot";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <AdSlot variant="top-leaderboard" />

      <section className="flex flex-col items-center gap-4 py-10 text-center">
        <span className="rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
          {t("badge")}
        </span>

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="max-w-xl text-muted-foreground sm:text-lg">{t("heroSubtitle")}</p>

        <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <span className="text-accent"><CheckIcon /></span>
            {t("trust1")}
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-accent"><CheckIcon /></span>
            {t("trust2")}
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-accent"><CheckIcon /></span>
            {t("trust3")}
          </li>
        </ul>
      </section>

      <AdSlot variant="in-content-native" />
    </div>
  );
}

// OnKits 허브 홈페이지 - 히어로, 광고 슬롯 배치를 확인하기 위한 최소 뼈대
import { useTranslations } from "next-intl";
import { AdSlot } from "@/components/common/AdSlot";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
      <AdSlot variant="top-leaderboard" />

      <section className="flex flex-col gap-3 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("heroTitle")}
        </h1>
        <p className="text-slate-500">{t("heroSubtitle")}</p>
      </section>

      <AdSlot variant="in-content-native" />
    </div>
  );
}

// OnKits 허브 홈페이지 - 히어로, 신뢰 지표, 툴 그리드, 광고 슬롯 배치
import { Check } from "lucide-react";
import { AdSlot } from "@/components/common/AdSlot";
import { ToolsExplorer } from "@/components/home/ToolsExplorer";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10">
      <AdSlot variant="top-leaderboard" />

      <section className="flex flex-col items-center gap-4 py-6 text-center">
        <span className="rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
          완전 무료 · 회원가입 없음
        </span>

        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          모두를 위한 스마트 실무 키트, OnKits
        </h1>
        <p className="max-w-xl text-muted-foreground sm:text-lg">
          설치 없이, 회원가입 없이. 브라우저에서 바로 끝내는 계산기와 변환기 모음.
        </p>

        <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <span className="text-accent"><Check className="h-4 w-4" strokeWidth={2.4} /></span>
            설치 필요 없음
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-accent"><Check className="h-4 w-4" strokeWidth={2.4} /></span>
            개인정보 서버 저장 없음
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-accent"><Check className="h-4 w-4" strokeWidth={2.4} /></span>
            완전 무료
          </li>
        </ul>
      </section>

      <ToolsExplorer />

      <AdSlot variant="in-content-native" />
    </div>
  );
}

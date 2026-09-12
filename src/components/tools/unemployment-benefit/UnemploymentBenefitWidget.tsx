"use client";

// 실업급여 수급자격 자가진단 체크리스트와 구직급여 모의계산기를 탭으로 제공하는 위젯
import { useMemo, useState } from "react";
import { calcUnemploymentBenefit, type AgeGroup } from "@/lib/calculations/unemployment-benefit";
import { AmountInput } from "@/components/tools/shared/AmountInput";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type Tab = "checklist" | "simulate";

const CHECKLIST_ITEMS = [
  { key: "insuredDays", label: "이직일 이전 18개월간 피보험단위기간이 통산 180일 이상이다" },
  { key: "involuntary", label: "비자발적으로 이직했다 (권고사직, 계약만료, 폐업, 정당한 사유의 자발적 이직 등)" },
  { key: "willingToWork", label: "근로의 의사와 능력이 있으나 현재 취업하지 못한 상태다" },
  { key: "activeJobSearch", label: "적극적으로 재취업 활동을 할 계획이다" },
] as const;

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function UnemploymentBenefitWidget() {
  const [tab, setTab] = useState<Tab>("checklist");

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const checkedCount = CHECKLIST_ITEMS.filter((item) => checked[item.key]).length;
  const allChecked = checkedCount === CHECKLIST_ITEMS.length;

  const [monthlyWage, setMonthlyWage] = useState(2800000);
  const [insuredMonths, setInsuredMonths] = useState(24);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("under50");

  const benefitResult = useMemo(
    () => calcUnemploymentBenefit(monthlyWage, insuredMonths, ageGroup),
    [monthlyWage, insuredMonths, ageGroup]
  );

  const checklistSummary = `자가진단 결과: ${checkedCount}/${CHECKLIST_ITEMS.length}개 항목 충족`;
  const simulateSummary = `1일 구직급여액: ${formatWon(benefitResult.dailyBenefit)}\n소정급여일수: ${benefitResult.prescribedDays}일\n예상 총 수급액: ${formatWon(benefitResult.totalBenefit)}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("checklist")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "checklist" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          수급자격 자가진단
        </button>
        <button
          type="button"
          onClick={() => setTab("simulate")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "simulate" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          구직급여 모의계산
        </button>
      </div>

      {tab === "checklist" ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {CHECKLIST_ITEMS.map((item) => (
              <label
                key={item.key}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-border px-4 py-3 text-sm"
              >
                <input
                  type="checkbox"
                  checked={checked[item.key] ?? false}
                  onChange={(e) => setChecked((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <span className="text-foreground">{item.label}</span>
              </label>
            ))}
          </div>

          <div
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              allChecked ? "bg-accent/10 text-accent" : "bg-secondary/60 text-secondary-foreground"
            }`}
          >
            {allChecked
              ? "네 항목을 모두 충족해요. 수급자격을 인정받을 가능성이 높습니다. (고용센터 최종 심사 필요)"
              : `${checkedCount}/${CHECKLIST_ITEMS.length}개 항목을 충족했어요. 체크하지 않은 항목을 확인해보세요.`}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">이직 전 평균 월급여 (세전, 원)</span>
            <AmountInput value={monthlyWage} onChange={setMonthlyWage} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">고용보험 가입기간 (개월)</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={insuredMonths}
              onChange={(e) => setInsuredMonths(Number(e.target.value) || 0)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <div className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">연령</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAgeGroup("under50")}
                className={`rounded-full border px-3 py-1 ${
                  ageGroup === "under50" ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
              >
                50세 미만
              </button>
              <button
                type="button"
                onClick={() => setAgeGroup("over50")}
                className={`rounded-full border px-3 py-1 ${
                  ageGroup === "over50" ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
              >
                50세 이상/장애인
              </button>
            </div>
          </div>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="1일 구직급여액" value={formatWon(benefitResult.dailyBenefit)} />
            <ResultRow label="소정급여일수" value={`${benefitResult.prescribedDays}일`} />
            <ResultRow label="예상 총 수급액" value={formatWon(benefitResult.totalBenefit)} emphasize />
          </div>
        </div>
      )}

      <div className="mt-5">
        <ResultActions
          storageKey="unemployment-benefit"
          summary={tab === "checklist" ? checklistSummary : simulateSummary}
        />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        본 결과는 참고용 자가진단·모의계산이며, 실제 수급자격 인정과 지급액은 고용센터의 최종 심사를 통해
        결정됩니다. 구직급여일액 하한액은 최저임금 기준으로 별도 적용될 수 있습니다.
      </p>
    </div>
  );
}

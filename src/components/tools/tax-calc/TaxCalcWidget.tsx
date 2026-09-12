"use client";

// 프리랜서 3.3% 원천징수 계산기와 알바 주휴수당 계산기를 탭으로 제공하는 인터랙티브 위젯
import { useMemo, useState } from "react";
import {
  calcFreelanceWithholding,
  type FreelanceWithholdingMode,
} from "@/lib/calculations/freelance-withholding";
import { calcWeeklyHolidayPay } from "@/lib/calculations/weekly-holiday-pay";
import { AmountInput } from "@/components/tools/shared/AmountInput";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type Tab = "freelance" | "weeklyHoliday";

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function TaxCalcWidget() {
  const [tab, setTab] = useState<Tab>("freelance");

  const [freelanceAmount, setFreelanceAmount] = useState(2000000);
  const [freelanceMode, setFreelanceMode] = useState<FreelanceWithholdingMode>("gross");

  const [hourlyWage, setHourlyWage] = useState(10030);
  const [weeklyHours, setWeeklyHours] = useState(20);

  const freelanceResult = useMemo(
    () => calcFreelanceWithholding(freelanceAmount, freelanceMode),
    [freelanceAmount, freelanceMode]
  );

  const weeklyHolidayResult = useMemo(
    () => calcWeeklyHolidayPay(hourlyWage, weeklyHours),
    [hourlyWage, weeklyHours]
  );

  const summary =
    tab === "freelance"
      ? `지급액: ${formatWon(freelanceResult.grossPay)}\n원천징수세액 (3.3%): ${formatWon(freelanceResult.withholdingTax)}\n실수령액: ${formatWon(freelanceResult.netPay)}`
      : `주휴수당: ${formatWon(weeklyHolidayResult.weeklyHolidayPay)}\n주급 합계: ${formatWon(weeklyHolidayResult.weeklyTotalPay)}\n월 환산 예상 급여 (세전): ${formatWon(weeklyHolidayResult.monthlyEstimatedPay)}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("freelance")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "freelance" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          프리랜서 원천징수
        </button>
        <button
          type="button"
          onClick={() => setTab("weeklyHoliday")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "weeklyHoliday" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          알바 주휴수당
        </button>
      </div>

      {tab === "freelance" ? (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => setFreelanceMode("gross")}
              className={`rounded-full border px-3 py-1 ${
                freelanceMode === "gross" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              지급액 기준
            </button>
            <button
              type="button"
              onClick={() => setFreelanceMode("net")}
              className={`rounded-full border px-3 py-1 ${
                freelanceMode === "net" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              실수령액 기준
            </button>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">
              {freelanceMode === "gross" ? "지급액 (세전, 원)" : "목표 실수령액 (원)"}
            </span>
            <AmountInput value={freelanceAmount} onChange={setFreelanceAmount} />
          </label>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="지급액" value={formatWon(freelanceResult.grossPay)} />
            <ResultRow label="원천징수세액 (3.3%)" value={`- ${formatWon(freelanceResult.withholdingTax)}`} />
            <ResultRow label="실수령액" value={formatWon(freelanceResult.netPay)} emphasize />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">시급 (원)</span>
            <AmountInput value={hourlyWage} onChange={setHourlyWage} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">1주 근무시간 (시간)</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={168}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value) || 0)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          {!weeklyHolidayResult.eligible && (
            <p className="rounded-xl bg-secondary/60 px-4 py-2.5 text-sm text-secondary-foreground">
              주 15시간 미만 근무는 주휴수당 지급 대상이 아닙니다.
            </p>
          )}

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="주휴수당" value={formatWon(weeklyHolidayResult.weeklyHolidayPay)} />
            <ResultRow label="주급 합계" value={formatWon(weeklyHolidayResult.weeklyTotalPay)} />
            <ResultRow
              label="월 환산 예상 급여 (세전)"
              value={formatWon(weeklyHolidayResult.monthlyEstimatedPay)}
              emphasize
            />
          </div>
        </div>
      )}

      <div className="mt-5">
        <ResultActions storageKey="tax-calc" summary={summary} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        본 계산 결과는 참고용이며, 실제 세액·급여는 4대보험 공제, 간이세액표 등에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}

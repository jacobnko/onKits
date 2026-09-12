"use client";

// 입사일/회계연도 기준 연차 일수 계산기와 미사용 연차수당 계산기를 탭으로 제공하는 위젯
import { useMemo, useState } from "react";
import {
  calcAnnualLeaveByFiscalYear,
  calcAnnualLeaveByHireDate,
} from "@/lib/calculations/annual-leave";
import { calcLeaveAllowance } from "@/lib/calculations/leave-allowance";
import { AmountInput } from "@/components/tools/shared/AmountInput";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type Tab = "days" | "allowance";
type Method = "hireDate" | "fiscal";

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

const TODAY = new Date();
const CURRENT_YEAR = TODAY.getFullYear();
const YEAR_OPTIONS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];

export function AnnualLeaveWidget() {
  const [tab, setTab] = useState<Tab>("days");
  const [method, setMethod] = useState<Method>("hireDate");

  const [hireDate, setHireDate] = useState("2023-03-02");
  const [asOfDate, setAsOfDate] = useState(toDateInputValue(TODAY));
  const [targetYear, setTargetYear] = useState(CURRENT_YEAR);

  const [monthlySalary, setMonthlySalary] = useState(3000000);
  const [unusedDays, setUnusedDays] = useState(5);

  const hireDateResult = useMemo(() => {
    if (!hireDate || !asOfDate) return null;
    return calcAnnualLeaveByHireDate(new Date(hireDate), new Date(asOfDate));
  }, [hireDate, asOfDate]);

  const fiscalResult = useMemo(() => {
    if (!hireDate) return null;
    return calcAnnualLeaveByFiscalYear(new Date(hireDate), targetYear);
  }, [hireDate, targetYear]);

  const allowanceResult = useMemo(
    () => calcLeaveAllowance(monthlySalary, unusedDays),
    [monthlySalary, unusedDays]
  );

  const daysSummary =
    method === "hireDate" && hireDateResult
      ? `입사일 기준 연차: ${hireDateResult.leaveDays}일 (근속 ${hireDateResult.tenureYears}년 ${hireDateResult.tenureMonths % 12}개월)`
      : fiscalResult
        ? `${targetYear}년 회계연도 기준 연차: ${fiscalResult.leaveDays}일`
        : "";

  const allowanceSummary = `1일 통상임금: ${formatWon(allowanceResult.dailyWage)}\n미사용 연차수당: ${formatWon(allowanceResult.allowance)}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("days")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "days" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          연차 일수 계산
        </button>
        <button
          type="button"
          onClick={() => setTab("allowance")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "allowance" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          연차수당 계산
        </button>
      </div>

      {tab === "days" ? (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => setMethod("hireDate")}
              className={`rounded-full border px-3 py-1 ${
                method === "hireDate" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              입사일 기준
            </button>
            <button
              type="button"
              onClick={() => setMethod("fiscal")}
              className={`rounded-full border px-3 py-1 ${
                method === "fiscal" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              회계연도 기준
            </button>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">입사일</span>
            <input
              type="date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          {method === "hireDate" ? (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">기준일</span>
              <input
                type="date"
                value={asOfDate}
                onChange={(e) => setAsOfDate(e.target.value)}
                className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </label>
          ) : (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">기준 회계연도</span>
              <select
                value={targetYear}
                onChange={(e) => setTargetYear(Number(e.target.value))}
                className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {YEAR_OPTIONS.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </label>
          )}

          {method === "hireDate" && hireDateResult ? (
            <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
              <ResultRow
                label="근속 기간"
                value={`${hireDateResult.tenureYears}년 ${hireDateResult.tenureMonths % 12}개월`}
              />
              <ResultRow label="발생 연차" value={`${hireDateResult.leaveDays}일`} emphasize />
            </div>
          ) : fiscalResult ? (
            <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
              <ResultRow
                label="구분"
                value={fiscalResult.isHireYear ? "입사연도 (비례 발생)" : `근속 ${fiscalResult.tenureYears}년차`}
              />
              <ResultRow label={`${targetYear}년 발생 연차`} value={`${fiscalResult.leaveDays}일`} emphasize />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">월 통상임금 (원)</span>
            <AmountInput value={monthlySalary} onChange={setMonthlySalary} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">미사용 연차일수</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={25}
              value={unusedDays}
              onChange={(e) => setUnusedDays(Number(e.target.value) || 0)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="1일 통상임금" value={formatWon(allowanceResult.dailyWage)} />
            <ResultRow label="미사용 연차수당" value={formatWon(allowanceResult.allowance)} emphasize />
          </div>
        </div>
      )}

      <div className="mt-5">
        <ResultActions storageKey="annual-leave" summary={tab === "days" ? daysSummary : allowanceSummary} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        본 계산 결과는 근로기준법 제60조 기준 참고용이며, 실제 연차는 회사의 취업규칙·단체협약, 출근율(80% 이상)
        요건 등에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}

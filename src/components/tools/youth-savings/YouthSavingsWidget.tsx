"use client";

// 청년도약계좌 정부기여금과 5년 만기 비과세 수령액을 계산하는 시뮬레이터 위젯
import { useMemo, useState } from "react";
import { calcYouthSavings } from "@/lib/calculations/youth-savings";
import { AmountInput } from "@/components/tools/shared/AmountInput";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function YouthSavingsWidget() {
  const [annualIncome, setAnnualIncome] = useState(30000000);
  const [monthlyContribution, setMonthlyContribution] = useState(500000);
  const [annualRate, setAnnualRate] = useState(4.5);

  const result = useMemo(
    () => calcYouthSavings(annualIncome, monthlyContribution, annualRate),
    [annualIncome, monthlyContribution, annualRate]
  );

  const summary = `월 정부기여금: ${formatWon(result.monthlyMatch)}\n60개월 총 납입액: ${formatWon(result.totalDeposit)}\n총 정부기여금: ${formatWon(result.totalMatch)}\n예상 이자(비과세): ${formatWon(result.totalInterest)}\n만기 예상 수령액: ${formatWon(result.maturityAmount)}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">연 소득 (총급여, 세전, 원)</span>
          <AmountInput value={annualIncome} onChange={setAnnualIncome} />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">월 납입액 (원, 최대 70만원)</span>
          <AmountInput value={monthlyContribution} onChange={setMonthlyContribution} />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">예상 연 금리 (%, 비과세 적용 전)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={15}
            step={0.1}
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
            className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>

        <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
          <ResultRow label="정부기여금 매칭비율" value={`${(result.matchRate * 100).toFixed(1)}%`} />
          <ResultRow label="월 정부기여금" value={formatWon(result.monthlyMatch)} />
          <ResultRow label="60개월 총 납입액" value={formatWon(result.totalDeposit)} />
          <ResultRow label="총 정부기여금 (5년)" value={formatWon(result.totalMatch)} />
          <ResultRow label="예상 이자 (비과세)" value={formatWon(result.totalInterest)} />
          <ResultRow label="만기 예상 수령액" value={formatWon(result.maturityAmount)} emphasize />
        </div>
      </div>

      <div className="mt-5">
        <ResultActions storageKey="youth-savings" summary={summary} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        본 계산은 참고용 시뮬레이션입니다. 실제 정부기여금과 금리는 가입 은행, 소득 변동, 정책 개정에 따라
        달라질 수 있으며, 개인소득 7,500만원 초과 또는 가구소득 기준 초과 시 가입 대상에서 제외됩니다.
      </p>
    </div>
  );
}

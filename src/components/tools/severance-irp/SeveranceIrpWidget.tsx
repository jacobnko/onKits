"use client";

// 법정 퇴직금 계산기와 IRP 이전 절세 시뮬레이터를 탭으로 제공하는 위젯
import { useMemo, useState } from "react";
import { calcSeverancePay } from "@/lib/calculations/severance-pay";
import { calcIrpTaxSaving, type PensionBracket } from "@/lib/calculations/irp-tax-saving";
import { AmountInput } from "@/components/tools/shared/AmountInput";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type Tab = "severance" | "irp";

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

const TODAY = new Date();

export function SeveranceIrpWidget() {
  const [tab, setTab] = useState<Tab>("severance");

  const [hireDate, setHireDate] = useState("2021-05-01");
  const [resignDate, setResignDate] = useState(toDateInputValue(TODAY));
  const [threeMonthWage, setThreeMonthWage] = useState(9000000);

  const [severancePay, setSeverancePay] = useState(15000000);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(5);
  const [bracket, setBracket] = useState<PensionBracket>("under10");

  const severanceResult = useMemo(() => {
    if (!hireDate || !resignDate) return null;
    return calcSeverancePay(new Date(hireDate), new Date(resignDate), threeMonthWage);
  }, [hireDate, resignDate, threeMonthWage]);

  const irpResult = useMemo(
    () => calcIrpTaxSaving(severancePay, effectiveTaxRate, bracket),
    [severancePay, effectiveTaxRate, bracket]
  );

  const severanceSummary = severanceResult
    ? `재직일수: ${severanceResult.serviceDays}일\n1일 평균임금: ${formatWon(severanceResult.averageDailyWage)}\n예상 퇴직금: ${formatWon(severanceResult.severancePay)}`
    : "";

  const irpSummary = `일시금 실수령액: ${formatWon(irpResult.lumpSumNet)}\nIRP 연금 수령 실수령액: ${formatWon(irpResult.pensionNet)}\n절세액: ${formatWon(irpResult.taxSaved)}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("severance")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "severance" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          법정 퇴직금 계산
        </button>
        <button
          type="button"
          onClick={() => setTab("irp")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "irp" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          IRP 절세 시뮬레이터
        </button>
      </div>

      {tab === "severance" ? (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">입사일</span>
            <input
              type="date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">퇴사일</span>
            <input
              type="date"
              value={resignDate}
              onChange={(e) => setResignDate(e.target.value)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">퇴직 전 3개월 총 급여 (세전, 원)</span>
            <AmountInput value={threeMonthWage} onChange={setThreeMonthWage} />
          </label>

          {severanceResult && (
            <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
              <ResultRow label="재직일수" value={`${severanceResult.serviceDays}일`} />
              <ResultRow label="1일 평균임금" value={formatWon(severanceResult.averageDailyWage)} />
              <ResultRow label="예상 법정 퇴직금" value={formatWon(severanceResult.severancePay)} emphasize />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">퇴직금 총액 (원)</span>
            <AmountInput value={severancePay} onChange={setSeverancePay} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">예상 실효 퇴직소득세율 (%)</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={45}
              step={0.1}
              value={effectiveTaxRate}
              onChange={(e) => setEffectiveTaxRate(Number(e.target.value) || 0)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <div className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">연금 실제 수령 연차</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setBracket("under10")}
                className={`rounded-full border px-3 py-1 text-sm ${
                  bracket === "under10" ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
              >
                10년 이하 (30% 감면)
              </button>
              <button
                type="button"
                onClick={() => setBracket("over10")}
                className={`rounded-full border px-3 py-1 text-sm ${
                  bracket === "over10" ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
              >
                10년 초과 (40% 감면)
              </button>
            </div>
          </div>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="일시금 수령 시 퇴직소득세" value={`- ${formatWon(irpResult.lumpSumTax)}`} />
            <ResultRow label="일시금 실수령액" value={formatWon(irpResult.lumpSumNet)} />
            <ResultRow label="IRP 연금 수령 시 실수령액" value={formatWon(irpResult.pensionNet)} emphasize />
            <ResultRow label="예상 절세액" value={formatWon(irpResult.taxSaved)} emphasize />
          </div>
        </div>
      )}

      <div className="mt-5">
        <ResultActions storageKey="severance-irp" summary={tab === "severance" ? severanceSummary : irpSummary} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        본 계산 결과는 참고용입니다. 실제 평균임금 산정, 퇴직소득세는 상여금·연차수당 반영 여부, 근속연수공제,
        환산급여공제 등에 따라 달라지므로 정확한 금액은 국세청 홈택스 또는 세무 전문가를 통해 확인하세요.
      </p>
    </div>
  );
}

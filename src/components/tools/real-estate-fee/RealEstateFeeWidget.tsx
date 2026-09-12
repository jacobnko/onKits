"use client";

// 부동산 중개수수료(복비) 계산기와 취득세 간편 계산기를 탭으로 제공하는 위젯
import { useMemo, useState } from "react";
import {
  calcAcquisitionTax,
  calcBrokerageFee,
  type DealType,
} from "@/lib/calculations/real-estate-fee";
import { AmountInput } from "@/components/tools/shared/AmountInput";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type Tab = "brokerage" | "acquisitionTax";

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function RealEstateFeeWidget() {
  const [tab, setTab] = useState<Tab>("brokerage");

  const [dealType, setDealType] = useState<DealType>("sale");
  const [price, setPrice] = useState(500000000);
  const [deposit, setDeposit] = useState(300000000);
  const [monthlyRent, setMonthlyRent] = useState(0);

  const [taxPrice, setTaxPrice] = useState(500000000);

  const dealAmount = dealType === "sale" ? price : deposit + monthlyRent * 100;

  const brokerageResult = useMemo(
    () => calcBrokerageFee(dealAmount, dealType),
    [dealAmount, dealType]
  );

  const taxResult = useMemo(() => calcAcquisitionTax(taxPrice), [taxPrice]);

  const brokerageSummary = `적용 요율: ${(brokerageResult.rate * 100).toFixed(2)}%\n중개보수 상한액: ${formatWon(brokerageResult.feeCeiling)}`;
  const taxSummary = `취득세율: ${(taxResult.taxRate * 100).toFixed(2)}%\n취득세: ${formatWon(taxResult.acquisitionTax)}\n지방교육세: ${formatWon(taxResult.localEducationTax)}\n합계: ${formatWon(taxResult.totalTax)}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("brokerage")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "brokerage" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          중개수수료 계산
        </button>
        <button
          type="button"
          onClick={() => setTab("acquisitionTax")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "acquisitionTax" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          취득세 계산
        </button>
      </div>

      {tab === "brokerage" ? (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => setDealType("sale")}
              className={`rounded-full border px-3 py-1 ${
                dealType === "sale" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              매매
            </button>
            <button
              type="button"
              onClick={() => setDealType("lease")}
              className={`rounded-full border px-3 py-1 ${
                dealType === "lease" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              전/월세
            </button>
          </div>

          {dealType === "sale" ? (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-foreground">매매가 (원)</span>
              <AmountInput value={price} onChange={setPrice} />
            </label>
          ) : (
            <>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">보증금 (원)</span>
                <AmountInput value={deposit} onChange={setDeposit} />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-foreground">월세 (원, 전세는 0)</span>
                <AmountInput value={monthlyRent} onChange={setMonthlyRent} />
              </label>
            </>
          )}

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="거래금액(환산)" value={formatWon(dealAmount)} />
            <ResultRow label="적용 요율" value={`${(brokerageResult.rate * 100).toFixed(2)}%`} />
            <ResultRow label="중개보수 상한액" value={formatWon(brokerageResult.feeCeiling)} emphasize />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">취득가액 (원)</span>
            <AmountInput value={taxPrice} onChange={setTaxPrice} />
          </label>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="취득세율" value={`${(taxResult.taxRate * 100).toFixed(2)}%`} />
            <ResultRow label="취득세" value={formatWon(taxResult.acquisitionTax)} />
            <ResultRow label="지방교육세" value={formatWon(taxResult.localEducationTax)} />
            <ResultRow label="합계 납부세액" value={formatWon(taxResult.totalTax)} emphasize />
          </div>
        </div>
      )}

      <div className="mt-5">
        <ResultActions
          storageKey="real-estate-fee"
          summary={tab === "brokerage" ? brokerageSummary : taxSummary}
        />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        중개보수는 공인중개사법 시행규칙상 상한요율이며 실제 보수는 협의에 따라 달라질 수 있습니다. 취득세는
        1주택자 표준세율 기준 간편 계산으로, 다주택자 중과세율·농어촌특별세는 반영되지 않았습니다. 정확한
        금액은 위택스 또는 중개사무소를 통해 확인하세요.
      </p>
    </div>
  );
}

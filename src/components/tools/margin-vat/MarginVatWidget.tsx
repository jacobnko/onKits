"use client";

// 오픈마켓 순마진 계산기와 부가세 역산기를 탭으로 제공하는 인터랙티브 위젯
import { useMemo, useState } from "react";
import { calcMarketplaceMargin } from "@/lib/calculations/marketplace-margin";
import { calcVat, type VatMode } from "@/lib/calculations/vat-reverse";
import { AmountInput } from "@/components/tools/shared/AmountInput";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type Tab = "margin" | "vat";

const FEE_PRESETS = [
  { label: "스마트스토어", rate: 3.63 },
  { label: "쿠팡", rate: 10.8 },
  { label: "지마켓/옥션", rate: 11 },
] as const;

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function MarginVatWidget() {
  const [tab, setTab] = useState<Tab>("margin");

  const [salePrice, setSalePrice] = useState(30000);
  const [costPrice, setCostPrice] = useState(15000);
  const [feeRate, setFeeRate] = useState(3.63);

  const [vatMode, setVatMode] = useState<VatMode>("inclusive");
  const [vatAmount, setVatAmount] = useState(110000);

  const marginResult = useMemo(
    () => calcMarketplaceMargin(salePrice, costPrice, feeRate),
    [salePrice, costPrice, feeRate]
  );

  const vatResult = useMemo(() => calcVat(vatAmount, vatMode), [vatAmount, vatMode]);

  const summary =
    tab === "margin"
      ? `수수료: ${formatWon(marginResult.feeAmount)}\n순마진: ${formatWon(marginResult.netMargin)}\n마진율: ${marginResult.marginRate.toFixed(1)}%`
      : `공급가액: ${formatWon(vatResult.supplyPrice)}\n부가세 (10%): ${formatWon(vatResult.vat)}\n부가세 포함가: ${formatWon(vatResult.inclusivePrice)}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("margin")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "margin" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          순마진 계산기
        </button>
        <button
          type="button"
          onClick={() => setTab("vat")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "vat" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          부가세 역산기
        </button>
      </div>

      {tab === "margin" ? (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">판매가 (원)</span>
            <AmountInput value={salePrice} onChange={setSalePrice} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">원가 (원)</span>
            <AmountInput value={costPrice} onChange={setCostPrice} />
          </label>

          <div className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">판매 수수료율</span>
            <div className="flex flex-wrap gap-2">
              {FEE_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setFeeRate(preset.rate)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    feeRate === preset.rate ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {preset.label} {preset.rate}%
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                value={feeRate}
                onChange={(e) => setFeeRate(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-border px-4 py-2.5 pr-8 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-muted-foreground">
                %
              </span>
            </div>
          </div>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="수수료" value={`- ${formatWon(marginResult.feeAmount)}`} />
            <ResultRow label="순마진" value={formatWon(marginResult.netMargin)} emphasize />
            <ResultRow label="마진율" value={`${marginResult.marginRate.toFixed(1)}%`} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 text-sm">
            <button
              type="button"
              onClick={() => setVatMode("inclusive")}
              className={`rounded-full border px-3 py-1 ${
                vatMode === "inclusive" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              부가세 포함가 기준
            </button>
            <button
              type="button"
              onClick={() => setVatMode("supply")}
              className={`rounded-full border px-3 py-1 ${
                vatMode === "supply" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              공급가액 기준
            </button>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">
              {vatMode === "inclusive" ? "부가세 포함가 (원)" : "공급가액 (원)"}
            </span>
            <AmountInput value={vatAmount} onChange={setVatAmount} />
          </label>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="공급가액" value={formatWon(vatResult.supplyPrice)} />
            <ResultRow label="부가세 (10%)" value={formatWon(vatResult.vat)} />
            <ResultRow label="부가세 포함가" value={formatWon(vatResult.inclusivePrice)} emphasize />
          </div>
        </div>
      )}

      <div className="mt-5">
        <ResultActions storageKey="margin-vat" summary={summary} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        수수료율은 카테고리·판매 방식에 따라 다를 수 있어 참고용입니다. 실제 정산 금액은 각 마켓 정산 내역을 확인하세요.
      </p>
    </div>
  );
}

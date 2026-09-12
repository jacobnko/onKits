"use client";

// 프리랜서 3.3% 원천징수 계산기와 알바 주휴수당 계산기를 탭으로 제공하는 인터랙티브 위젯
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  calcFreelanceWithholding,
  type FreelanceWithholdingMode,
} from "@/lib/calculations/freelance-withholding";
import { calcWeeklyHolidayPay } from "@/lib/calculations/weekly-holiday-pay";

type Tab = "freelance" | "weeklyHoliday";

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

function ResultRow({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={emphasize ? "text-lg font-bold text-primary" : "text-sm font-medium text-foreground"}>
        {value}
      </span>
    </div>
  );
}

function AmountInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <input
      type="text"
      inputMode="numeric"
      value={value === 0 ? "" : value.toLocaleString("ko-KR")}
      onChange={(e) => onChange(Number(e.target.value.replace(/[^0-9]/g, "")) || 0)}
      className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
    />
  );
}

export function TaxCalcWidget() {
  const t = useTranslations("tools.taxCalc.widget");
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

  function handleCopy() {
    const text =
      tab === "freelance"
        ? `${t("grossPay")}: ${formatWon(freelanceResult.grossPay)}\n${t("withholdingTax")}: ${formatWon(freelanceResult.withholdingTax)}\n${t("netPay")}: ${formatWon(freelanceResult.netPay)}`
        : `${t("weeklyHolidayPay")}: ${formatWon(weeklyHolidayResult.weeklyHolidayPay)}\n${t("weeklyTotalPay")}: ${formatWon(weeklyHolidayResult.weeklyTotalPay)}\n${t("monthlyEstimatedPay")}: ${formatWon(weeklyHolidayResult.monthlyEstimatedPay)}`;

    navigator.clipboard?.writeText(text);
  }

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
          {t("tabFreelance")}
        </button>
        <button
          type="button"
          onClick={() => setTab("weeklyHoliday")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "weeklyHoliday" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          {t("tabWeeklyHoliday")}
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
              {t("modeGross")}
            </button>
            <button
              type="button"
              onClick={() => setFreelanceMode("net")}
              className={`rounded-full border px-3 py-1 ${
                freelanceMode === "net" ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {t("modeNet")}
            </button>
          </div>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">
              {freelanceMode === "gross" ? t("grossPayLabel") : t("netPayLabel")}
            </span>
            <AmountInput value={freelanceAmount} onChange={setFreelanceAmount} />
          </label>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label={t("grossPay")} value={formatWon(freelanceResult.grossPay)} />
            <ResultRow label={t("withholdingTax")} value={`- ${formatWon(freelanceResult.withholdingTax)}`} />
            <ResultRow label={t("netPay")} value={formatWon(freelanceResult.netPay)} emphasize />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">{t("hourlyWageLabel")}</span>
            <AmountInput value={hourlyWage} onChange={setHourlyWage} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">{t("weeklyHoursLabel")}</span>
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
              {t("notEligible")}
            </p>
          )}

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label={t("weeklyHolidayPay")} value={formatWon(weeklyHolidayResult.weeklyHolidayPay)} />
            <ResultRow label={t("weeklyTotalPay")} value={formatWon(weeklyHolidayResult.weeklyTotalPay)} />
            <ResultRow
              label={t("monthlyEstimatedPay")}
              value={formatWon(weeklyHolidayResult.monthlyEstimatedPay)}
              emphasize
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleCopy}
        className="mt-5 w-full rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        {t("copyResult")}
      </button>

      <p className="mt-4 text-xs text-muted-foreground">{t("disclaimer")}</p>
    </div>
  );
}

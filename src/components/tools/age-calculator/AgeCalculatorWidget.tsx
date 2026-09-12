"use client";

// 생년월일 기반 만 나이 / 연 나이 / 다음 생일까지 남은 일수를 계산하는 위젯
import { useMemo, useState } from "react";
import { calcAge } from "@/lib/calculations/age-calculator";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

const TODAY = new Date();

export function AgeCalculatorWidget() {
  const [birthDate, setBirthDate] = useState("2000-05-15");
  const [asOfDate, setAsOfDate] = useState(toDateInputValue(TODAY));

  const result = useMemo(() => {
    if (!birthDate || !asOfDate) return null;
    return calcAge(new Date(birthDate), new Date(asOfDate));
  }, [birthDate, asOfDate]);

  const summary = result
    ? `만 나이: ${result.internationalAge}세\n연 나이: ${result.koreanYearAge}세\n다음 생일까지: ${result.daysUntilNextBirthday}일`
    : "";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">생년월일</span>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">기준일</span>
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>

        {result && (
          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="만 나이" value={`${result.internationalAge}세`} emphasize />
            <ResultRow label="연 나이 (출생연도 기준)" value={`${result.koreanYearAge}세`} />
            <ResultRow label="다음 생일까지" value={`${result.daysUntilNextBirthday}일`} />
          </div>
        )}
      </div>

      <div className="mt-5">
        <ResultActions storageKey="age-calculator" summary={summary} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        만 나이는 2023년 시행된 만 나이 통일법 기준입니다. 연 나이는 병역법・청소년보호법 등 일부 법령에서
        사용하는 &apos;현재연도 − 출생연도&apos; 방식입니다.
      </p>
    </div>
  );
}

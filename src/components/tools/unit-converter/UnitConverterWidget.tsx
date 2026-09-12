"use client";

// 넓이(평/㎡), 무게(kg/lb), 길이(cm/inch)를 서로 변환하는 위젯
import { useMemo, useState } from "react";
import {
  pyeongToSqm,
  sqmToPyeong,
  kgToLb,
  lbToKg,
  cmToInch,
  inchToCm,
} from "@/lib/calculations/unit-converter";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type Category = "area" | "weight" | "length";

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function UnitConverterWidget() {
  const [category, setCategory] = useState<Category>("area");
  const [pyeong, setPyeong] = useState(34);
  const [kg, setKg] = useState(70);
  const [cm, setCm] = useState(170);

  const sqm = useMemo(() => round(pyeongToSqm(pyeong)), [pyeong]);
  const lb = useMemo(() => round(kgToLb(kg)), [kg]);
  const inch = useMemo(() => round(cmToInch(cm)), [cm]);

  const CATEGORY_TABS: { key: Category; label: string }[] = [
    { key: "area", label: "넓이" },
    { key: "weight", label: "무게" },
    { key: "length", label: "길이" },
  ];

  const summary =
    category === "area"
      ? `${pyeong}평 = ${sqm}㎡`
      : category === "weight"
        ? `${kg}kg = ${lb}lb`
        : `${cm}cm = ${inch}inch`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setCategory(tab.key)}
            className={`flex-1 rounded-full px-4 py-2 transition-colors ${
              category === tab.key ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {category === "area" && (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">평</span>
            <input
              type="number"
              inputMode="decimal"
              value={pyeong}
              onChange={(e) => setPyeong(Number(e.target.value) || 0)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="제곱미터(㎡)" value={`${sqm}㎡`} emphasize />
            <ResultRow label="반대로 (㎡→평 예시)" value={`10㎡ ≈ ${round(sqmToPyeong(10))}평`} />
          </div>
        </div>
      )}

      {category === "weight" && (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">킬로그램(kg)</span>
            <input
              type="number"
              inputMode="decimal"
              value={kg}
              onChange={(e) => setKg(Number(e.target.value) || 0)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="파운드(lb)" value={`${lb}lb`} emphasize />
            <ResultRow label="반대로 (lb→kg 예시)" value={`10lb ≈ ${round(lbToKg(10))}kg`} />
          </div>
        </div>
      )}

      {category === "length" && (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">센티미터(cm)</span>
            <input
              type="number"
              inputMode="decimal"
              value={cm}
              onChange={(e) => setCm(Number(e.target.value) || 0)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="인치(inch)" value={`${inch}inch`} emphasize />
            <ResultRow label="반대로 (inch→cm 예시)" value={`10inch ≈ ${round(inchToCm(10))}cm`} />
          </div>
        </div>
      )}

      <div className="mt-5">
        <ResultActions storageKey="unit-converter" summary={summary} />
      </div>
    </div>
  );
}

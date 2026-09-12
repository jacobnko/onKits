"use client";

// 원 단위 금액을 천단위 콤마로 표시/입력하는 공용 숫자 입력 필드
export function AmountInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
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

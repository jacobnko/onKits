"use client";

// 균등 1/N 정산과 각자 낸 금액 기준 정산(차액 계산)을 탭으로 제공하는 위젯
import { useMemo, useState } from "react";
import { calcEqualSplit, calcSettleUp, type Participant } from "@/lib/calculations/split-bill";
import { AmountInput } from "@/components/tools/shared/AmountInput";
import { ResultRow } from "@/components/tools/shared/ResultRow";
import { ResultActions } from "@/components/tools/shared/ResultActions";

type Tab = "equal" | "settle";

function formatWon(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export function SplitBillWidget() {
  const [tab, setTab] = useState<Tab>("equal");

  const [totalAmount, setTotalAmount] = useState(84000);
  const [peopleCount, setPeopleCount] = useState(4);

  const [participants, setParticipants] = useState<Participant[]>([
    { name: "나", paid: 50000 },
    { name: "친구1", paid: 20000 },
    { name: "친구2", paid: 0 },
  ]);

  const equalResult = useMemo(() => calcEqualSplit(totalAmount, peopleCount), [totalAmount, peopleCount]);
  const settleResult = useMemo(() => calcSettleUp(participants), [participants]);

  function updateParticipant(index: number, patch: Partial<Participant>) {
    setParticipants((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }

  function addParticipant() {
    setParticipants((prev) => [...prev, { name: `친구${prev.length}`, paid: 0 }]);
  }

  function removeParticipant(index: number) {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  }

  const equalSummary = `1인당 정산금액: ${formatWon(equalResult.baseShare)}${equalResult.extraShareCount > 0 ? ` (${equalResult.extraShareCount}명은 +1원)` : ""}`;
  const settleSummary = settleResult.entries
    .map((e) => `${e.name}: ${e.balance >= 0 ? `${formatWon(e.balance)} 받아야 함` : `${formatWon(-e.balance)} 더 내야 함`}`)
    .join("\n");

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex gap-2 rounded-full bg-secondary p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTab("equal")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "equal" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          균등 1/N 정산
        </button>
        <button
          type="button"
          onClick={() => setTab("settle")}
          className={`flex-1 rounded-full px-4 py-2 transition-colors ${
            tab === "settle" ? "bg-primary text-primary-foreground shadow-sm" : "text-secondary-foreground"
          }`}
        >
          각자 낸 금액 정산
        </button>
      </div>

      {tab === "equal" ? (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">총 금액 (원)</span>
            <AmountInput value={totalAmount} onChange={setTotalAmount} />
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">인원수</span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              value={peopleCount}
              onChange={(e) => setPeopleCount(Number(e.target.value) || 0)}
              className="rounded-xl border border-border px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="1인당 기본 정산액" value={formatWon(equalResult.baseShare)} emphasize />
            {equalResult.extraShareCount > 0 && (
              <ResultRow
                label="1원 더 부담하는 인원"
                value={`${equalResult.extraShareCount}명 (${formatWon(equalResult.baseShare + 1)}씩)`}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {participants.map((participant, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={participant.name}
                  onChange={(e) => updateParticipant(index, { name: e.target.value })}
                  placeholder="이름"
                  className="w-24 rounded-xl border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <div className="flex-1">
                  <AmountInput value={participant.paid} onChange={(v) => updateParticipant(index, { paid: v })} />
                </div>
                <button
                  type="button"
                  onClick={() => removeParticipant(index)}
                  className="shrink-0 rounded-xl border border-border px-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addParticipant}
            className="rounded-xl border border-dashed border-border py-2 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary"
          >
            + 인원 추가
          </button>

          <div className="mt-2 divide-y divide-border rounded-xl bg-secondary/40 px-4">
            <ResultRow label="1인당 평균" value={formatWon(settleResult.average)} />
            {settleResult.entries.map((entry) => (
              <ResultRow
                key={entry.name}
                label={entry.name}
                value={entry.balance >= 0 ? `+${formatWon(entry.balance)} 받기` : `-${formatWon(-entry.balance)} 보내기`}
                emphasize
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-5">
        <ResultActions storageKey="split-bill" summary={tab === "equal" ? equalSummary : settleSummary} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        각자 낸 금액 정산은 평균 대비 더 내거나 덜 낸 금액만 보여줍니다. 실제 송금은 참가자끼리 편한 방식으로
        정리하세요.
      </p>
    </div>
  );
}

// 회식/모임 1/N 정산 및 "누가 누구에게 얼마를 보내야 하는지" 정산 계산 로직
export type EqualSplitResult = {
  baseShare: number;
  extraShareCount: number;
  amounts: number[];
};

// 나머지는 1원씩 앞사람부터 더 부담해 총액과 정확히 맞춘다
export function calcEqualSplit(totalAmount: number, peopleCount: number): EqualSplitResult {
  if (totalAmount <= 0 || peopleCount <= 0) {
    return { baseShare: 0, extraShareCount: 0, amounts: [] };
  }

  const baseShare = Math.floor(totalAmount / peopleCount);
  const remainder = totalAmount - baseShare * peopleCount;

  const amounts = Array.from({ length: peopleCount }, (_, i) => (i < remainder ? baseShare + 1 : baseShare));

  return { baseShare, extraShareCount: remainder, amounts };
}

export type Participant = { name: string; paid: number };
export type SettleUpEntry = { name: string; paid: number; balance: number };

export function calcSettleUp(participants: Participant[]): { average: number; entries: SettleUpEntry[] } {
  const validParticipants = participants.filter((p) => p.name.trim() !== "");
  if (validParticipants.length === 0) {
    return { average: 0, entries: [] };
  }

  const total = validParticipants.reduce((sum, p) => sum + p.paid, 0);
  const average = Math.round(total / validParticipants.length);

  const entries = validParticipants.map((p) => ({
    name: p.name,
    paid: p.paid,
    balance: p.paid - average,
  }));

  return { average, entries };
}

// 부가세 포함가 <-> 공급가액 상호 역산 계산 로직 (부가세율 10%)
const VAT_RATE = 0.1;

export type VatMode = "inclusive" | "supply";

export type VatResult = {
  supplyPrice: number;
  vat: number;
  inclusivePrice: number;
};

export function calcVat(amount: number, mode: VatMode): VatResult {
  if (amount <= 0) {
    return { supplyPrice: 0, vat: 0, inclusivePrice: 0 };
  }

  if (mode === "inclusive") {
    const supplyPrice = Math.round(amount / (1 + VAT_RATE));
    const vat = amount - supplyPrice;
    return { supplyPrice, vat, inclusivePrice: amount };
  }

  const vat = Math.round(amount * VAT_RATE);
  return { supplyPrice: amount, vat, inclusivePrice: amount + vat };
}

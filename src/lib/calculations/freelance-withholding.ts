// 프리랜서 사업소득 3.3% 원천징수세액 및 실수령액 계산 로직
const WITHHOLDING_RATE = 0.033;

export type FreelanceWithholdingMode = "gross" | "net";

export type FreelanceWithholdingResult = {
  grossPay: number;
  withholdingTax: number;
  netPay: number;
};

export function calcFreelanceWithholding(
  amount: number,
  mode: FreelanceWithholdingMode
): FreelanceWithholdingResult {
  if (amount <= 0) {
    return { grossPay: 0, withholdingTax: 0, netPay: 0 };
  }

  const grossPay =
    mode === "gross" ? Math.round(amount) : Math.round(amount / (1 - WITHHOLDING_RATE));

  const withholdingTax = Math.floor(grossPay * WITHHOLDING_RATE);
  const netPay = grossPay - withholdingTax;

  return { grossPay, withholdingTax, netPay };
}

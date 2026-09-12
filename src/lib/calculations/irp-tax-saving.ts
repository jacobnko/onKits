// IRP 계좌로 이전해 연금으로 수령할 때의 퇴직소득세 감면 효과를 비교하는 시뮬레이션 로직
export type PensionBracket = "under10" | "over10";

const REDUCTION_RATE: Record<PensionBracket, number> = {
  under10: 0.3, // 연금 실제 수령 연차 10년 이하 구간
  over10: 0.4, // 연금 실제 수령 연차 10년 초과 구간
};

export type IrpTaxSavingResult = {
  lumpSumTax: number;
  lumpSumNet: number;
  pensionTax: number;
  pensionNet: number;
  taxSaved: number;
};

export function calcIrpTaxSaving(
  severancePay: number,
  effectiveTaxRatePercent: number,
  bracket: PensionBracket
): IrpTaxSavingResult {
  if (severancePay <= 0) {
    return { lumpSumTax: 0, lumpSumNet: 0, pensionTax: 0, pensionNet: 0, taxSaved: 0 };
  }

  const lumpSumTax = Math.round(severancePay * (effectiveTaxRatePercent / 100));
  const lumpSumNet = severancePay - lumpSumTax;

  const pensionTax = Math.round(lumpSumTax * (1 - REDUCTION_RATE[bracket]));
  const pensionNet = severancePay - pensionTax;

  return { lumpSumTax, lumpSumNet, pensionTax, pensionNet, taxSaved: lumpSumTax - pensionTax };
}

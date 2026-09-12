// 평↔㎡, kg↔lb, cm↔inch 단위 변환 상수 및 함수
export const PYEONG_TO_SQM = 3.305785;
export const KG_TO_LB = 2.204623;
export const CM_TO_INCH = 0.393701;

export function pyeongToSqm(pyeong: number): number {
  return pyeong * PYEONG_TO_SQM;
}

export function sqmToPyeong(sqm: number): number {
  return sqm / PYEONG_TO_SQM;
}

export function kgToLb(kg: number): number {
  return kg * KG_TO_LB;
}

export function lbToKg(lb: number): number {
  return lb / KG_TO_LB;
}

export function cmToInch(cm: number): number {
  return cm * CM_TO_INCH;
}

export function inchToCm(inch: number): number {
  return inch / CM_TO_INCH;
}

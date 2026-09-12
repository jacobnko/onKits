// 고용보험법 기준 구직급여(실업급여) 소정급여일수 및 예상 수급액 계산
const DAILY_BENEFIT_CAP = 66000; // 구직급여일액 상한액
const BENEFIT_RATE = 0.6;

type AgeGroup = "under50" | "over50";

const PRESCRIBED_DAYS: Record<AgeGroup, { minMonths: number; days: number }[]> = {
  under50: [
    { minMonths: 0, days: 120 },
    { minMonths: 12, days: 150 },
    { minMonths: 36, days: 180 },
    { minMonths: 60, days: 210 },
    { minMonths: 120, days: 240 },
  ],
  over50: [
    { minMonths: 0, days: 120 },
    { minMonths: 12, days: 180 },
    { minMonths: 36, days: 210 },
    { minMonths: 60, days: 240 },
    { minMonths: 120, days: 270 },
  ],
};

export function getPrescribedDays(insuredMonths: number, ageGroup: AgeGroup): number {
  const table = PRESCRIBED_DAYS[ageGroup];
  const matched = [...table].reverse().find((row) => insuredMonths >= row.minMonths);
  return matched ? matched.days : table[0].days;
}

export type UnemploymentBenefitResult = {
  dailyBenefit: number;
  prescribedDays: number;
  totalBenefit: number;
};

export function calcUnemploymentBenefit(
  averageMonthlyWage: number,
  insuredMonths: number,
  ageGroup: AgeGroup
): UnemploymentBenefitResult {
  if (averageMonthlyWage <= 0 || insuredMonths <= 0) {
    return { dailyBenefit: 0, prescribedDays: 0, totalBenefit: 0 };
  }

  const averageDailyWage = averageMonthlyWage / 30;
  const dailyBenefit = Math.min(Math.round(averageDailyWage * BENEFIT_RATE), DAILY_BENEFIT_CAP);
  const prescribedDays = getPrescribedDays(insuredMonths, ageGroup);

  return { dailyBenefit, prescribedDays, totalBenefit: dailyBenefit * prescribedDays };
}

export type { AgeGroup };

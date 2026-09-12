// 근로자퇴직급여 보장법 제8조 기준 법정 퇴직금(평균임금 × 30일 × 재직일수/365) 계산
function daysBetween(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export type SeverancePayResult = {
  serviceDays: number;
  totalDaysInThreeMonths: number;
  averageDailyWage: number;
  severancePay: number;
};

export function calcSeverancePay(hireDate: Date, resignDate: Date, threeMonthWage: number): SeverancePayResult {
  const serviceDays = Math.max(daysBetween(hireDate, resignDate), 0);

  const threeMonthsAgo = new Date(resignDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const totalDaysInThreeMonths = Math.max(daysBetween(threeMonthsAgo, resignDate), 1);

  const averageDailyWage = Math.round(threeMonthWage / totalDaysInThreeMonths);
  const severancePay = Math.round(averageDailyWage * 30 * (serviceDays / 365));

  return { serviceDays, totalDaysInThreeMonths, averageDailyWage, severancePay };
}

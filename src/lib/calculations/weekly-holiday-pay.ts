// 알바 주휴수당 및 주 단위 예상 실수령액 계산 로직 (근로기준법 기준, 주 40시간 상한)
const ELIGIBLE_MIN_HOURS = 15;
const STANDARD_WEEKLY_HOURS = 40;
const STANDARD_HOLIDAY_HOURS = 8;
const WEEKS_PER_MONTH = 4.345;

export type WeeklyHolidayPayResult = {
  eligible: boolean;
  weeklyHolidayPay: number;
  weeklyTotalPay: number;
  monthlyEstimatedPay: number;
};

export function calcWeeklyHolidayPay(
  hourlyWage: number,
  weeklyHours: number
): WeeklyHolidayPayResult {
  if (hourlyWage <= 0 || weeklyHours <= 0) {
    return { eligible: false, weeklyHolidayPay: 0, weeklyTotalPay: 0, monthlyEstimatedPay: 0 };
  }

  const eligible = weeklyHours >= ELIGIBLE_MIN_HOURS;
  const effectiveHours = Math.min(weeklyHours, STANDARD_WEEKLY_HOURS);
  const weeklyHolidayPay = eligible
    ? Math.round((effectiveHours / STANDARD_WEEKLY_HOURS) * STANDARD_HOLIDAY_HOURS * hourlyWage)
    : 0;

  const weeklyTotalPay = Math.round(hourlyWage * weeklyHours + weeklyHolidayPay);
  const monthlyEstimatedPay = Math.round(weeklyTotalPay * WEEKS_PER_MONTH);

  return { eligible, weeklyHolidayPay, weeklyTotalPay, monthlyEstimatedPay };
}

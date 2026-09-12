// 월 통상임금 기준 1일 통상임금 및 미사용 연차수당 계산 (월 소정근로시간 209시간 기준)
const STANDARD_MONTHLY_HOURS = 209;
const DAILY_WORK_HOURS = 8;

export type LeaveAllowanceResult = {
  dailyWage: number;
  allowance: number;
};

export function calcLeaveAllowance(monthlySalary: number, unusedDays: number): LeaveAllowanceResult {
  if (monthlySalary <= 0 || unusedDays <= 0) {
    return { dailyWage: 0, allowance: 0 };
  }

  const hourlyWage = monthlySalary / STANDARD_MONTHLY_HOURS;
  const dailyWage = Math.round(hourlyWage * DAILY_WORK_HOURS);

  return { dailyWage, allowance: dailyWage * unusedDays };
}

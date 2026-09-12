// 근로기준법 제60조 기준 연차유급휴가 일수 계산 (입사일 기준 / 회계연도 기준)
function fullMonthsBetween(start: Date, end: Date): number {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

function leaveDaysForYears(tenureYears: number): number {
  return Math.min(15 + Math.floor((tenureYears - 1) / 2), 25);
}

export type HireDateLeaveResult = {
  tenureYears: number;
  tenureMonths: number;
  leaveDays: number;
  isFirstYear: boolean;
};

export function calcAnnualLeaveByHireDate(hireDate: Date, asOfDate: Date): HireDateLeaveResult {
  const totalMonths = fullMonthsBetween(hireDate, asOfDate);
  const tenureYears = Math.floor(totalMonths / 12);

  if (tenureYears < 1) {
    return { tenureYears, tenureMonths: totalMonths, leaveDays: Math.min(totalMonths, 11), isFirstYear: true };
  }

  return { tenureYears, tenureMonths: totalMonths, leaveDays: leaveDaysForYears(tenureYears), isFirstYear: false };
}

export type FiscalYearLeaveResult = {
  tenureYears: number;
  leaveDays: number;
  isHireYear: boolean;
};

export function calcAnnualLeaveByFiscalYear(hireDate: Date, targetYear: number): FiscalYearLeaveResult {
  const hireYear = hireDate.getFullYear();

  if (hireYear > targetYear) {
    return { tenureYears: 0, leaveDays: 0, isHireYear: false };
  }

  if (hireYear === targetYear) {
    const monthsWorked = 12 - hireDate.getMonth();
    return { tenureYears: 0, leaveDays: Math.min(monthsWorked, 11), isHireYear: true };
  }

  const jan1 = new Date(targetYear, 0, 1);
  const tenureYears = Math.floor(fullMonthsBetween(hireDate, jan1) / 12);

  return { tenureYears, leaveDays: leaveDaysForYears(tenureYears), isHireYear: false };
}

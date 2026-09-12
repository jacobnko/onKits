// 생년월일로 만 나이 / 연 나이 / 다음 생일까지 남은 일수를 계산 (2023년 만 나이 통일법 기준)
function fullYearsBetween(start: Date, end: Date): number {
  let years = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < start.getDate())) {
    years -= 1;
  }
  return Math.max(years, 0);
}

function daysBetween(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export type AgeResult = {
  internationalAge: number;
  koreanYearAge: number;
  daysUntilNextBirthday: number;
};

export function calcAge(birthDate: Date, asOfDate: Date): AgeResult {
  const internationalAge = fullYearsBetween(birthDate, asOfDate);
  const koreanYearAge = asOfDate.getFullYear() - birthDate.getFullYear() + 1;

  let nextBirthday = new Date(asOfDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday < asOfDate) {
    nextBirthday = new Date(asOfDate.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }

  return {
    internationalAge,
    koreanYearAge,
    daysUntilNextBirthday: daysBetween(asOfDate, nextBirthday),
  };
}

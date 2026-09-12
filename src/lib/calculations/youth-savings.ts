// 청년도약계좌 정부기여금 매칭 및 5년 만기 예상 수령액 계산 (2024년 도입 기준)
type IncomeBracket = {
  maxAnnualIncome: number;
  contributionLimit: number;
  matchRate: number;
};

const INCOME_BRACKETS: IncomeBracket[] = [
  { maxAnnualIncome: 24_000_000, contributionLimit: 400_000, matchRate: 0.06 },
  { maxAnnualIncome: 36_000_000, contributionLimit: 500_000, matchRate: 0.046 },
  { maxAnnualIncome: 48_000_000, contributionLimit: 600_000, matchRate: 0.037 },
  { maxAnnualIncome: 60_000_000, contributionLimit: 700_000, matchRate: 0.03 },
  { maxAnnualIncome: 75_000_000, contributionLimit: 0, matchRate: 0 },
];

const MONTHS = 60;

export function getIncomeBracket(annualIncome: number): IncomeBracket {
  return INCOME_BRACKETS.find((b) => annualIncome <= b.maxAnnualIncome) ?? INCOME_BRACKETS[INCOME_BRACKETS.length - 1];
}

export type YouthSavingsResult = {
  matchRate: number;
  monthlyMatch: number;
  totalDeposit: number;
  totalMatch: number;
  totalInterest: number;
  maturityAmount: number;
};

export function calcYouthSavings(
  annualIncome: number,
  monthlyContribution: number,
  annualRatePercent: number
): YouthSavingsResult {
  if (annualIncome <= 0 || monthlyContribution <= 0) {
    return { matchRate: 0, monthlyMatch: 0, totalDeposit: 0, totalMatch: 0, totalInterest: 0, maturityAmount: 0 };
  }

  const bracket = getIncomeBracket(annualIncome);
  const matchBase = Math.min(monthlyContribution, bracket.contributionLimit);
  const monthlyMatch = Math.round(matchBase * bracket.matchRate);

  const totalDeposit = monthlyContribution * MONTHS;
  const totalMatch = monthlyMatch * MONTHS;

  // 매월 납입하는 적금의 단리 만기이자 근사식: 월납입액 × 연이율 × n(n+1) / (2 × 12)
  const totalInterest = Math.round(
    monthlyContribution * (annualRatePercent / 100) * ((MONTHS * (MONTHS + 1)) / (2 * 12))
  );

  return {
    matchRate: bracket.matchRate,
    monthlyMatch,
    totalDeposit,
    totalMatch,
    totalInterest,
    maturityAmount: totalDeposit + totalMatch + totalInterest,
  };
}

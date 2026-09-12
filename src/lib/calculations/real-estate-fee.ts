// 공인중개사법 시행규칙 기준 주택 중개보수 상한요율 계산 (전국 공통 기준)
export type DealType = "sale" | "lease";

type FeeBracket = { max: number; rate: number; limit: number | null };

const SALE_BRACKETS: FeeBracket[] = [
  { max: 50_000_000, rate: 0.006, limit: 250_000 },
  { max: 200_000_000, rate: 0.005, limit: 800_000 },
  { max: 900_000_000, rate: 0.004, limit: null },
  { max: 1_200_000_000, rate: 0.005, limit: null },
  { max: 1_500_000_000, rate: 0.006, limit: null },
  { max: Infinity, rate: 0.007, limit: null },
];

const LEASE_BRACKETS: FeeBracket[] = [
  { max: 50_000_000, rate: 0.005, limit: 200_000 },
  { max: 100_000_000, rate: 0.004, limit: 300_000 },
  { max: 600_000_000, rate: 0.003, limit: null },
  { max: 1_200_000_000, rate: 0.004, limit: null },
  { max: 1_500_000_000, rate: 0.005, limit: null },
  { max: Infinity, rate: 0.006, limit: null },
];

export type BrokerageFeeResult = {
  rate: number;
  feeCeiling: number;
};

export function calcBrokerageFee(dealAmount: number, dealType: DealType): BrokerageFeeResult {
  if (dealAmount <= 0) return { rate: 0, feeCeiling: 0 };

  const brackets = dealType === "sale" ? SALE_BRACKETS : LEASE_BRACKETS;
  const bracket = brackets.find((b) => dealAmount < b.max) ?? brackets[brackets.length - 1];

  const raw = dealAmount * bracket.rate;
  const feeCeiling = Math.round(bracket.limit !== null ? Math.min(raw, bracket.limit) : raw);

  return { rate: bracket.rate, feeCeiling };
}

export type AcquisitionTaxResult = {
  taxRate: number;
  acquisitionTax: number;
  localEducationTax: number;
  totalTax: number;
};

// 1주택자 기준 표준 취득세율 (다주택자 중과, 농어촌특별세는 제외한 간편 계산)
export function calcAcquisitionTax(price: number): AcquisitionTaxResult {
  if (price <= 0) return { taxRate: 0, acquisitionTax: 0, localEducationTax: 0, totalTax: 0 };

  let taxRate: number;
  if (price <= 600_000_000) {
    taxRate = 0.01;
  } else if (price <= 900_000_000) {
    taxRate = (price / 100_000_000) * (2 / 3) / 100 - 0.03;
  } else {
    taxRate = 0.03;
  }

  const acquisitionTax = Math.round(price * taxRate);
  const localEducationTax = Math.round(acquisitionTax * 0.1);

  return { taxRate, acquisitionTax, localEducationTax, totalTax: acquisitionTax + localEducationTax };
}

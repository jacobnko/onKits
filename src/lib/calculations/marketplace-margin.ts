// 오픈마켓 판매 수수료를 차감한 순마진 및 마진율 계산 로직
export type MarketplaceMarginResult = {
  feeAmount: number;
  netMargin: number;
  marginRate: number;
};

export function calcMarketplaceMargin(
  salePrice: number,
  costPrice: number,
  feeRatePercent: number
): MarketplaceMarginResult {
  if (salePrice <= 0) {
    return { feeAmount: 0, netMargin: 0, marginRate: 0 };
  }

  const feeAmount = Math.round((salePrice * feeRatePercent) / 100);
  const netMargin = salePrice - costPrice - feeAmount;
  const marginRate = (netMargin / salePrice) * 100;

  return { feeAmount, netMargin, marginRate };
}

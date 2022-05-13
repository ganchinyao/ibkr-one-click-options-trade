export interface BuyParams {
  ticker: string;
  amountUSD: number;
}

export interface SellParams {
  ticker: string;
  contractDate: string;
  numContract: number;
}

export enum OptionType {
  CALL = 'CALL',
  PUT = 'PUT',
}

export interface BuyParams {
  ticker: string;
  type: OptionType;
  amount_USD: number;
  dte: number;
}

export interface BuyResponse {
  id: number;
  ticker: string;
  type: OptionType;
  contract_date: string;
  strike: number;
  num_contract: number;
  purchased_price: number;
  purchased_time: string;
}

export interface SellParams {
  ticker: string;
  type: OptionType;
  contract_date: string;
  strike: number;
  num_contract: number;
}

export interface SellResponse {
  id: number;
  ticker: string;
  type: OptionType;
  contract_date: string;
  strike: number;
  num_contract: number;
  sell_price: number;
  sell_time: string;
}

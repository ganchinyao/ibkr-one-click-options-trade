export enum OptionType {
  CALL = 'CALL',
  PUT = 'PUT',
}

export enum ActionType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum BuyMethod {
  CONTRACT = 'CONTRACT',
  USD = 'USD',
}

export enum OrderType {
  LIMIT = 'LIMIT', // Note that LIMIT doesn't mean you can set price (for my usage). LIMIT means set limit order at mid_price of the contract.
  MARKET = 'MARKET',
}

export interface BuyParams {
  ticker: string;
  type: OptionType;
  amount_USD: number;
  contract_quantity: number;
  buy_method: BuyMethod;
  dte: number;
  order_type?: OrderType;
  exchange?: string;
}

export interface BuyResponse {
  id: number;
  ticker: string;
  type: OptionType;
  action: ActionType;
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
  order_type?: OrderType;
  exchange?: string;
}

export interface SellResponse {
  id: number;
  ticker: string;
  type: OptionType;
  action: ActionType;
  contract_date: string;
  strike: number;
  num_contract: number;
  sell_price: number;
  sell_time: string;
}

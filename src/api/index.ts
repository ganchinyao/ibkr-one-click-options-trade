import { URL } from '../constants';
import { fetchMaker } from './fetchMaker';
import { BuyParams, BuyResponse, SellParams, SellResponse } from './types';

export const buyRequest = async (params: BuyParams) => {
  const response: BuyResponse = await fetchMaker.post(URL.BUY.url, {
    auth_code: URL.BUY.auth_code,
    ...params,
  });
  console.log('### response:', response);
  return response;
};

export const sellRequest = async (params: SellParams) => {
  const response: SellResponse = await fetchMaker.post(URL.SELL.url, {
    auth_code: URL.SELL.auth_code,
    ...params,
  });
  console.log('### response:', response);
  return response;
};

/**
 * Send a request to get the current ticket selected
 * @returns the current ticker, in string. E.g. 'SPY'
 */
export const getTicker = async () => {
  return (await fetchMaker.post(URL.GET_CURRENT_TICKER.url, {
    auth_code: URL.GET_CURRENT_TICKER.auth_code,
  })) as string;
};

/**
 * Send a request to get the current ticket selected
 * @returns the current ticker, in string. E.g. 'SPY'
 */
export const updateTicker = async (newTicker: string) => {
  return (await fetchMaker.post(URL.UPDATE_CURRENT_TICKER.url, {
    auth_code: URL.UPDATE_CURRENT_TICKER.auth_code,
    ticker: newTicker,
  })) as string;
};

/**
 * Send a request to get the current price of Ticker.
 * @returns the current price of ticker, in string. E.g. '400.10'
 */
export const getPriceOfTicker = async (ticker: string) => {
  const response = (await fetchMaker.post(URL.GET_PRICE_OF_TICKER.url, {
    auth_code: URL.GET_PRICE_OF_TICKER.auth_code,
    ticker,
  })) as string;
  console.log('### response:', response);
  return response;
};

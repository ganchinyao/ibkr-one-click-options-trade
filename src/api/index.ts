import { AUTH_CODE_POST_BUY, AUTH_CODE_POST_CURRENT_TICKER } from '../constants';
import { fetchMaker } from './fetchMaker';

export const getSample = async () => {
  const response = await fetchMaker.get('/d');
  console.log('### response:', response);
};

export const buyRequest = async () => {
  const response = await fetchMaker.post('/buy', {
    auth_code: AUTH_CODE_POST_BUY,
  });
  console.log('### response:', response);
};

/**
 * Send a request to get the current ticket selected
 * @returns the current ticker, in string. E.g. 'SPY'
 */
export const getTicker = async () => {
  return (await fetchMaker.get('/current_ticker')) as string;
};

/**
 * Send a request to get the current ticket selected
 * @returns the current ticker, in string. E.g. 'SPY'
 */
export const updateTicker = async (newTicker: string) => {
  return (await fetchMaker.post('/current_ticker', {
    auth_code: AUTH_CODE_POST_CURRENT_TICKER,
    ticker: newTicker,
  })) as string;
};

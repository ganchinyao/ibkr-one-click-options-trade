/**
 * The list of tickers that is allow to be traded.
 * Feel free to add or remove any tickers.
 */
export const AVAILABLE_TICKERS = ['SPY', 'QQQ', 'AAPL', 'FB', 'NVDA', 'TSLA'];

/**
 * Default list of USD to display for quick select
 */
export const AVAILABLE_DEFAULT_USD = [800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000];

/**
 * Default list of Contract amount to display for quick select
 */
export const AVAILABLE_DEFAULT_CONTRACT_AMT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * How many dte (Days to expirations) options to buy/sell. Corresponds to buying the nearest dated option that is >= now + DTE.
 * E.g. 3 means 3 days to expiration, so we will buy an option that is at least 3 days away from now.
 */
export const DEFAULT_DTE = 3;

/**
 * The default value in the TextInput for the USD to buy.
 */
export const DEFAULT_USD_TO_BUY_AMT = 1200;

/**
 * The default value in the TextInput for the amount of Contracts to buy.
 */
export const DEFAULT_CONTRACT_TO_BUY_AMT = 3;

/**
 * AUTH_CODE is a string that is sent with each POST request to authenticate with the server.
 * E.g. POST { auth_code: AUTH_CODE_POST_BUY }.
 * The server will check if the AUTH_CODE matches with the same AUTH_CODE in the server, and if it does not, terminate the request.
 * This is a simple layer of protection to ensure no unauthorize user can execute requests from our server.
 * You can change the string to any string, but you should also change the same string in the server too.
 */
export const URL = {
  BUY: {
    url: '/buy',
    auth_code: 'Crystal Paladin',
  },
  SELL: {
    url: '/sell',
    auth_code: 'Bolmeteus Steel Dragon',
  },
  GET_CURRENT_TICKER: {
    url: '/current_ticker',
    auth_code: 'Uberdragon Jabaha',
  },
  UPDATE_CURRENT_TICKER: {
    url: '/update_current_ticker',
    auth_code: 'Uberdragon Bajula',
  },
};

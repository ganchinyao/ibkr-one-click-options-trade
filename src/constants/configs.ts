/**
 * The list of tickers that is allow to be traded.
 * Feel free to add or remove any tickers.
 */
export const AVAILABLE_TICKERS = ['SPY', 'QQQ'];

/**
 * The default value in the TextInput for the USD to buy.
 */
export const DEFAULT_USD_TO_BUY_AMT = 1000;

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

import { AVAILABLE_DEFAULT_CONTRACT_AMT, AVAILABLE_DEFAULT_USD, AVAILABLE_TICKERS } from '../constants';

export const getAvailableTickers = () => {
  return AVAILABLE_TICKERS;
};

export const getAvailableDefaultUSD = () => {
  return AVAILABLE_DEFAULT_USD;
};

export const getAvailableDefaultContractAmount = () => {
  return AVAILABLE_DEFAULT_CONTRACT_AMT;
};

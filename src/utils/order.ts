import { ActionType, BuyResponse, OptionType, SellResponse } from '../api/types';
import { AppDispatch } from '../store';
import { addBuyOrder, removeBuyOrder } from '../store/contract/completedBuyOrderSlice';
import { addToHistory } from '../store/contract/historySlice';
import { appendToHistoryDataStore } from './datastore';
import Toast from 'react-native-toast-message';
import { printGreen, printRed } from './Logger';

export const onBuySuccess = (dispatch: AppDispatch, resp: BuyResponse) => {
  Toast.show({
    type: 'success',
    text1: `Successfully bought ${resp.ticker} ${resp.type}`,
    visibilityTime: 3000,
  });
  dispatch(addBuyOrder(resp));
  dispatch(addToHistory(resp));
  appendToHistoryDataStore(resp);
  printGreen(`Successfully bought ${resp.type}.`, resp);
};

export const onBuyFail = (type: OptionType, exception: any) => {
  Toast.show({
    type: 'error',
    text1: `Failed to buy ${type}.`,
    visibilityTime: 3000,
  });
  printRed(`Failed to buy ${type}.`, exception);
};

export const onSellSuccess = (dispatch: AppDispatch, resp: SellResponse) => {
  Toast.show({
    type: 'success',
    text1: `Successfully sold ${resp.num_contract}x ${resp.ticker}`,
    visibilityTime: 3000,
  });
  dispatch(removeBuyOrder(resp.id));
  dispatch(addToHistory(resp));
  appendToHistoryDataStore(resp);
  printGreen(`Successfully sell ${resp.type}.`, resp);
};

export const onSellFail = (type: OptionType, exception: any) => {
  Toast.show({
    type: 'error',
    text1: `Failed to sell ${type}.`,
    visibilityTime: 3000,
  });
  printRed(`Failed to sell ${type}.`, exception);
};

export const getDateTime = (item: BuyResponse | SellResponse) => {
  let dateTime;
  if (item.action === ActionType.BUY) {
    dateTime = (item as BuyResponse).purchased_time;
  } else {
    dateTime = (item as SellResponse).sell_time;
  }
  return dateTime;
};

export const getDate = (item: BuyResponse | SellResponse) => {
  return getDateTime(item).split(' ')[0];
};

export const getTime = (item: BuyResponse | SellResponse) => {
  return getDateTime(item).split(' ')[1];
};

export const getPrice = (item: BuyResponse | SellResponse) => {
  let price;
  if (item.action === ActionType.BUY) {
    price = (item as BuyResponse).purchased_price;
  } else {
    price = (item as SellResponse).sell_price;
  }
  return price;
};

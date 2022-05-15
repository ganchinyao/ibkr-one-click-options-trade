import AsyncStorage from '@react-native-async-storage/async-storage';
import { BuyResponse, SellResponse } from '../api/types';
import { printRed } from './Logger';

const STORE_KEYS = {
  history: '@/History',
};

const storeObject = async (key: string, value: Object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    printRed('Failed to store to AsyncStorage. ', e);
  }
};

const storeString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    printRed('Failed to store to AsyncStorage. ', e);
  }
};

const getStringData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
    printRed('Failed to retrieve from AsyncStorage. ', e);
  }
};

const getObjectData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    printRed('Failed to retrieve from AsyncStorage. ', e);
  }
};

export const appendToHistoryDataStore = async (newValue: BuyResponse | SellResponse) => {
  const key = STORE_KEYS.history;
  let existingHistory = await getHistoryDataStore();
  existingHistory.push(newValue);
  await storeObject(key, existingHistory);
};

export const getHistoryDataStore = async () => {
  const key = STORE_KEYS.history;
  let existingHistory: (BuyResponse | SellResponse)[] = await getObjectData(key);
  return existingHistory || [];
};

export const clearHistoryDataStore = async () => {
  const key = STORE_KEYS.history;
  await storeObject(key, []);
};

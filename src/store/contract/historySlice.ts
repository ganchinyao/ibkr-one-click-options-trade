import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuyResponse, SellResponse } from '../../api/types';
import type { RootState } from '../index';

interface ContractState {
  list: (BuyResponse | SellResponse)[];
  isRefreshing: boolean;
}

const initialState: ContractState = {
  list: [],
  isRefreshing: true,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    initHistory: (state, action: PayloadAction<(BuyResponse | SellResponse)[]>) => {
      state.isRefreshing = true;
      state.list = action.payload;
      state.isRefreshing = false;
    },
    addToHistory: (state, action: PayloadAction<BuyResponse | SellResponse>) => {
      state.isRefreshing = true;
      state.list.push(action.payload);
      state.isRefreshing = false;
    },
    removeFromHistory: (state, action: PayloadAction<number>) => {
      state.isRefreshing = true;
      state.list = state.list.filter((item) => item.id !== action.payload);
      state.isRefreshing = false;
    },
  },
});

export const { initHistory, addToHistory, removeFromHistory } = historySlice.actions;

export const selectHistoryList = (state: RootState) => state.history.list;
export const selectHistoryIsRefreshing = (state: RootState) => state.history.isRefreshing;

export default historySlice.reducer;

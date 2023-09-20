import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from '../../api/types';
import type { RootState } from '../index';

interface SettingState {
  orderType: OrderType;
  exchange: string;
}

const initialState: SettingState = {
  orderType: OrderType.LIMIT,
  exchange: 'SMART',
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateOrderType: (state, action: PayloadAction<OrderType>) => {
      state.orderType = action.payload;
    },
    updateExchange: (state, action: PayloadAction<string>) => {
      state.exchange = action.payload;
    },
  },
});

export const { updateOrderType, updateExchange } = settingSlice.actions;

export const selectOrderType = (state: RootState) => state.setting.orderType;
export const selectExchange = (state: RootState) => state.setting.exchange;

export default settingSlice.reducer;

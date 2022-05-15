import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuyResponse } from '../../api/types';
import type { RootState } from '../index';

interface CompletedBuyOrderState {
  buyOrders: BuyResponse[];
}

// Define the initial state using that type
const initialState: CompletedBuyOrderState = {
  buyOrders: [],
};

export const completedBuyOrderSlice = createSlice({
  name: 'completedBuyOrderSlice',
  initialState,
  reducers: {
    addBuyOrder: (state, action: PayloadAction<BuyResponse>) => {
      state.buyOrders.push(action.payload);
    },
    removeBuyOrder: (state, action: PayloadAction<number>) => {
      state.buyOrders = state.buyOrders.filter((order) => order.id !== action.payload);
    },
  },
});

export const { addBuyOrder, removeBuyOrder } = completedBuyOrderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBuyOrders = (state: RootState) => state.buyOrders.buyOrders;

export default completedBuyOrderSlice.reducer;

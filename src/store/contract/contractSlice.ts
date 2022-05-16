import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_DTE, DEFAULT_USD_TO_BUY_AMT } from '../../constants';
import { getAvailableTickers } from '../../utils';
import type { RootState } from '../index';
const availableTickers = getAvailableTickers();

interface ContractState {
  selectedTicker: string;
  contractAmtUSD: number;
  dte?: number;
}

// Define the initial state using that type
const initialState: ContractState = {
  selectedTicker: availableTickers[0],
  contractAmtUSD: DEFAULT_USD_TO_BUY_AMT,
  dte: DEFAULT_DTE,
};

export const contractSlice = createSlice({
  name: 'ticker',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTicker: (state, action: PayloadAction<string>) => {
      state.selectedTicker = action.payload;
    },
    setContractAmtUSD: (state, action: PayloadAction<number>) => {
      state.contractAmtUSD = action.payload;
    },
    setDTE: (state, action: PayloadAction<number | undefined>) => {
      state.dte = action.payload;
    },
  },
});

export const { setTicker, setContractAmtUSD, setDTE } = contractSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTicker = (state: RootState) => state.contract.selectedTicker;
export const selectContractAmtUSD = (state: RootState) => state.contract.contractAmtUSD;
export const selectDTE = (state: RootState) => state.contract.dte;

export default contractSlice.reducer;

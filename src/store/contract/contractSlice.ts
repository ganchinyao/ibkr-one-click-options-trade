import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_USD_TO_BUY_AMT } from '../../constants';
import { getAvailableTickers } from '../../utils';
import type { RootState } from '../index';
const availableTickers = getAvailableTickers();

interface ContractState {
  selectedTicker: string;
  contractAmtUSD: number;
  contractDate: string;
  numContract: number;
}

// Define the initial state using that type
const initialState: ContractState = {
  selectedTicker: availableTickers[0],
  contractAmtUSD: DEFAULT_USD_TO_BUY_AMT,
  contractDate: '',
  numContract: -1,
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
    setContractDate: (state, action: PayloadAction<string>) => {
      state.contractDate = action.payload;
    },
    setNumContract: (state, action: PayloadAction<number>) => {
      state.numContract = action.payload;
    },
  },
});

export const { setTicker, setContractAmtUSD, setContractDate, setNumContract } = contractSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTicker = (state: RootState) => state.contract.selectedTicker;
export const selectContractAmtUSD = (state: RootState) => state.contract.contractAmtUSD;
export const selectContractDate = (state: RootState) => state.contract.contractDate;
export const selectNumContract = (state: RootState) => state.contract.numContract;

export default contractSlice.reducer;

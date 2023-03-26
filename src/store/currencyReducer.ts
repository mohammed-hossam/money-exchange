import { Dispatch, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from './index';
import { HYDRATE } from 'next-redux-wrapper';
import { CurrencyTypes } from '@/types';
import { getResult } from '@/utils/getResult';
import { formatResult } from '@/utils/formatResult';

// Type for our state
export interface CurrencyState {
  amount: string;
  from: string;
  to: string;
  currencyTypes: CurrencyTypes;
  status: string;
  result: string;
  serverError: string;
  fetchingLoading: boolean;
}

// Initial state
const initialState: CurrencyState = {
  amount: '1.0',
  from: 'Currency',
  to: 'Currency',
  result: '',
  currencyTypes: [],
  status: 'idle',
  serverError: '',
  fetchingLoading: false,
};

export const fetchFinalResult = createAsyncThunk(
  'currency/result',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;
    console.log(state.currency);
    const { from, to, amount } = state.currency;
    if (
      from === 'Currency' ||
      to === 'Currency' ||
      !amount ||
      Number(amount) <= 0
    )
      return;
    try {
      thunkAPI.dispatch(fetchingLoading());
      const data = await getResult({ from, to, amount });
      thunkAPI.dispatch(fetchingDone());
      // console.log(typeof data);
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(fetchingDone());
      throw error;
    }
  }
);

// Actual Slice
export const currencyReducer = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    // Action to set the authentication status
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setFrom(state, action) {
      state.from = action.payload;
    },
    setTo(state, action) {
      state.to = action.payload;
    },
    setCurrencyTypes(state, action) {
      state.currencyTypes = action.payload;
    },
    swap(state) {
      return {
        ...state,
        from: state.to,
        to: state.from,
      };
    },
    reset(state) {
      return {
        ...state,
        amount: '1.0',
        from: 'Currency',
        to: 'Currency',
        result: '',
      };
    },
    resetResult(state) {
      state.result = '';
    },
    fetchingLoading(state) {
      state.fetchingLoading = true;
    },
    fetchingDone(state) {
      state.fetchingLoading = false;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.currency,
      };
    },
    [fetchFinalResult.pending.type]: (state, action) => {
      console.log('loading');
      state.status = 'loading';
    },
    [fetchFinalResult.fulfilled.type]: (state, action) => {
      console.log('fulfilled');
      const finalResult = formatResult(state, action);

      return {
        ...state,
        status: 'idle',
        serverError: '',
        result: finalResult,
      };
    },
    [fetchFinalResult.rejected.type]: (state, action) => {
      console.log('rejected');
      console.log(action);

      return {
        ...state,
        status: 'idle',
        result: 'server error',
      };
    },
  },
});

export const {
  // fetchFinalResult,
  setAmount,
  setFrom,
  setTo,
  setCurrencyTypes,
  swap,
  reset,
  resetResult,
  fetchingLoading,
  fetchingDone,
} = currencyReducer.actions;

export const selectAmount = (state: AppState) => state.currency.amount;
export const selectFrom = (state: AppState) => state.currency.from;
export const selectTo = (state: AppState) => state.currency.to;
export const selectResult = (state: AppState) => state.currency.result;
export const selectCurrencyTypes = (state: AppState) =>
  state.currency.currencyTypes;
export const selectFetchingLoading = (state: AppState) =>
  state.currency.fetchingLoading;

export default currencyReducer.reducer;

import {createSlice} from "@reduxjs/toolkit";
import {getTransactions, deleteTransactions} from "./operations";

const initialState = {
  transactions: [],
  category: [],
  currentTransaction: null,
};

const slice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, {payload}) => {
        state.transactions = payload;
      })
      .addCase(deleteTransactions.fulfilled, (state, {payload}) => {
        state.transactions = state.transactions.filter((transaction) => transaction._id !== payload);
      });
  },
});

export default slice.reducer;

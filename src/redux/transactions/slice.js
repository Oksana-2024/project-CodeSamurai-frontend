import {createSlice} from "@reduxjs/toolkit";
import {getTransactions, deleteTransactions} from "./operations";

const transactions = {
  items: [],
  category: [],
  currentTransaction: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactions,
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, {payload}) => {
        state.items = payload;
      })
      .addCase(deleteTransactions.fulfilled, (state, {payload}) => {
        state.items = state.items.filter((transaction) => transaction._id !== payload);
      });
  },
});

export default transactionsSlice.reducer;

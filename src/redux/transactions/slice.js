import { createSlice } from "@reduxjs/toolkit";
import { getTransactions, deleteTransactions, addTransactions } from "./operations";

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
      .addCase(addTransactions.fulfilled, (state, { payload }) => {
        state = state.transactions.push(payload);
      })
      .addCase(getTransactions.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(deleteTransactions.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((transaction) => transaction._id !== payload);
      });
  },
});

const transactionsReducer = transactionsSlice.reducer;
export default transactionsReducer;

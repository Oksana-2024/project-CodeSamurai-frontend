import { createSlice } from "@reduxjs/toolkit";
import { getTransactions, deleteTransactions, addTransactions } from "./operations";

const transactions = {
  items: [],
  category: [],
  currentTransaction: null,
  isOpenAddTransaction: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactions,
  reducers: {
    setAddTransaction(state, action) {
      state.isOpenAddTransaction = action.payload;
    },
  },
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

export const { setAddTransaction } = transactionsSlice.actions;

export default transactionsReducer;

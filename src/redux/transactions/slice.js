import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addTransactions } from "./operations";

const transactions = {
  items: [],
  category: [],
  currentTransaction: null,
  deleteTransaction: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactions,
  reducers: {
    setCurrentTransaction(state, action) {
      state.currentTransaction = action.payload;
    },
    setDeleteTransaction(state, action) {
      state.deleteTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTransactions.fulfilled, (state, { payload }) => {
        state = state.transactions.push(payload);
      })
      .addMatcher(isAnyOf(addTransactions.fulfilled), (state) => {
        state.isTransLoading = false;
        state.isTransError = null;
      })
      .addMatcher(isAnyOf(addTransactions.pending), (state) => {
        state.isTransLoading = true;
        state.isTransError = null;
      })
      .addMatcher(isAnyOf(addTransactions.rejected), (state, { payload }) => {
        state.isTransLoading = false;
        state.isTransError = payload;
      });
    //.addCase
  },
});

const transactionsReducer = transactionsSlice.reducer;
export default transactionsReducer;

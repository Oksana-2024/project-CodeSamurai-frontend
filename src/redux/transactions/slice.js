import { createSlice } from "@reduxjs/toolkit";
import { getTransactions, deleteTransactions, addTransactions } from "./operations";

const transactions = {
  items: [],
  category: [
    // Видалити коли прийде з беку
    "Main expenses",
    "Products",
    "Car",
    "Self care",
    "Child care",
    "Household products",
    "Education",
    "Leisure",
    "Other expenses",
    "Entertainment",
  ],
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
        state = state.items.push(payload);
      })
      .addCase(getTransactions.fulfilled, (state, { payload }) => {
        state.balance = payload.balance;
        state.items = payload.transactions;
        state.perPage = payload.pagination.perPage;
        state.page = payload.pagination.page;
        state.totalPages = payload.pagination.totalPages;
      })
      .addCase(deleteTransactions.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((transaction) => transaction._id !== payload.id);
        state.balance = payload.balance;
      });
  },
});

const transactionsReducer = transactionsSlice.reducer;

export const { setAddTransaction } = transactionsSlice.actions;

export default transactionsReducer;

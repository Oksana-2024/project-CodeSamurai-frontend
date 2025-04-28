import { createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  deleteTransactions,
  addTransactions,
  getCategories,
  updateTransaction,
} from "./operations";
import { selectPage, selectPerPage, selectTotalPages } from "./selectors";
import { useSelector } from "react-redux";

const transactions = {
  items: [],
  category: [],
  currentTransaction: null,
  isOpenAddTransaction: false,
  perPage: 8,
  page: 1,
  totalPages: 1,
  isOpenEditTransaction: false,
};

export const useTransactionsPagination = () => {
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPage = useSelector(selectTotalPages);
  return {
    page,
    perPage,
    totalPage,
  };
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactions,
  reducers: {
    setAddTransaction(state, action) {
      state.isOpenAddTransaction = action.payload;
    },
    setEditTransaction(state, action) {
      state.currentTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTransactions.fulfilled, (state, { payload }) => {
        state.items = [...state.items, payload.transaction].sort(
          (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      })
      .addCase(getTransactions.fulfilled, (state, { payload }) => {
        state.items = payload.transactions;
        state.perPage = payload.pagination.perPage;
        state.page = payload.pagination.page;
        state.totalPages = payload.pagination.totalPages;
      })
      .addCase(deleteTransactions.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(
          (transaction) => transaction._id !== payload.id
        );
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.category = payload;
      })
      .addCase(updateTransaction.fulfilled, (state, { payload }) => {
        const items = state.items.filter(
          (v) => payload.transaction._id !== v._id
        );
        state.items = [...items, payload.transaction].sort(
          (b, a) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      });
  },
});

const transactionsReducer = transactionsSlice.reducer;

export const { setAddTransaction, setEditTransaction } =
  transactionsSlice.actions;

export default transactionsReducer;

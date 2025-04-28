import { createSlice } from "@reduxjs/toolkit";
import {
  getTransactions,
  deleteTransactions,
  getCategories,
} from "./operations";
import { selectPage, selectPerPage, selectTotalPages } from "./selectors";
import { useSelector } from "react-redux";

const transactions = {
  items: [],
  category: [],
  currentTransaction: null,
  perPage: 8,
  page: 1,
  totalPages: 1,
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
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default transactionsSlice.reducer;

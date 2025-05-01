import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  currentUser,
  loginThunk,
  logoutUser,
  registerThunk,
} from "../auth/operations";
import { fetchCurrency } from "../currency/operations";
import {
  getTransactions,
  deleteTransactions,
  addTransactions,
  getCategories,
  updateTransaction,
} from "../transactions/operations";
import { fetchStatistics } from "../statistics/operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const handleFulfilled = (state) => {
  state.isLoading = false;
  state.isError = false;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload.data?.message || "Something went wrong";
};

const global = {
  isError: null,
  isLoading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState: global,
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          logoutUser.pending,
          currentUser.pending,
          getCategories.pending,
          fetchCurrency.pending,
          getTransactions.pending,
          deleteTransactions.pending,
          addTransactions.pending,
          updateTransaction.pending,
          fetchStatistics.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          logoutUser.rejected,
          currentUser.rejected,
          getCategories.rejected,
          fetchCurrency.rejected,
          getTransactions.rejected,
          deleteTransactions.rejected,
          addTransactions.rejected,
          updateTransaction.rejected,
          fetchStatistics.rejected
        ),
        handleRejected
      )
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          loginThunk.fulfilled,
          logoutUser.fulfilled,
          currentUser.fulfilled,
          getCategories.fulfilled,
          fetchCurrency.fulfilled,
          getTransactions.fulfilled,
          deleteTransactions.fulfilled,
          addTransactions.fulfilled,
          updateTransaction.fulfilled,
          fetchStatistics.fulfilled
        ),
        handleFulfilled
      );
  },
});

const globalReducer = globalSlice.reducer;

export default globalReducer;

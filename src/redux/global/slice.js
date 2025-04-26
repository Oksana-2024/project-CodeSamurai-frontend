import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginThunk, logoutUser, registerThunk } from "../auth/operations";
import { fetchCurrency } from "../currency/operations";
import { getTransactions, deleteTransactions, addTransactions } from "../transactions/operations";

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
  // todo: зробити обробку помилок?
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
          fetchCurrency.pending,
          logoutUser.pending,
          getTransactions.pending,
          deleteTransactions.pending,
          addTransactions.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          fetchCurrency.rejected,
          logoutUser.rejected,
          getTransactions.rejected,
          deleteTransactions.rejected,
          addTransactions.rejected
        ),
        handleRejected
      )
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          loginThunk.fulfilled,
          fetchCurrency.fulfilled,
          logoutUser.fulfilled,
          getTransactions.fulfilled,
          deleteTransactions.fulfilled,
          addTransactions.fulfilled
        ),
        handleFulfilled
      );
  },
});

const globalReducer = globalSlice.reducer;

export default globalReducer;

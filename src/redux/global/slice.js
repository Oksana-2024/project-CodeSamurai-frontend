import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "../auth/operations";
import { fetchCurrency } from "../currency/operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const handleFulfilled = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  // todo: зробити обробку помилок?
  state.isError = action.payload;
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
          registerThunk.rejected,
          loginThunk.rejected,
          fetchCurrency.rejected
        ),
        handleRejected
      )
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          fetchCurrency.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          loginThunk.fulfilled,
          fetchCurrency.fulfilled
        ),
        handleFulfilled
      );
  },
});

const globalReducer = globalSlice.reducer;

export default globalReducer;

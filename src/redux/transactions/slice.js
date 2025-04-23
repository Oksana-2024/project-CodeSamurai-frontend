import { createSlice } from "@reduxjs/toolkit";

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
    builder;
    //.addCase
  },
});

export default transactionsSlice.reducer;

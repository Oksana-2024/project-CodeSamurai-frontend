import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistics } from "./operations";

const initialState = {
  expensesByCategory: [],
  statistics: null,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  isLoading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statistics = action.payload;
        state.month = action.payload.month;
        state.year = action.payload.year;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;

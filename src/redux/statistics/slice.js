import { createSlice } from "@reduxjs/toolkit";
import { getTransactionsCategories } from "./operations";

const initialState = {
  summary: [],
  categories: [
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
  isStatisticsLoading: false,
  isStatisticsError: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsCategories.pending, (state) => {
        state.isStatisticsLoading = true;
        state.isStatisticsError = null;
      })
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.isStatisticsLoading = false;
        state.categories = action.payload;
      })
      .addCase(getTransactionsCategories.rejected, (state, action) => {
        state.isStatisticsLoading = false;
        state.isStatisticsError = action.payload;
      });
  },
});

const statisticsReduser = statisticsSlice.reducer;
export default statisticsReduser;

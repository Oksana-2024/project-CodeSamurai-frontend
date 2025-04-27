import { createSlice } from "@reduxjs/toolkit";
import { getTransactionsCategories } from "./operations";

const initialState = {
  summary: [],
  category: [
    // Видалити коли прийде з беку
  ],
  isCategoryLoading: false,
  isCategoryError: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsCategories.pending, (state) => {
        state.isCategoryLoading = true;
        state.isCategoryError = null;
      })
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.isCategoryLoading = false;
        state.category = action.payload;
      })
      .addCase(getTransactionsCategories.rejected, (state, action) => {
        state.isCategoryLoading = false;
        state.isCategoryError = action.payload;
      });
  },
});

// const statisticsReducer = statisticsSlice.reducer;
const categoryReducer = categorySlice.reducer;
// export default statisticsReducer;
export default categoryReducer;

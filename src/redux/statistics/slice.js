import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistics } from "./operations";
import { colors } from "../../helpers/statistics";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  expense: 0,
  income: 0,
  transactions: 0,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        const categories = Object.entries(action.payload.categoryExpenses).map(
          ([name, value], index) => {
            return {
              name: name,
              total: value,
              color: colors[index % colors.length],
            };
          }
        );

        state.categories = categories;
        state.expense = action.payload.totalExpense;
        state.income = action.payload.totalIncome;
        state.transactions = action.payload.periodTransactions;
        state.month = action.payload.month;
        state.year = action.payload.year;
      })
      .addCase(fetchStatistics.rejected, (_, { payload }) => {
        toast.error(payload || "Something wrong");
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;

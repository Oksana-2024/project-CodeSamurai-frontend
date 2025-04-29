import { createSelector } from "@reduxjs/toolkit";

export const selectStatistics = (state) => state.statistics;

export const selectExpensesByCategory = createSelector(
  [selectStatistics],
  (statistics) =>
    statistics?.expensesByCategory?.map((item, index) => ({
      name: item.name,
      total: item.value,
      color: [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#8884D8",
        "#82CA9D",
        "#FFD700",
        "#FFA07A",
      ][index % 8], 
    })) || []
);

export const selectStatisticsLoading = createSelector(
  [selectStatistics],
  (statistics) => statistics?.isLoading || false
);

export const selectStatisticsError = createSelector(
  [selectStatistics],
  (statistics) => statistics?.error || null
);

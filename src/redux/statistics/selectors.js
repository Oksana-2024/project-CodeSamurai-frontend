export const selectStatisticsCategories = (state) =>
  state.statistics.categories;
export const selectStatisticsTransactions = (state) =>
  state.statistics.transactions;
export const selectExpense = (state) => state.statistics.expense;
export const selectIncome = (state) => state.statistics.income;
export const selectMonth = (state) => state.statistics.month;
export const selectYear = (state) => state.statistics.year;

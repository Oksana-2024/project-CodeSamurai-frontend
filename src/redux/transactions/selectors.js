export const selectTransactions = (state) => state.transactions.items;

export const selectCurrentTransaction = (state) =>
  state.transactions.currentTransaction;

export const selectDeleteTransaction = (state) =>
  state.transactions.deleteTransaction;

export const selectCategory = (state) => state.transactions.category;

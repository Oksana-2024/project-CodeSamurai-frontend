export const selectTransactions = (state) => state.transaction.transactions;

export const selectCurrentTransaction = (state) =>
  state.transactions.currentTransaction;

export const selectDeleteTransaction = (state) => state.transaction.deleteTransaction;

export const selectCategory = (state) => state.transactions.category;

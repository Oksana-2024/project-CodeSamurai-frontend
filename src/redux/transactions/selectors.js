export const selectTransactions = (state) => state.transaction.transactions;

export const selectCurrentTransaction = (state) => state.transaction.currentTransaction;

export const selectDeleteTransaction = (state) => state.transaction.deleteTransaction;

export const selectCategory = (state) => state.transaction.category;

export const selectTransLoading = (state) => state.transaction.isTransLoading;
export const selectTransError = (state) => state.transaction.isTransError;

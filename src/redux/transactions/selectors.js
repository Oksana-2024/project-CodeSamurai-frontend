export const selectTransactions = (state) => state.transactions.items;

export const selectCurrentTransaction = (state) =>
  state.transactions.currentTransaction;

export const selectDeleteTransaction = (state) =>
  state.transactions.deleteTransaction;

export const selectOpenAddTransaction = (state) =>
  state.transactions.isOpenAddTransaction;
export const selectPage = (state) => state.transactions.page;

export const selectPerPage = (state) => state.transactions.perPage;

export const selectTotalPages = (state) => state.transactions.totalPages;

export const selectCategories = (state) => state.transactions.category;

export const selectOpenEditTransaction = (state) =>
  state.transactions.isOpenEditTransaction;

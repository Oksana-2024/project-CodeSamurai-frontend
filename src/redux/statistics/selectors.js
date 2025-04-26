// Витягує категорії з statistics
export const selectCategories = (state) => state.statistics.categories;

// Витягує статус завантаження
export const selectIsStatisticsLoading = (state) => state.statistics.isStatisticsLoading;

// Витягує помилку, якщо є
export const selectStatisticsError = (state) => state.statistics.isStatisticsError;

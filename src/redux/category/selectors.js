// Витягує категорії з category
export const selectCategory = (state) => state.category;

// Витягує статус завантаження
export const selectIsCategoryLoading = (state) => state.category.isCategoryLoading;

// Витягує помилку, якщо є
export const selectCategoryError = (state) => state.category.isCategoryError;

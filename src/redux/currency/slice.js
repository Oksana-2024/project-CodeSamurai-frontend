import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { fetchCurrency } from "./operations.js";
import { handlePending, handleRejected } from "../../service/axios.js";
import { selectRates, selectUpdatedAt } from "./selectors.js";

const currency = {
  updatedAt: null,
  rates: [],
  isLoading: false,
  isError: false,
};

export const useCurrency = () => {
  const rates = useSelector(selectRates);
  const lastUpdated = useSelector(selectUpdatedAt);
  return {
    rates,
    lastUpdated,
  };
};

const currencySlice = createSlice({
  name: "currency",
  initialState: currency,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, handlePending)
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        const data = action.payload;
        const filtered = data
          .filter(({ currencyCodeA, currencyCodeB }) => [840, 978].includes(currencyCodeA) && currencyCodeB === 980)
          .map(({ currencyCodeA, rateBuy, rateSell }) => ({
            currency: currencyCodeA === 840 ? "USD" : "EUR",
            purchase: rateBuy,
            sale: rateSell,
          }));
        state.rates = filtered;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCurrency.rejected, handleRejected);
  },
});

export default currencySlice.reducer;

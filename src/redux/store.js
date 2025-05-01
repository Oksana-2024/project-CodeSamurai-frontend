import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "./auth/slice";
import currencyReducer from "./currency/slice";
import globalReducer from "./global/slice";
import transactionsReducer from "./transactions/slice";
import { statisticsReducer } from "./statistics/slice";

const persistAuthConfig = {
  key: "users", 
  storage, 
  whitelist: ["user", "token", "isLoggedIn"], 
};

const persistCurrensyConfig = {
  key: "currency", 
  storage, 
  whitelist: ["rates", "updatedAt"], 
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

const persistedCurrencyReducer = persistReducer(
  persistCurrensyConfig,
  currencyReducer
);

const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: persistedAuthReducer,
    transactions: transactionsReducer,
    currency: persistedCurrencyReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };

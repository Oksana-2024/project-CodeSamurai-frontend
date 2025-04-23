import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import {
  // persistStore,
  // persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "./auth/slice";
import currencyReducer from "./currency/slice"

const persistConfig = {
  key: "users", // Ключ для сховища
  storage, // Тип сховища
  whitelist: ["user", "token"], // Масив частин стану для збереження
};

const persistCurrensyConfig  = {
  key: "currency", // Ключ для сховища
  storage, // Тип сховища
  whitelist: ["rates", "updatedAt"], // Масив частин стану для збереження
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const persistedCurrencyReducer = persistReducer(persistCurrensyConfig, currencyReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    // transaction: transactionReducer,
    // category: categoryReducer,
    // balance: balanceReducer,
    currency: persistedCurrencyReducer,
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

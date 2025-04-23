import {configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistStore, persistReducer} from "redux-persist";
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
import globalReducer from "./global/slice";
import currencyReducer from "./currency/slice";
import transactionReducer from "./transactions/slice";

const persistAuthConfig = {
  key: "users", // Ключ для сховища
  storage, // Тип сховища
  whitelist: ["user", "token", "isLoggedIn"], // Масив частин стану для збереження
};

const persistCurrensyConfig = {
  key: "currency", // Ключ для сховища
  storage, // Тип сховища
  whitelist: ["rates", "updatedAt"], // Масив частин стану для збереження
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

const persistedCurrencyReducer = persistReducer(persistCurrensyConfig, currencyReducer);

const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: persistedAuthReducer,
    transaction: transactionReducer,
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
export {store, persistor};

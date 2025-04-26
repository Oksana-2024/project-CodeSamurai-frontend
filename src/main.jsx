import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "modern-normalize";
import "./index.css";

import App from "../src/components/App.jsx";

import { persistor, store } from "./redux/store.js";
import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction.jsx";
import AddTransactionForm from "./components/AddTransactionForm/AddTransactionForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {/* <App /> */}
          <ModalAddTransaction />
          <AddTransactionForm />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

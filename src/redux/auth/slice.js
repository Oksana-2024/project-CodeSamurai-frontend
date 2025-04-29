import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { currentUser, logoutUser } from "./operations.js";

import { registerThunk, loginThunk } from "./operations.js";
import { selectIsLoggedIn, selectUser, selectToken } from "./selectors.js";
import {
  addTransactions,
  deleteTransactions,
  updateTransaction,
} from "../transactions/operations.js";

const auth = {
  user: {
    name: null,
    email: null,
    photo: null,
    balance: 0,
  },
  token: null,
  isLoggedIn: false,
  isComfirmLogout: false,
  isUserOpen: false,
};

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  return {
    isLoggedIn,
    user,
    token,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: auth,
  reducers: {
    setComfirmLogout(state, action) {
      state.isComfirmLogout = action.payload;
    },
    setOpenUserProfile(state, action) {
      state.isUserOpen = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // payload is HTTP status code
        if (action.payload === 401) {
          state.user = { name: null, email: null };
          state.token = null;
          state.isLoggedIn = false;
        }
      })
      .addCase(deleteTransactions.fulfilled, (state, action) => {
        state.user.balance = action.payload.balance;
      })
      .addCase(addTransactions.fulfilled, (state, action) => {
        state.user.balance = action.payload.balance;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.user = payload.data;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.user.balance = action.payload.balance;
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        if (payload === 401) {
          state.token = null;
          state.isLoggedIn = false;
        }
      });
  },
});

const authReducer = authSlice.reducer;
export const { setComfirmLogout, setOpenUserProfile } = authSlice.actions;
export default authReducer;

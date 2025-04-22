import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { registerThunk } from "./operations.js";
import { selectIsLoggedIn, selectUser, selectToken } from "./selectors.js";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isError: null,
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
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isError = null;
      })
      .addMatcher(isAnyOf(registerThunk.rejected), (state, action) => {
        state.isError = action.payload;
      })
      .addMatcher(isAnyOf(registerThunk.pending), (state) => {
        state.isError = false;
      });
  },
});

const authReducer = authSlice.reducer;

export default authReducer;

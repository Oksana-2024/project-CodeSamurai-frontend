import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { logoutUser } from "./operations.js";

import { registerThunk, loginThunk } from "./operations.js";
import { selectIsLoggedIn, selectUser, selectToken } from "./selectors.js";
import { handlePending, handleRejected } from "../../service/axios.js";

const auth = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isError: null,
  isLoading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isError = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isError = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addMatcher(
        isAnyOf(registerThunk.rejected, loginThunk.rejected),
        handleRejected
      )
      .addMatcher(
        isAnyOf(registerThunk.pending, loginThunk.pending),
        handlePending
      );
  },
});

const authReducer = authSlice.reducer;

export default authReducer;

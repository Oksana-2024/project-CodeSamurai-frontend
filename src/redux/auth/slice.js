import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { logoutUser } from "./operations.js";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  balance: 0,
  token: null,
  isLoggedIn: false,
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
    // .addCase()
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    });
  },
});

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const auth = {
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
  },
});

export default authSlice.reducer;
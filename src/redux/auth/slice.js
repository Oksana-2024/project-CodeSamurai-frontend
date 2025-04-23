import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectToken, selectUser } from "./selectors";

const auth = {
  user: {
    name: null,
    email: null,
  },
  balance: 0,
  token: null,
  isLoggedIn: true,
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
//import { baseAxios } from "../../service/axios";

//import { setAuthHeader } from "../../service/axios";
//import { clearAuthHeader } from "../../service/axios";

//baseAxios.post = axios.post

import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      baseAxios.post = axios.post("/api/Log out user");
      localStorage.removeItem("token");
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

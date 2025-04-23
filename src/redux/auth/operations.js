//import { baseAxios } from "../../service/axios";

//import { setAuthHeader } from "../../service/axios";
//import { clearAuthHeader } from "../../service/axios";

//baseAxios.post = axios.post

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("token");
      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

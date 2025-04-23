import { baseAxios } from "../../service/axios";
//import { setAuthHeader } from "../../service/axios";
import { clearAuthHeader } from "../../service/axios";



import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
     await baseAxios.post("/auth/Logout");
       clearAuthHeader();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

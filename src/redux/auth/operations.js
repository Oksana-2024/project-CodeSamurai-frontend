//import { baseAxios } from "../../service/axios";

//import { setAuthHeader } from "../../service/axios";
//import { clearAuthHeader } from "../../service/axios";

//baseAxios.post = axios.post

import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toasterCustomStyles } from "../../helpers/toasterCustomStyles.js";
import { baseAxios, setAuthHeader } from "../../service/axios.js";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await baseAxios.post("/api/auth/sign-up", credentials);
      setAuthHeader(data.token);
      toast.success(`Welcome, ${data.user.username}!`, toasterCustomStyles);
      return data;
    } catch (error) {
      toast.error(
        "This email is already registered. Please use a different email or log in!",
        toasterCustomStyles
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

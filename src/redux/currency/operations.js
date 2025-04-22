import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCurrency = createAsyncThunk("currency/fetch", async (_, thunkAPI) => {
  try {
    const res = await axios.get("https://api.monobank.ua/bank/currency");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "../../service/axios";

export const addTransactions = createAsyncThunk("transactions/add", async (transaction, thunkApi) => {
  try {
    const { data } = await useAxios().post("wallet/transactions", transaction);
    // thunkApi.dispatch(getBalanceThunk());
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

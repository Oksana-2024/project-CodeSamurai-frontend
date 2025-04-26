import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "../../service/axios";

export const getTransactionsCategories = createAsyncThunk("transactions/categories", async (_, thunkAPI) => {
  try {
    const { data } = await useAxios().get("wallet/transaction-categories");

    console.log("Отримані категорії:", data);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "../../service/axios";

export const getTransactionsCategories = createAsyncThunk("transactions/category", async (_, thunkAPI) => {
  try {
    // const { data } = await useAxios().get("/categories");
    const { data } = await useAxios().get("/transactions");

    // console.log("Отримані категорії:", data);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

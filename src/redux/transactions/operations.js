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

export const getTransactions = createAsyncThunk("transactions/all", async (_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.token;

    const response = await useAxios(token).get("/wallet/transactions");

    return response.data.data;
  } catch (error) {
    // console.log("error", error);

    return thunkApi.rejectWithValue(error.message);
  }
});

export const deleteTransactions = createAsyncThunk("transactions/delete", async (id, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.token;

    await useAxios(token).delete(`/wallet/transactions/${id}`);

    return id;
  } catch (error) {
    const errorMessage = error.response?.data || { message: "Unknown error occurred" };

    return thunkApi.rejectWithValue(errorMessage);
  }
});

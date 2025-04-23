import {createAsyncThunk} from "@reduxjs/toolkit";
import {getTransactionsApi} from "../../service/transactionsApi";

export const getTransactions = createAsyncThunk("transactions/all", async (_, thunkApi) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = await getTransactionsApi(thunkApi.getState().auth.token);

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const addTransactions = createAsyncThunk("transactions/add", async (transaction, thunkApi) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log("transaction add", transaction);

    return transaction;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const deleteTransactions = createAsyncThunk("transactions/delete", async (id, thunkApi) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log("transaction delete", id);

    return id;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const editTransactions = createAsyncThunk("transactions/edit", async ({id, transaction}, thunkApi) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log("transaction edit", transaction, id);

    return transaction;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

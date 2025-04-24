import {createAsyncThunk} from "@reduxjs/toolkit";
import {getTransactionsApi, deleteTransactionApi} from "../../service/transactionsApi";
export const getTransactions = createAsyncThunk("transactions/all", async (_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.token;

    // Single request
    const data = await getTransactionsApi(token, thunkApi.signal);

    return data;
  } catch (error) {
    console.log("error", error);

    return thunkApi.rejectWithValue(error.message);
  }
});

export const addTransactions = createAsyncThunk("transactions/add", async (transaction, thunkApi) => {
  try {
    console.log("transaction add.....", transaction);

    return transaction;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const deleteTransactions = createAsyncThunk("transactions/delete", async (id, thunkApi) => {
  try {
    await deleteTransactionApi(thunkApi.getState().auth.token, id);
    thunkApi.dispatch(getTransactions());
    return id;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const editTransactions = createAsyncThunk("transactions/edit", async ({id, transaction}, thunkApi) => {
  try {
    console.log("transaction edit....", transaction, id);

    return transaction;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "../../service/axios";

export const getTransactions = createAsyncThunk(
  "transactions/all",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;

      const { data } = await useAxios(token).get("/transactions/");
      const transactions = data.transactions;
      const pagination = data.pageInfo;
      return { transactions, pagination };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTransactions = createAsyncThunk(
  "transactions/delete",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;

      const { data } = await useAxios(token).delete(`/transactions/${id}`);

      return { id, balance: data.balance };
    } catch (error) {
      const errorMessage = error.response?.data || {
        message: "Unknown error occurred",
      };

      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "../../service/axios";

export const addTransactions = createAsyncThunk(
  "transactions/add",
  async (transaction, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;
      const { data } = await useAxios(token).post("/transactions", transaction);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transactions/all",
  async (page, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;

      const { data } = await useAxios(token).get("/transactions", {
        params: { page: page },
      });
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

export const getCategories = createAsyncThunk(
  "categories/all",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;
      const { data } = await useAxios(token).get("/categories");
      return data.categories;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/update",
  async (updatedTransaction, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const { _id, ...data } = updatedTransaction;
      const response = await useAxios(token).patch(
        `/transactions/${_id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update transaction"
      );
    }
  }
);

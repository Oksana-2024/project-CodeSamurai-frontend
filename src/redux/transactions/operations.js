import {createAsyncThunk} from "@reduxjs/toolkit";

const testData = [
  {
    id: "id1",
    transactionDate: "2025-04-22",
    type: "INCOME",
    comment: "com",
    amount: 12,
    balanceAfter: 12,
    categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
    userId: "userId",
  },
  {
    id: "id2",
    transactionDate: "2025-04-22",
    type: "INCOME",
    comment: "com12",
    amount: 1222,
    balanceAfter: 1234,
    categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
    userId: "userId",
  },
  {
    id: "id3",
    transactionDate: "2025-04-22",
    type: "EXPENSE",
    comment: "com4",
    amount: -10,
    balanceAfter: 1224,
    categoryId: "c9d9e447-1b83-4238-8712-edc77b18b739",
    userId: "userId",
  },
];

export const getTransactions = createAsyncThunk("transactions/all", async (_, thunkApi) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = testData; // Simulating fetching data

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

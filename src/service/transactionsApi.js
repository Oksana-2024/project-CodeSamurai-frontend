/* eslint-disable react-hooks/rules-of-hooks */
import {useAxios} from "./axios";

const createTransactionApi = async (token, transaction) => {
  try {
    const response = await useAxios(token).post("/wallet/transactions", transaction);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

const getTransactionsApi = async (token, abortSignal) => {
  try {
    const response = await useAxios(token).get("/wallet/transactions", {signal: abortSignal});
    return response.data.data;
  } catch (error) {
    if (abortSignal?.aborted) {
      console.warn("Fetch transactions request was aborted");
    } else {
      console.error("Error fetching transactions:", error);
    }
    throw error;
  }
};

const updateTransactionApi = async (token, id, updatedData) => {
  try {
    const response = await useAxios(token).put(`/wallet/transactions/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

const deleteTransactionApi = async (token, id) => {
  try {
    const response = await useAxios(token).delete(`/wallet/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export {deleteTransactionApi, updateTransactionApi, createTransactionApi, getTransactionsApi};

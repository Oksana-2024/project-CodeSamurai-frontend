/* eslint-disable react-hooks/rules-of-hooks */
import {useAxios} from "./axios";

const createTransactionApi = async (toekn, transaction) => {
  try {
    const response = await useAxios(toekn).post("/wallet/transactions", transaction);
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

const getTransactionsApi = async (toekn) => {
  try {
    const response = await useAxios(toekn).get("/wallet/transactions");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

const updateTransactionApi = async (toekn, id, updatedData) => {
  try {
    const response = await useAxios(toekn).put(`/wallet/transactions/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

const deleteTransactionApi = async (toekn, id) => {
  try {
    const response = await useAxios(toekn).delete(`/wallet/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export {deleteTransactionApi, updateTransactionApi, createTransactionApi, getTransactionsApi};

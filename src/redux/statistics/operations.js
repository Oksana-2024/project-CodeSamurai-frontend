import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../configAPI/api";

export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/api/transactions/statistics?month=${month}&year=${year}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch statistics"
      );
    }
  }
);

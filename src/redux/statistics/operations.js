import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAxios } from "../../service/axios";

export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async ({ month, year }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const { data } = await useAxios(token).get(
        `/transactions/statistics?month=${month}&year=${year}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch statistics"
      );
    }
  }
);

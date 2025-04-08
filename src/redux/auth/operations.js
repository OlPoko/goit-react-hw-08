import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      console.log("🟡 Sending login data:", credentials);
      const response = await axios.post("/users/login", credentials);
      return response.data;
    } catch (error) {
      console.log("🔴 Login error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

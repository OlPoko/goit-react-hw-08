import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
const setAuthHeader = (value) => {
  if (value) {
    axios.defaults.headers.common.Authorization = value;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", credentials);
      setAuthHeader(`Bearer ${response.data.token}`);

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
      setAuthHeader(`Bearer ${response.data.token}`);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.log("🔴 Login error:", error.response?.data || error.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk("auth/logout", async () => {
  await axios.post("/users/logout");
});

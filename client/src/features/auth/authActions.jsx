import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const signin_url = `http://localhost:3001/auth/signin`;

export const signin = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(signin_url, credentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);


const signup_url = `http://localhost:3001/auth/signup`;

export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(signup_url, credentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

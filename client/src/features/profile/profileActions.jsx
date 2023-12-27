import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../auth/authSlice.jsx";

const update_profile_url = `http://localhost:3001/api/settings/profile`;

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(update_profile_url, credentials, {
        withCredentials: true,
      });
      dispatch(setUser(res.data));
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

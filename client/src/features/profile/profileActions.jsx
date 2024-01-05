import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../auth/authSlice.jsx";

const update_profile_url = `http://localhost:3001/api/settings/profile`;

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let config = {
        withCredentials: true,
      };

      if (data?.picture instanceof File) {
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        config.headers = { "Content-Type": "multipart/form-data" };
        data = formData;
      }
      const res = await axios.put(update_profile_url, data, config);

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

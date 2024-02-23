import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "../auth/authSlice.jsx";
import { setUploadProgress } from "./profileSlice.jsx";

const update_profile_url = `http://localhost:3001/api/settings/profile`;

const api = axios.create({
  headers: { "Cache-Control": "no-cache" },
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let config = {
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          dispatch(setUploadProgress(progress));
        },
      };

      if (data?.picture instanceof File) {
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        config.headers = { "Content-Type": "multipart/form-data" };
        data = formData;
      }
      const res = await api.put(update_profile_url, data, config);
      
      dispatch(setUser(res.data));
      dispatch(setUploadProgress(0));

      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(setUploadProgress(0));
      return rejectWithValue(error.response.data);
    }
  },
);

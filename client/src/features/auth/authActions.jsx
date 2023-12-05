import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const signin_url = `http://localhost:3001/auth/signin`;
const signup_url = `http://localhost:3001/auth/signup`;
const signout_url = `http://localhost:3001/auth/signout`;
const refresh_url = `http://localhost:3001/auth/refresh`;

export const signinAction = createAsyncThunk(
  "auth/signin",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(signin_url, credentials, {
        withCredentials: true,
      });
      setTimeout(
        () => {
          console.log("it's called from the singin");
          dispatch(refresh());
        },
        (response.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 1000,
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const signupAction = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(signup_url, credentials, {
        withCredentials: true,
      });

      setTimeout(
        () => {
          dispatch(refresh());
        },
        (response.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 1000,
      );

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const signoutAction = createAsyncThunk(
  "auth/signout",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(signout_url, credentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.post(
        refresh_url,
        {},
        {
          withCredentials: true,
        },
      );

      // Set a timeout to refresh the token a bit before it expires
      setTimeout(
        () => {
          console.log("it's called from the refresh");

          dispatch(refresh());
        },
        (response.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 1000,
      ); // Refresh 5 seconds before the token expires
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      if (error.response.data.message === "invalide refreshtoken") {
        const { user } = getState().auth;
        await dispatch(signoutAction({ accountId: user.id }));
        window.location.href = "/signin";
      }
      return rejectWithValue(error.response.data);
    }
  },
);

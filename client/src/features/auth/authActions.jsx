import { googleLogout } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const signin_url = `http://localhost:3001/auth/signin`;
const signup_url = `http://localhost:3001/auth/signup`;
const signout_url = `http://localhost:3001/auth/signout`;
const refresh_url = `http://localhost:3001/auth/refresh`;
const google_auth = `http://localhost:3001/auth/google`;

export const signinAction = createAsyncThunk(
  "auth/signin",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(signin_url, credentials, {
        withCredentials: true,
      });
      setTimeout(
        () => {
          dispatch(refresh());
        },
        (response.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 10000,
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
        (response.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 10000,
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
      googleLogout();
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
          dispatch(refresh());
        },
        (response.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 10000,
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

export const googleSigninAction = createAsyncThunk(
  "auth/googleSignin",
  async (response, { rejectWithValue, dispatch }) => {
    try {
      const data = await axios.post(
        google_auth,
        {
          code: response.code,
          type: response.type,
        },
        {
          withCredentials: true,
          headers: {
            "Cross-Origin-Opener-Policy": "same-origin allow-popups",
          },
        },
      );
      setTimeout(
        () => {
          dispatch(refresh());
        },
        (data.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 10000,
      );
      return data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

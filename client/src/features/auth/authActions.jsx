import { googleLogout } from "@react-oauth/google";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { removeProfile, setProfile } from "../profile/profileSlice.jsx";
import { removeUser } from "./authSlice.jsx";

const signin_url = `http://localhost:3001/auth/signin`;
const signup_url = `http://localhost:3001/auth/signup`;
const signout_url = `http://localhost:3001/auth/signout`;
const refresh_url = `http://localhost:3001/auth/refresh`;
const google_auth = `http://localhost:3001/auth/google`;

const update_account_url = `http://localhost:3001/api/settings/account`;

const api = axios.create({
  headers: { "Cache-Control": "no-cache" },
});

export const signinAction = createAsyncThunk(
  "auth/signin",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post(signin_url, credentials, {
        withCredentials: true,
      });

      // Calculate the expiration time and store it in local storage
      localStorage.setItem("expirationTime", res.data.exp);

      setTimeout(
        () => {
          dispatch(refresh());
          console.log("token refreshed from signin");
        },
        (res.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 20000,
      );
      dispatch(
        setProfile({
          ...res.profile,
          email: res.data.account?.email,
          username: res.data.account?.username,
        }),
      );

      return res.data;
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
      const res = await api.post(signup_url, credentials, {
        withCredentials: true,
      });

      // Calculate the expiration time and store it in local storage

      localStorage.setItem("expirationTime", res.data.exp);

      setTimeout(
        () => {
          dispatch(refresh());
        },
        (res.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 20000,
      );

      dispatch(
        setProfile({
          ...res.data.profile,
          email: res.data.account?.email,
          username: res.data.account?.username,
        }),
      );

      return res.data;
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
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post(signout_url, credentials, {
        withCredentials: true,
      });
      googleLogout();
      dispatch(removeProfile());
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(removeProfile());
      dispatch(removeUser());
      localStorage.removeItem("expirationTime");

      return rejectWithValue(error.response.data);
    }
  },
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = await api
        .post(
          refresh_url,
          {},
          {
            withCredentials: true,
          },
        )
        .catch(() => {
          googleLogout();
          dispatch(removeProfile());
          dispatch(removeUser());
          localStorage.removeItem("expirationTime");
        });

      // Calculate the expiration time and store it in local storage
      localStorage.setItem("expirationTime", res.data.exp);

      setTimeout(
        () => {
          console.log("token refreshed from refresh");

          dispatch(refresh());
        },
        (res.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 20000,
      );

      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      if (error.response.data.message === "invalide refreshtoken") {
        const { user } = getState().auth;
        googleLogout();
        await dispatch(signoutAction({ accountId: user.id }));
        dispatch(removeProfile());
        localStorage.removeItem("expirationTime");
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
      const res = await api.post(
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
      // Calculate the expiration time and store it in local storage

      localStorage.setItem("expirationTime", res.data.exp);
      setTimeout(
        () => {
          console.log("token refreshed from googleSignin");
          dispatch(refresh());
        },
        (res.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 10000,
      );
      dispatch(
        setProfile({
          ...res.data.profile,
          email: res.data.account?.email,
          username: res.data.account?.username,
        }),
      );

      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateAccount = createAsyncThunk(
  "auth/updateAccount",
  async (credentials, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = await api.put(update_account_url, credentials, {
        withCredentials: true,
      });

      localStorage.setItem("expirationTime", res.data.exp);

      setTimeout(
        () => {
          dispatch(refresh());
        },
        (res.data.exp - Math.floor(Date.now() / 1000)) * 1000 - 20000,
      );

      const { profile } = getState().profile;

      dispatch(
        setProfile({
          ...profile,
          email: res.data.account?.email,
          username: res.data.account?.username,
        }),
      );

      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

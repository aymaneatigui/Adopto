import { createSlice } from "@reduxjs/toolkit";
import {
  googleSigninAction,
  refresh,
  signinAction,
  signoutAction,
  signupAction,
} from "./authActions";

const initialState = {
  status: null,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authentication = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    //SignIn
    builder.addCase(signinAction.pending, (state) => {
      state.status = "loading";
      state.error = null;
    }),
      builder.addCase(signinAction.rejected, (state, action) => {
        state.status = "failed";
        action.payload
          ? (state.error = action.payload.message)
          : (state.error = action.error.message);
      }),
      builder.addCase(signinAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.account));
        state.user = action.payload.account;
      }),
      //SignUp
      builder.addCase(signupAction.pending, (state) => {
        state.status = "loading";
        state.error = null;
      }),
      builder.addCase(signupAction.rejected, (state, action) => {
        state.status = "failed";
        action.payload
          ? (state.error = action.payload.message)
          : (state.error = action.error.message);
      }),
      builder.addCase(signupAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.account));
        state.user = action.payload.account;
      }),
      //SignOut
      builder.addCase(signoutAction.fulfilled, (state) => {
        state.status = null;
        state.error = null;
        state.user = null;
        localStorage.removeItem("user");
      }),
      builder.addCase(signoutAction.pending, (state) => {
        state.status = "loading";
        state.error = null;
      }),
      builder.addCase(signoutAction.rejected, (state, action) => {
        state.status = "failed";
        action.payload
          ? (state.error = action.payload.message)
          : (state.error = action.error.message);
      }),
      builder.addCase(refresh.rejected, (state) => {
        state.status = "failed";
        state.error = "Please Signin again";
      }),
      //Signin Google:
      builder.addCase(googleSigninAction.pending, (state) => {
        state.status = "loading";
        state.error = null;
      }),
      builder.addCase(googleSigninAction.rejected, (state, action) => {
        state.status = "failed";
        action.payload
          ? (state.error = action.payload.message)
          : (state.error = action.error.message);
      }),
      builder.addCase(googleSigninAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.account));
        state.user = action.payload.account;
      });
  },
});
export const { clearErrors } = authentication.actions;

export default authentication.reducer;

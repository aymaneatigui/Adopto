import { createSlice } from "@reduxjs/toolkit";
import { signin } from "./authActions";

const initialState = {
  status: null,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authentication = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signin.pending, (state) => {
      state.status = "loading";
      state.error = null;
    }),
      builder.addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      }),
      builder.addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        state.user = action.payload.data;
      });
  },
});

export default authentication.reducer;

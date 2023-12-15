import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import profileSlice from "./features/profile/profileSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
  },
});

export default store;

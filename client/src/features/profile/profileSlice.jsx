import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  error: null,
  profile: JSON.parse(localStorage.getItem("profile")) || null,
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.profile = action.payload;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
    removeProfile: (state) => {
      state.status = null;
      state.error = null;
      state.profile = null;
      localStorage.removeItem("profile");
    },
  },
});
export const { removeProfile, setProfile } = profile.actions;

export default profile.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  error: null,
  profile: JSON.parse(localStorage.getItem("profile")) || null,
  profileImg: null,
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.profile = action.payload;
      state.profileImg= null;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
    removeProfile: (state) => {
      state.status = null;
      state.error = null;
      state.profile = null;
      state.profileImg = null;
      localStorage.removeItem("profile");
    },
    setprofileImg: (state, action) => {
      state.profileImg = action.payload;
    },
  },
});
export const { removeProfile, setProfile, setprofileImg } = profile.actions;

export default profile.reducer;

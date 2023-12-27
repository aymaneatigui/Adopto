import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "./profileActions.jsx";

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
      state.profileImg = null;
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
  extraReducers(builder) {
    builder.addCase(updateProfile.pending, (state) => {
      state.status = "loading";
      state.error = null;
    }),
      builder.addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        action.payload
          ? (state.error = action.payload.message)
          : (state.error = action.error.message);
      }),
      builder.addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.profileImg = null;

        const profile = {
          ...action.payload.profile,
          username: action.payload.account?.username,
          email: action.payload.account?.email,
        };
        localStorage.setItem("profile", JSON.stringify(profile));
        state.profile = profile;
      });
  },
});
export const { removeProfile, setProfile, setprofileImg } = profile.actions;

export default profile.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "./profileActions.jsx";

const initialState = {
  status: null,
  error: null,
  profile: JSON.parse(localStorage.getItem("profile")) || null,
  profileImg: null,
  uploadProgress: 0,
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
      console.log("setProfilecalled")
      state.profileImg = action.payload;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
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
        state.uploadProgress = 0;

        const pro = {
          ...action.payload.profile,
          username: action.payload.account?.username,
          email: action.payload.account?.email,
        };
        localStorage.removeItem("profile")
        localStorage.setItem("profile", JSON.stringify(pro));
        state.profile = profile;
      });
  },
});
export const { removeProfile, setProfile, setprofileImg, setUploadProgress } = profile.actions;

export default profile.reducer;

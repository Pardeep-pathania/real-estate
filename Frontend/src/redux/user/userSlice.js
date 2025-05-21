import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  isSubmitting: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isSubmitting = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isSubmitting = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.isSubmitting = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;

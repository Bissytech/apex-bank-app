import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  loggedIn: false,
  user: "",
};

const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setLoggedInUser: (
      state,
      action: PayloadAction<{ loggedIn: boolean; user: string }>,
    ) => {
      state.loggedIn = action.payload.loggedIn;
      state.user = action.payload.user;
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;

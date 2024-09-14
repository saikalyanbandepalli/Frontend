// src/redux/employerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employerId: null, // Initial state for employer
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    setEmployerId: (state, action) => {
      state.employerId = action.payload; // Set employer ID
    },
    clearEmployerId: (state) => {
      state.employerId = null; // Clear employer ID on logout
    },
  },
});

export const { setEmployerId, clearEmployerId } = employerSlice.actions;

export default employerSlice.reducer;

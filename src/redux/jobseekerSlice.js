// src/redux/jobseekerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobseekerId: null, // Initial state for jobseeker
};

const jobseekerSlice = createSlice({
  name: "jobseeker",
  initialState,
  reducers: {
    setJobseekerId: (state, action) => {
      state.jobseekerId = action.payload; // Set jobseeker ID
    },
    clearJobseekerId: (state) => {
      state.jobseekerId = null; // Clear jobseeker ID on logout
    },
  },
});

export const { setJobseekerId, clearJobseekerId } = jobseekerSlice.actions;

export default jobseekerSlice.reducer;

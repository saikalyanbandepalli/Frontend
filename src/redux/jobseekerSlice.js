import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobseekerId: null, 
};

const jobseekerSlice = createSlice({
  name: "jobseeker",
  initialState,
  reducers: {
    setJobseekerId: (state, action) => {
      state.jobseekerId = action.payload; 
    },
    clearJobseekerId: (state) => {
      state.jobseekerId = null;
    },
  },
});

export const { setJobseekerId, clearJobseekerId } = jobseekerSlice.actions;

export default jobseekerSlice.reducer;

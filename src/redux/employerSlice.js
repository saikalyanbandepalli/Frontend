import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employerId: null, 
};

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    setEmployerId: (state, action) => {
      state.employerId = action.payload; 
    },
    clearEmployerId: (state) => {
      state.employerId = null; 
    },
  },
});

export const { setEmployerId, clearEmployerId } = employerSlice.actions;

export default employerSlice.reducer;

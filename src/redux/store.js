import { configureStore } from "@reduxjs/toolkit";
import employerReducer from "./employerSlice";
import jobseekerReducer from "./jobseekerSlice";

const store = configureStore({
  reducer: {
    employer: employerReducer, 
    jobseeker: jobseekerReducer, 
  },
});

export default store;

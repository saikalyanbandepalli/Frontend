// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import employerReducer from "./employerSlice";
import jobseekerReducer from "./jobseekerSlice";

const store = configureStore({
  reducer: {
    employer: employerReducer, // Adding employer reducer
    jobseeker: jobseekerReducer, // Adding jobseeker reducer
  },
});

export default store;

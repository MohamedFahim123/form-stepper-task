import { configureStore } from "@reduxjs/toolkit";
import stepperReducer from "./stepper-slice/stepperSlice";


/*
  Redux store configuration using Redux Toolkit. 
  It combines the stepper reducer and sets up the store for the application.
*/
const store = configureStore({
  reducer: {
    stepper: stepperReducer,
  },
});


/*
  Type definitions for the RootState, AppDispatch, and AppStore based on the configured store.
*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;

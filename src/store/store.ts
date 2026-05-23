import { configureStore } from "@reduxjs/toolkit";
import stepperReducer from "./stepper-slice/stepperSlice";

const store = configureStore({
  reducer: {
    stepper: stepperReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;

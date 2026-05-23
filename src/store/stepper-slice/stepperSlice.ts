import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type StepperState = {
  currentStep: number;
  completedSteps: number[];
};

const FIRST_STEP = 0;
const LAST_STEP = 2;

const initialState: StepperState = {
  currentStep: FIRST_STEP,
  completedSteps: [],
};

const getValidStep = (step: number) =>
  Math.min(Math.max(step, FIRST_STEP), LAST_STEP);

const completeStep = (state: StepperState, step: number) => {
  if (!state.completedSteps.includes(step)) {
    state.completedSteps.push(step);
  }
};

const stepperReducer = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    goToStep: (state, action: PayloadAction<number>) => {
      state.currentStep = getValidStep(action.payload);
    },
    nextStep: (state) => {
      completeStep(state, state.currentStep);
      state.currentStep = getValidStep(state.currentStep + 1);
    },
    prevStep: (state) => {
      state.currentStep = getValidStep(state.currentStep - 1);
    },
    resetStepper: () => ({ ...initialState }),
  },
});

export const { goToStep, nextStep, prevStep, resetStepper } =
  stepperReducer.actions;

export default stepperReducer.reducer;

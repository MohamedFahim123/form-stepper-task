import type { RootState } from "../store";

// Selectors for the stepper state
export const selectStepper = (state: RootState) => state.stepper;

// Selector to get the current step from the stepper state
export const selectCurrentStep = (state: RootState) =>
  selectStepper(state).currentStep;

// Selector to get the completed steps from the stepper state
export const selectCompletedSteps = (state: RootState) =>
  selectStepper(state).completedSteps;

// Selector to check if a specific step is completed
export const selectIsStepCompleted = (step: number) => (state: RootState) =>
  selectCompletedSteps(state).includes(step);

// Selector to check if the user can go to the next step
export const selectCanGoToPreviousStep = (state: RootState) =>
  selectCurrentStep(state) > 0;

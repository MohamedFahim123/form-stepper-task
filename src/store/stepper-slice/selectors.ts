import type { RootState } from "../store";

export const selectStepper = (state: RootState) => state.stepper;

export const selectCurrentStep = (state: RootState) =>
  selectStepper(state).currentStep;

export const selectCompletedSteps = (state: RootState) =>
  selectStepper(state).completedSteps;

export const selectIsStepCompleted = (step: number) => (state: RootState) =>
  selectCompletedSteps(state).includes(step);

export const selectCanGoToPreviousStep = (state: RootState) =>
  selectCurrentStep(state) > 0;

"use client";

import { FormProvider } from "react-hook-form";
import { Stepper } from "@/components/organisms/Stepper";
import { useAddNewUserForm } from "@/hooks/useAddNewUserForm";
import PersonalStep from "@/components/organisms/PersonalStep";
import PreferencesStep from "@/components/organisms/PreferencesStep";
import ReviewStep from "@/components/organisms/ReviewStep";
import SuccessModal from "./SuccessModal";

export default function AddUserTemplate() {
  const {
    currentStep,
    completedSteps,
    form,
    countryOptions,
    categoryOptions,
    interestOptions,
    optionsLoading,
    countriesLoading,
    createUser,
    success,
    optionsError,
    goNext,
    goBack,
    submit,
    reset,
    closeSuccess,
  } = useAddNewUserForm();

  return (
    <FormProvider {...form}>
      <Stepper currentStep={currentStep} completedSteps={completedSteps} />
      {optionsError && (
        <div
          role="alert"
          className="rounded-lg border border-danger bg-accent-100 px-4 py-3 text-body-sm text-accent-900"
        >
          We could not load the form options. Refresh the page and try again.
        </div>
      )}
      {currentStep === 0 && (
        <PersonalStep
          register={form.register}
          control={form.control}
          errors={form.formState.errors}
          countries={countryOptions}
          optionsLoading={countriesLoading}
          optionsError={optionsError}
          onNext={goNext}
        />
      )}
      {currentStep === 1 && (
        <PreferencesStep
          control={form.control}
          errors={form.formState.errors}
          categories={categoryOptions}
          interests={interestOptions}
          optionsLoading={optionsLoading}
          optionsError={optionsError}
          onBack={goBack}
          onNext={goNext}
        />
      )}
      {currentStep === 2 && (
        <ReviewStep
          values={form.getValues()}
          countries={countryOptions}
          categories={categoryOptions}
          interests={interestOptions}
          onBack={goBack}
          onSubmit={submit}
          isSubmitting={form.formState.isSubmitting || createUser.isPending}
        />
      )}
      <SuccessModal
        open={success}
        onClose={closeSuccess}
        onAddAnother={reset}
      />
      {createUser.isError && (
        <div
          role="alert"
          className="rounded-lg border border-danger bg-accent-100 px-4 py-3 text-body-sm text-accent-900"
        >
          The user could not be saved. Please try again.
        </div>
      )}
    </FormProvider>
  );
}

import { ChevronRight } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { SelectField } from "@/components/molecules/SelectField";
import { GENDER_OPTIONS } from "@/utils/formOptions";
import type { UserFormSchema } from "@/validation/user-schema";

type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  register: UseFormRegister<UserFormSchema>;
  control: Control<UserFormSchema>;
  errors: FieldErrors<UserFormSchema>;
  countries: SelectOption[];
  optionsLoading?: boolean;
  optionsError?: boolean;
  onNext: () => void;
};

export default function PersonalStep({
  register,
  control,
  errors,
  countries,
  optionsLoading,
  optionsError,
  onNext,
}: Props) {
  return (
    <section className="form-card space-y-6">
      <h1 className="text-heading-2">Personal Information</h1>
      <FormField
        id="fullName"
        label="Full Name"
        required
        error={errors.fullName?.message}
        helperText="Must be 2-50 characters"
      >
        <Input
          id="fullName"
          autoComplete="name"
          placeholder="Maged Yaseen"
          error={!!errors.fullName}
          {...register("fullName")}
        />
      </FormField>
      <FormField
        id="email"
        label="Email Address"
        required
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          placeholder="maged.yaseen@mwjb.net"
          autoComplete="email"
          error={!!errors.email}
          {...register("email")}
        />
      </FormField>
      <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <SelectField
            label="Gender"
            value={field.value}
            onChange={field.onChange}
            options={GENDER_OPTIONS}
            placeholder="Select gender"
            required
            error={errors.gender?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="country"
        render={({ field }) => (
          <SelectField
            label="Country"
            value={field.value || ""}
            onChange={field.onChange}
            options={countries}
            placeholder={
              optionsLoading ? "Loading countries..." : "Select country"
            }
            optional
            searchable
            disabled={optionsLoading || optionsError}
            error={errors.country?.message}
          />
        )}
      />
      <FormField
        id="age"
        label="Age"
        required
        error={errors.age?.message}
        helperText="Must be between 18-100"
      >
        <Input
          id="age"
          type="number"
          min={18}
          max={100}
          placeholder="30"
          error={!!errors.age}
          {...register("age", { valueAsNumber: true })}
        />
      </FormField>
      <div className="form-divider pt-5">
        <div className="flex justify-end">
          <Button onClick={onNext}>
            Next Step <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

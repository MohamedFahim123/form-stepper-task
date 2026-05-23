import { ChevronLeft, ChevronRight } from "lucide-react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { FileUploadField } from "@/components/molecules/FileUploadField";
import { MultiSelectField } from "@/components/molecules/MultiSelectField";
import { SelectField } from "@/components/molecules/SelectField";
import type { UserFormSchema } from "@/validation/user-schema";

type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  control: Control<UserFormSchema>;
  errors: FieldErrors<UserFormSchema>;
  categories: SelectOption[];
  interests: SelectOption[];
  optionsLoading?: boolean;
  optionsError?: boolean;
  onBack: () => void;
  onNext: () => void;
};

export default function PreferencesStep({
  control,
  errors,
  categories,
  interests,
  optionsLoading,
  optionsError,
  onBack,
  onNext,
}: Props) {
  return (
    <section className="form-card space-y-6">
      <h1 className="text-heading-2">Preferences</h1>
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <SelectField
            label="Category"
            id="category"
            value={field.value}
            onChange={field.onChange}
            options={categories}
            placeholder={
              optionsLoading ? "Loading categories..." : "Select a category"
            }
            disabled={optionsLoading || optionsError}
            required
            error={errors.category?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="interests"
        render={({ field }) => (
          <MultiSelectField
            label="Interests"
            values={field.value}
            id="interests"
            onChange={field.onChange}
            options={interests}
            required
            disabled={optionsLoading || optionsError}
            hint="Select up to 5 interests"
            max={5}
            error={errors.interests?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="avatar"
        render={({ field }) => (
          <FileUploadField
            id="avatar"
            name="avatar"
            label="Avatar Upload"
            value={field.value}
            onChange={field.onChange}
            optional
            error={errors.avatar?.message as string | undefined}
          />
        )}
      />
      <div className="form-divider pt-5">
        <div className="flex items-center justify-between">
          <Button variant="secondary" onClick={onBack}>
            <ChevronLeft size={16} /> Back
          </Button>
          <Button onClick={onNext} disabled={optionsLoading || optionsError}>
            Next Step <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

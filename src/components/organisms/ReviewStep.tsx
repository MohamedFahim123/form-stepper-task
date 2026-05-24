import { CircleCheckBig , ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ReviewRow } from "@/components/molecules/ReviewRow";
import type { UserFormSchema } from "@/validation/user-schema";
import { GENDER_OPTIONS } from "@/utils/formOptions";

type SelectOption = {
  label: string;
  value: string;
};

const labelOf = (options: SelectOption[], value?: string) =>
  options.find((option) => option.value === value)?.label || "";

type Props = {
  values: UserFormSchema;
  countries: SelectOption[];
  categories: SelectOption[];
  interests: SelectOption[];
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
};

export default function ReviewStep({
  values,
  countries,
  categories,
  interests,
  onBack,
  onSubmit,
  isSubmitting,
}: Props) {
  return (
    <section className="form-card space-y-6">
      <h1 className="text-heading-2">Review & Submit</h1>
      <div className="rounded-lg bg-slate-50 p-5">
        <h2 className="mb-4 text-body-lg font-semibold">User Summary</h2>
        <dl>
          <ReviewRow label="Name">{values.fullName}</ReviewRow>
          <ReviewRow label="Email">{values.email}</ReviewRow>
          <ReviewRow label="Gender">
            {labelOf(GENDER_OPTIONS, values.gender)}
          </ReviewRow>
          <ReviewRow label="Country">
            {labelOf(countries, values.country)}
          </ReviewRow>
          <ReviewRow label="Age">{values.age}</ReviewRow>
          <ReviewRow label="Category">
            {labelOf(categories, values.category)}
          </ReviewRow>
          <ReviewRow label="Interests">
            <span className="flex flex-wrap justify-end gap-2">
              {values.interests.map((interest) => (
                <Badge key={interest}>{labelOf(interests, interest)}</Badge>
              ))}
            </span>
          </ReviewRow>
        </dl>
      </div>
      <div className="rounded-lg border border-primary-200 bg-primary-50 p-4 text-primary-700">
        <div className="flex gap-3">
          <CircleCheckBig size={20} aria-hidden />
          <div>
            <p className="font-semibold">Ready to submit</p>
            <p className="text-caption">
              Review all information carefully before submitting. You can go
              back to make changes.
            </p>
          </div>
        </div>
      </div>
      <div className="form-divider pt-5">
        <div className="flex items-center justify-between">
          <Button variant="secondary" onClick={onBack}>
            <ChevronLeft size={16} /> Back
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting} variant="submit">
            <Check size={16} /> {isSubmitting ? "Submitting..." : "Submit User"}
          </Button>
        </div>
      </div>
    </section>
  );
}

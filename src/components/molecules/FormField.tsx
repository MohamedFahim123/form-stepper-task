import { FieldError } from "@/components/atoms/FieldError";
import { HelperText } from "@/components/atoms/HelperText";
import { Label } from "@/components/atoms/Label";
import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  helperText?: string;
  error?: string;
  children: ReactNode;
};

export function FormField({
  id,
  label,
  required,
  optional,
  hint,
  helperText,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} required={required} optional={optional} hint={hint}>
        {label}
      </Label>
      {children}
      <div className="space-y-1">
        <FieldError id={error ? `${id}-error` : undefined} message={error} />
        {helperText && (
          <HelperText id={`${id}-helper`}>{helperText}</HelperText>
        )}
      </div>
    </div>
  );
}

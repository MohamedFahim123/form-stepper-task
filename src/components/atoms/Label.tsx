import { cn } from "@/utils/twMerge";
import type { LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
};

export function Label({
  required,
  optional,
  hint,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label className={cn("field-label", className)} {...props}>
      {children}
      {required && <span className="field-required"> *</span>}
      {optional && (
        <span className="ml-1 font-normal text-muted-foreground">
          (Optional)
        </span>
      )}
      {hint && (
        <span className="ml-1 font-normal text-muted-foreground">({hint})</span>
      )}
    </label>
  );
}

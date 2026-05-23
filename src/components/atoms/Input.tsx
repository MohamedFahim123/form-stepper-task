import { cn } from "@/utils/twMerge";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { error?: boolean };

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={cn("form-input", error && "form-input-error", className)}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}

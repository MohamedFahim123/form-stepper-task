import { cn } from "@/utils/twMerge";
import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export function Textarea({ error, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "form-input min-h-24 resize-y py-3",
        error && "form-input-error",
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}

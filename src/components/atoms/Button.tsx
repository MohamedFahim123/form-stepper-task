import { cn } from "@/utils/twMerge";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  submit: "btn-submit",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  accent: "btn-accent",
};

export function Button({
  type = "button",
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

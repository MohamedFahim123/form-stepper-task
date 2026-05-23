import { Check } from "lucide-react";
import { cn } from "@/utils/twMerge";

type StepCircleProps = {
  step: number;
  active?: boolean;
  completed?: boolean;
  size?: "sm" | "md" | "lg";
};

export function StepCircle({
  step,
  active,
  completed,
  size = "md",
}: StepCircleProps) {
  return (
    <span
      className={cn(
        "step-circle",
        size === "sm" && "size-8",
        size === "lg" && "size-10",
        active && "step-circle-active",
        completed && "step-circle-completed",
        !active && !completed && "step-circle-default",
      )}
      aria-current={active ? "step" : undefined}
    >
      {completed ? <Check aria-hidden size={14} /> : step}
    </span>
  );
}

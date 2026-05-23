import { StepCircle } from "@/components/atoms/StepCircle";

type StepperItemProps = {
  step: number;
  label: string;
  active?: boolean;
  completed?: boolean;
};

export function StepperItem({
  step,
  label,
  active,
  completed,
}: StepperItemProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <StepCircle step={step} active={active} completed={completed} />
      <span
        className={
          active || completed
            ? "text-caption text-primary-700"
            : "text-caption text-slate-700"
        }
      >
        {label}
      </span>
    </div>
  );
}

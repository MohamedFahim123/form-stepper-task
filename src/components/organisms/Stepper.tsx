import { StepperItem } from "@/components/molecules/StepperItem";
import { cn } from "@/utils/twMerge";

const STEPS = ["Personal", "Preferences", "Review"];

type StepperProps = {
  currentStep: number;
  completedSteps: number[];
};

export function Stepper({ currentStep, completedSteps }: StepperProps) {
  return (
    <nav aria-label="Form progress" className="w-full">
      <ol className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-start gap-4">
        {STEPS.map((label, index) => (
          <StepperNode
            key={label}
            step={index}
            label={label}
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        ))}
      </ol>
    </nav>
  );
}

type StepperNodeProps = {
  step: number;
  label: string;
  currentStep: number;
  completedSteps: number[];
};

function StepperNode({
  step,
  label,
  currentStep,
  completedSteps,
}: StepperNodeProps) {
  const completed = completedSteps.includes(step);

  return (
    <>
      <li>
        <StepperItem
          step={step + 1}
          label={label}
          active={currentStep === step}
          completed={completed}
        />
      </li>
      {step < STEPS.length - 1 && (
        <li
          aria-hidden
          className={cn("step-line mt-3", completed && "step-line-active")}
        />
      )}
    </>
  );
}

import { cn } from "@/utils/twMerge";

type CheckboxOptionProps = {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxOption({
  id,
  label,
  checked,
  disabled,
  onChange,
}: CheckboxOptionProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-3 text-body-sm",
        disabled && "cursor-not-allowed text-slate-400",
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-primary-600"
      />
      {label}
    </label>
  );
}

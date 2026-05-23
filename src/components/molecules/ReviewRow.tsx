import type { ReactNode } from "react";

type ReviewRowProps = {
  label: string;
  children?: ReactNode;
};

export function ReviewRow({ label, children }: ReviewRowProps) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-3 text-body-sm last:border-b-0">
      <dt className="text-slate-600">{label}:</dt>
      <dd className="text-right font-medium text-foreground">
        {children || "-"}
      </dd>
    </div>
  );
}

import { cn } from "@/utils/twMerge";
import type { HTMLAttributes } from "react";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("badge", className)} {...props} />;
}

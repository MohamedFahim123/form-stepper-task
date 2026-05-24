import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes with clsx for conditional class application.
 * @param inputs - An array of class values to merge.
 * @returns A string containing the merged class names.
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

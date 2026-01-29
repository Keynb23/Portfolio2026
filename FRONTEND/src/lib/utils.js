import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes safely using clsx and tailwind-merge.
 * This ensures that conflicting tailwind classes are handled correctly.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

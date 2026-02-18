import { cva } from "class-variance-authority";

/**
 * CVA configuration for button variants
 * Implements the Indiana Pacers color scheme and various states
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-diner-crimson text-white border-2 border-diner-crimson hover:bg-white hover:text-diner-crimson hover:border-white shadow-lg shadow-diner-crimson/20",
        secondary:
          "bg-transparent text-white border-2 border-white/20 hover:border-diner-crimson hover:text-diner-crimson",
        gold: "bg-diner-crimson text-white hover:bg-diner-crimson/80 shadow-lg shadow-diner-crimson/20",
        outline:
          "bg-transparent border-2 border-diner-crimson text-diner-crimson hover:bg-diner-crimson hover:text-white",
        ghost: "bg-transparent hover:bg-diner-crimson/10 text-diner-crimson",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-xs",
        lg: "px-8 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

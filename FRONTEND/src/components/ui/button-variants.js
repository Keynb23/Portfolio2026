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
          "bg-pacers-navy text-pacers-gold border-2 border-pacers-navy hover:bg-pacers-gold hover:text-pacers-navy hover:border-pacers-gold shadow-lg shadow-pacers-navy/20",
        secondary:
          "bg-transparent text-white border-2 border-white/20 hover:border-pacers-gold hover:text-pacers-gold",
        gold: "bg-pacers-gold text-pacers-navy hover:bg-pacers-gold-dark shadow-lg shadow-gold/20",
        outline:
          "bg-transparent border-2 border-pacers-navy text-pacers-navy hover:bg-pacers-navy hover:text-white",
        ghost: "bg-transparent hover:bg-pacers-navy/10 text-pacers-navy",
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
  }
);

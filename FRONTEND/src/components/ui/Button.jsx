import * as React from "react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button-variants";

/**
 * Reusable Button component with variant and size options
 * Uses CVA for consistent styling across the application
 */
const Button = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    // Returns a button element with merged classes from CVA and any additional className
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

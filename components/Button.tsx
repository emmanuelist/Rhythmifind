// Import necessary libraries
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// Define the interface for the Button component's props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// The Button component is a button component that applies some default styles
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button",...props }, ref) => {
    // Render the Button component with the default styles and any additional classes passed in
    return (
      <button
        type={type}
        className={twMerge(
          `w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disalbled:opacity-50 text-black font-bold hover:opacity-75 transition`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
// Set the display name for the Button component
Button.displayName = "Button";

// Export the Button component
export default Button;
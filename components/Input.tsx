import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

/** 
 * Props interface for Input component.
 * Inherits all input element attributes from React.InputHTMLAttributes<HTMLInputElement>.
 * @interface InputProps
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/** 
 * Input component.
 * @function: Input
 * @param: {InputProps} props - Component props.
 * @param: {string} [className] - Additional class names for styling.
 * @param: {string} [type] - Input type.
 * @param: {boolean} [disabled] - Flag to disable input.
 * @param: {React.Ref<HTMLInputElement>} ref - Ref forwarded to the input element.
 * @returns: {JSX.Element} - Rendered Input component.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          // Merge Tailwind CSS classes with custom classes
          `flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

// Set display name for Input component
Input.displayName = "Input";

export default Input;

// Import necessary libraries
import React from "react";
import { twMerge } from "tailwind-merge";

// Define the interface for the Box component's props
interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

// The Box component is a container component that applies some default styles
const Box: React.FC<BoxProps> = ({ children, className }) => {
  // Render the Box component with the default styles and any additional classes passed in
  return (
    <div
      className={twMerge(
        `
		bg-neutral-900 rounded-lg h-fit w-full`,
        className
      )}
    >
      {children}
    </div>
  );
};

// Export the Box component
export default Box;
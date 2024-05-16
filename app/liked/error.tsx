/**
 * Use the "use client" directive to indicate this component should be rendered on the client-side
 */
"use client";

/**
 * Import necessary components
 */
import Box from "@/components/Box";

/**
 * The Error component displays an error message
 * @returns The JSX.Element to be rendered
 */
const Error = () => {
  /**
   * Render the error message
   */
  return (
    <Box className="h-full flex items-center justify-center">
      {/* Display the error message in a neutral color */}
      <div className="text-neutral-400">Something went wrong</div>
    </Box>
  );
};

/**
 * Export the Error component
 */
export default Error;

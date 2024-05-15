"use client";

// Import Box component for layout
import Box from "@/components/Box";

/**
 * Error component.
 * 
 * Renders a message indicating that something went wrong,
 * centered within a Box component.
 * 
 * @returns {JSX.Element} The Error component JSX.
 */
const Error = (): JSX.Element => {
  return (
    // Box component to center the error message vertically and horizontally
    <Box className="h-full flex items-center justify-center">
      {/* Error message */}
      <div className="text-neutral-400">
        Something went wrong
      </div>
    </Box>
  );
};

// Export the Error component as the default export
export default Error;


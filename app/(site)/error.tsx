// Use the "use client" directive to indicate this component should be rendered on the client-side
"use client";

// Import necessary components
import Box from "@/components/Box";

// The Error component displays an error message
const Error = () => {
  // Render the error message
  return (
    <Box className="h-full flex items-center justify-center">
      <div className="text-neutral-400">
        Something went wrong
      </div>
    </Box>
  );
};

// Export the Error component
export default Error;
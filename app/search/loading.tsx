"use client";

// Import Box component for layout
import Box from "@/components/Box";

// Import BounceLoader component for loading animation
import { BounceLoader } from "react-spinners";

/**
 * Loading component.
 * 
 * Renders a loading spinner centered within a Box component.
 * 
 * @returns {JSX.Element} The Loading component JSX.
 */
const Loading = (): JSX.Element => {
  return (
    // Box component to center the loading spinner vertically and horizontally
    <Box className="h-full flex items-center justify-center">
      <BounceLoader color="#22c55e" size={40} />
    </Box>
  );
};

// Export the Loading component as the default export
export default Loading;


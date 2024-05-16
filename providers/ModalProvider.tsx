"use client";

import AuthModal from "@/components/AuthModal"; // Import AuthModal component
import UploadModal from "@/components/UploadModal"; // Import UploadModal component
import { useEffect, useState } from "react"; // Import React hooks

/**
 * Render MyUserContextProvider with children
 * State to track if component is mounted
 * 
 */
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Effect to set isMounted to true when component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render AuthModal and UploadModal components if component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal /> {/* Render AuthModal component */}
      <UploadModal /> {/* Render UploadModal component */}
    </>
  );
}

export default ModalProvider; // Export ModalProvider component

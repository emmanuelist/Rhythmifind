"use client";

import { Toaster } from "react-hot-toast"; // Import Toaster component from react-hot-toast

/** 
 * ToasterProvider component provides custom styling options for toast notifications
 *  Custom styling options for toasts
 * 
*/
const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
  );
};

export default ToasterProvider; // Export ToasterProvider component

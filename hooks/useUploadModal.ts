import { create } from "zustand"; // Import create function from zustand

/**
 * Interface representing the state and actions of the upload modal.
 */
interface UploadModalStore {
  isOpen: boolean; // Indicates whether the upload modal is open or not
  onOpen: () => void; // Function to open the upload modal
  onClose: () => void; // Function to close the upload modal
}

/**
 * Custom hook for managing the state of the upload modal.
 */
const useUploadModal = create<UploadModalStore>((Set) => ({
  isOpen: false, // Initialize upload modal as closed
  onOpen: () => Set({ isOpen: true }), // Function to open the upload modal
  onClose: () => Set({ isOpen: false }), // Function to close the upload modal
}));

export default useUploadModal; // Export the useUploadModal hook

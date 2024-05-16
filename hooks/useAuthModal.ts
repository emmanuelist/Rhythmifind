import { create } from "zustand"; // Import create function from zustand

/**
 * Interface representing the state of the authentication modal.
 */
interface AuthModalStore {
  isOpen: boolean; // Flag indicating if the authentication modal is open
  onOpen: () => void; // Function to open the authentication modal
  onClose: () => void; // Function to close the authentication modal
}

/**
 * Custom hook for managing the state of the authentication modal.
 * @returns {AuthModalStore} - Object containing state and functions for managing the authentication modal.
 */
const useAuthModal = create<AuthModalStore>((Set) => ({
  isOpen: false, // Initialize isOpen to false
  onOpen: () => Set({ isOpen: true }), // Function to set isOpen to true
  onClose: () => Set({ isOpen: false }), // Function to set isOpen to false
}));

export default useAuthModal; // Export useAuthModal hook
import { create } from "zustand"; // Import create function from zustand

/**
 * Interface representing the state and actions of the player.
 */
interface PlayerStore {
  ids: string[]; // Array of song IDs
  activeId?: string; // ID of the currently active song
  setId: (id: string) => void; // Function to set the active song ID
  setIds: (ids: string[]) => void; // Function to set array of song IDs
  reset: () => void; // Function to reset player state
}

/**
 * Custom hook for managing player state.
 */
const usePlayer = create<PlayerStore>((set) => ({
  ids: [], // Initialize array of song IDs
  activeId: undefined, // Initialize active song ID
  setId: (id: string) => set({ activeId: id }), // Function to set active song ID
  setIds: (ids: string[]) => set({ ids: ids }), // Function to set array of song IDs
  reset: () => set({ ids: [], activeId: undefined }), // Function to reset player state
}));

export default usePlayer; // Export the usePlayer hook

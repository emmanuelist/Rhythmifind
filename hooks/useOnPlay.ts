import { Song } from "@/types"; // Import Song type

import usePlayer from "./usePlayer"; // Import usePlayer hook
import useAuthModal from "./useAuthModal"; // Import useAuthModal hook
import { useUser } from "./useUser"; // Import useUser hook

/**
 * Custom hook for handling play action.
 * @param {Song[]} songs - Array of songs.
 * @returns {Function} - Function to handle play action.
 */
const useOnPlay = (songs: Song[]) => {
  const player = usePlayer(); // Access player state and actions
  const authModal = useAuthModal(); // Access authentication modal state and actions
  const { user } = useUser(); // Access user state

  /**
   * Function to handle play action.
   * @param {string} id - ID of the song to play.
   */
  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen(); // Open authentication modal if user is not logged in
    }

    player.setId(id); // Set active song ID
    player.setIds(songs.map((song) => song.id)); // Set array of song IDs
  };

  return onPlay; // Return function to handle play action
};

export default useOnPlay; // Export the useOnPlay hook

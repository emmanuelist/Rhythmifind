import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Import useSupabaseClient hook from auth-helpers-react

import { Song } from "@/types"; // Import Song type

/**
 * Custom hook for loading image associated with a song.
 * @param {Song} song - The song object containing image path.
 * @returns {string | null} - Public URL of the image or null if song is not provided.
 */
const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient(); // Access supabaseClient from the session context

  if (!song) {
    return null; // Return null if song is not provided
  }

  const { data: imageData } = supabaseClient.storage.from('images').getPublicUrl(song.image_path); // Fetch public URL of the image

  return imageData.publicUrl; // Return public URL of the image
};

export default useLoadImage; // Export the useLoadImage hook

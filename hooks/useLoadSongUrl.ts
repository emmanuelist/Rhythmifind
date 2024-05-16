import { Song } from "@/types"; // Import Song type
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Import useSupabaseClient hook from auth-helpers-react

/**
 * Custom hook for loading the URL of a song.
 * @param {Song} song - The song object containing song path.
 * @returns {string} - Public URL of the song or an empty string if song is not provided.
 */
const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient(); // Access supabaseClient from the session context

  if (!song) {
    return ""; // Return empty string if song is not provided
  }

  const { data: songData } = supabaseClient.storage // Fetch public URL of the song
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl; // Return public URL of the song
};

export default useLoadSongUrl; // Export the useLoadSongUrl hook

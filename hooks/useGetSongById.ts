import { useSessionContext } from "@supabase/auth-helpers-react"; // Import useSessionContext hook from auth-helpers-react
import { useEffect, useMemo, useState } from "react"; // Import useEffect, useMemo, and useState hooks from react
import toast from "react-hot-toast"; // Import toast function from react-hot-toast
import { Song } from "@/types"; // Import Song type

/**
 * Custom hook for fetching a song by its ID.
 * @param {string | undefined} id - The ID of the song to fetch.
 * @returns {{isLoading: boolean, song: Song | undefined}} - Object containing loading state and fetched song.
 */
const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [song, setSong] = useState<Song | undefined>(undefined); // State to store fetched song
  const { supabaseClient } = useSessionContext(); // Access supabaseClient from the session context

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true); // Set loading to true when fetching song

    const fetchSong = async () => {
      const { data, error } = await supabaseClient // Fetch song data from Supabase
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false); // Set loading to false on error
        return toast.error(error.message); // Display error toast message
      }

      setSong(data as Song); // Set fetched song data
      setIsLoading(false); // Set loading to false after fetching song
    };

    fetchSong(); // Call fetchSong function
  }, [id, supabaseClient]); // Re-run effect when ID or supabaseClient changes

  // Memoize isLoading and song values to prevent unnecessary re-renders
  return useMemo(() => ({
    isLoading,
    song,
  }), [isLoading, song]);
};

export default useGetSongById; // Export the useGetSongById hook

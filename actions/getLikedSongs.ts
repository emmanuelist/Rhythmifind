// Import necessary types and functions
import { Song } from "@/types";  // Import the Song type definition from a centralized types file
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";  // Import function to initialize Supabase client for server components
import { cookies } from "next/headers";  // Import cookies from Next.js for authentication handling

/**
 * Fetches a list of liked songs for the currently authenticated user.
 * Utilizes Supabase for database interactions.
 * 
 * @returns {Promise<Song[]>} A promise that resolves to an array of Song objects.
 */
const getLikedSongs = async (): Promise<Song[]> => {
  // Create a Supabase client instance for server-side operations, with cookies for session management
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  // Retrieve the current session data from Supabase authentication
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Fetch liked songs from the 'liked_songs' table where the user_id matches the current session user id
  // Additionally, joins the 'songs' table to include all related song details and orders by creation date descending
  const { data, error } = await supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  // Handle any errors during the fetch operation
  if (error) {
    console.log(error);
    return [];  // Return an empty array if an error occurs
  }

  // Return an empty array if no data is found
  if (!data) {
    return [];
  }

  // Map over the fetched data to format it correctly as an array of Song types
  return data.map((item) => ({
    ...item.songs  // Spread syntax to include all properties of each song
  }));
};

// Export the getLikedSongs function as a default export
export default getLikedSongs;
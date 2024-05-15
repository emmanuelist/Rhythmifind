// Import necessary types and utilities
import { Song } from "@/types";  // Import the Song type definition from a centralized types file.
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";  // Import function to initialize Supabase client for server components.
import { cookies } from "next/headers";  // Import cookies to handle authentication via Next.js headers.
import getSongs from "./getSongs";  // Import the getSongs function
/**
 * Asynchronously fetches a list of songs filtered by title or all songs if no title is provided.
 * Utilizes Supabase for database operations, ensuring that only server-side rendered components or
 * API routes can access the database.
 *
 * @param {string} title - The title of the song to filter by. If empty, all songs are returned.
 * @returns {Promise<Song[]>} A promise that resolves to an array of Song objects matching the
 * specified title (if provided) or all songs.
 */
const getSongsByTitle = async (title: string): Promise<Song[]> => {
  // Initialize Supabase client with cookie-based authentication for server-side operations.
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // If no title is provided, fetch all songs using the getSongs function.
  if (!title) {
    const allSongs = await getSongs();
    return allSongs;  // Return all songs if no title is provided.
  }

  // Query the 'songs' table in Supabase to retrieve songs matching the provided title,
  // using a case-insensitive ILIKE search to find partial matches.
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike('title', `%${title}%`)  // ILIKE is used for case-insensitive matching.
    .order("created_at", { ascending: false });

  // Log any errors encountered during the query.
  if (error) { 
    console.log(error);  // Output the error to the console for debugging.
  }

  // Return the data as an array of Song objects or an empty array if no data is present or an error occurred.
  // The 'as any' type assertion is used to handle cases where data type may not align perfectly.
  return (data as any) || [];
};

// Export the getSongsByTitle function as the default export from this module,
// making it available for import in other parts of the application.
export default getSongsByTitle;

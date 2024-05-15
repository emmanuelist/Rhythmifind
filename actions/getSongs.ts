// Import necessary types and utilities
import { Song } from "@/types";  // Import the Song type definition from a centralized types file.
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";  // Import function to initialize Supabase client for server components.
import { cookies } from "next/headers";  // Import cookies to handle authentication via Next.js headers.

/**
 * Asynchronously fetches a list of all songs sorted by creation date in descending order.
 * Utilizes Supabase for database operations, ensuring that only server-side rendered components or
 * API routes can access the database.
 *
 * @returns {Promise<Song[]>} A promise that resolves to an array of Song objects.
 * Returns an empty array if an error occurs or if no data is found.
 */
const getSongs = async (): Promise<Song[]> => {
  // Initialize Supabase client with cookie-based authentication for server-side operations.
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Query the 'songs' table in Supabase to retrieve all songs,
  // ordering them by the 'created_at' timestamp in descending order to get the most recent songs first.
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  // Log any errors encountered during the query.
  if (error) {
    console.log(error);  // Output the error to the console for debugging.
  }

  // Return the data as an array of Song objects or an empty array if no data is present or an error occurred.
  // The 'as any' type assertion is used to handle cases where data type may not align perfectly.
  return (data as any) || [];
};

// Export the getSongs function as the default export from this module,
// making it available for import in other parts of the application.
export default getSongs;

// Import necessary types and utilities
import { Song } from "@/types";  // Import the Song type definition from a centralized types file.
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";  // Import function to initialize Supabase client for server components.
import { cookies } from "next/headers";  // Import cookies to handle authentication via Next.js headers.

/**
 * Asynchronously fetches a list of songs associated with the authenticated user.
 * Utilizes Supabase for database operations, ensuring that only server-side rendered components or
 * API routes can access the database.
 *
 * @returns {Promise<Song[]>} A promise that resolves to an array of Song objects associated with the authenticated user.
 */
const getSongsByUserId = async (): Promise<Song[]> => {
  // Initialize Supabase client with cookie-based authentication for server-side operations.
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Retrieve the current session data from Supabase authentication.
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  // Handle any errors encountered while retrieving the session data.
  if (sessionError) {
    console.log(sessionError.message);  // Output the error message to the console for debugging.
    return [];  // Return an empty array if an error occurs.
  }

  // Query the 'songs' table in Supabase to retrieve songs associated with the authenticated user,
  // filtering by the user_id obtained from the session data and ordering by creation date in descending order.
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  // Handle any errors encountered during the query.
  if (error) {
    console.log(error.message);  // Output the error message to the console for debugging.
  }

  // Return the data as an array of Song objects or an empty array if no data is present or an error occurred.
  // The 'as any' type assertion is used to handle cases where data type may not align perfectly.
  return (data as any) || [];
};

// Export the getSongsByUserId function as the default export from this module,
// making it available for import in other parts of the application.
export default getSongsByUserId;

"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // Import function to create Supabase client
import { SessionContextProvider } from "@supabase/auth-helpers-react"; // Import SessionContextProvider
import { useState } from "react"; // Import useState hook

import { Database } from "@/types_db"; // Import Database type

/** 
 * Props for SupabaseProvider component
 * SupabaseProvider component wraps children components with Supabase session context
 * Provide Supabase client to SessionContextProvider
 * Provide Supabase client to SessionContextProvider
 * Render children component
*/
interface SupabaseProviderProps {
  children: React.ReactNode; // Children components
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children
}) => {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>() // Create Supabase client
  );
  
  return (
    <SessionContextProvider supabaseClient={supabaseClient}> 
      {children} 
    </SessionContextProvider>
  );
};

export default SupabaseProvider; // Export SupabaseProvider component

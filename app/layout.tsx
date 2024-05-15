/**
 * Import global CSS stylesheets for consistent styling across the application
 * Import Figtree font for use in the application
 * Import Figtree font from Google Fonts API.
 * Import Next.js metadata type for defining page metadata
 * Import type definition for page metadata.
 * Import components and providers
 * Import Sidebar component for displaying sidebar navigation.
 * Import Supabase provider for handling Supabase authentication and data fetching.
 * Import User provider for managing user authentication and data.
 * Import Modal provider for managing modals and dialogs.
 * Import Toaster provider for displaying toast notifications.
 * Import function for fetching songs by user ID.
 * Import Player component for audio playback.
 */

import "./globals.css";
import { Figtree } from "next/font/google";

import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import SupabaseProviderProps from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

// Initialize Figtree font with Latin subset
const font = Figtree({ subsets: ["latin"] });

// Define metadata for the page
export const metadata: Metadata = {
  title: "Rhythmifind",
  description: "Listen to music and find the rhythm!",
};

// Set revalidation interval for Next.js ISR (Incremental Static Regeneration)
export const revalidate = 0;

// Define the root layout component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch songs associated with the current user
  const userSongs = await getSongsByUserId();

  // Return the layout structure
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProviderProps>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProviderProps>
      </body>
    </html>
  );
}

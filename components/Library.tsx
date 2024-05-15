"use client";

/**
 * Placeholder comment: "use client".
 * This comment is a placeholder and does not affect the code execution.
 */

import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import MediaItem from "./MediaItem";
import { Song } from "@/types";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUploadModal } from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";

/**
 * Props interface for Library component.
 * @interface LibraryProps
 * @property {Song[]} songs - Array of songs in the library.
 */
interface LibraryProps {
  songs: Song[];
}

/**
 * Library component.
 * @function: Library
 * @param: {LibraryProps} props - Component props.
 * @returns: {JSX.Element} Rendered Library component.
 */
const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal(); // Initialize useAuthModal hook
  const uploadModal = useUploadModal(); // Initialize useUploadModal hook
  const { user } = useUser(); // Initialize useUser hook

  const onPlay = useOnPlay(songs); // Initialize useOnPlay hook

  /** Function to handle click event on Add button */
  const onClick = () => {
    if (!user) {
      return authModal.onOpen(); // Open authentication modal if user is not logged in
    }

    // TODO: Check for subscription

    return uploadModal.onOpen(); // Open upload modal if user is logged in
  };

  // Render Library component
  return (
    <div className="flex flex-col">
      {/* Library header */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          {/* Playlist icon */}
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        {/* Add button */}
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      {/* List of songs */}
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)} // Pass onClick function to MediaItem component
            key={item.id} // Set key for each MediaItem
            data={item} // Pass song data to MediaItem component
          />
        ))}
      </div>
    </div>
  );
};

export default Library;

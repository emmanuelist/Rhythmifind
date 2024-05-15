"use client";

// Import necessary hooks and components
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

// Define the interface for the LikedContent component's props
interface LikedContentProps {
  songs: Song[];
}

// The LikedContent component displays the list of liked songs
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  // Use the useRouter hook to access the router object
  const router = useRouter();

  // Use the useUser hook to access the user object and the isLoading state
  const { isLoading, user } = useUser();

  // Use the useOnPlay hook to handle playing a song
  const onPlay = useOnPlay(songs);

  // Use the useEffect hook to redirect the user to the home page if they are not logged in
  useEffect(() => {
    if (!isLoading &&!user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  // Check if there are any liked songs
  if (songs.length === 0) {
    return (
      <div
        className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
        "
      >
        No Liked songs!
      </div>
    );
  }

  // Render the list of liked songs
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

// Export the LikedContent component
export default LikedContent;
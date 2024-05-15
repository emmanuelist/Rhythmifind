/**
 * Import necessary components and hooks
 */
"use client";

import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";

/**
 * Define the interface for the SearchContent component's props
 */
interface SearchContentProps {
  songs: Song[];
}

/**
 * The SearchContent component displays a list of songs based on the search results
 * @param props - The props passed to the component
 * @returns The JSX.Element to be rendered
 */
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  /**
   * Use the useOnPlay hook to handle playing a song
   */
  const onPlay = useOnPlay(songs);

  /**
   * Check if there are any songs in the search results
   */
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  /**
   * Render the list of songs
   */
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          {/* TODO: Add Like Button Here */}
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

/**
 * Export the SearchContent component
 */
export default SearchContent;
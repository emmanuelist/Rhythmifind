// Use the "use client" directive to indicate this component should be rendered on the client-side
"use client";

// Import necessary components and hooks
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

// Define the interface for the PageContent component's props
interface PageContentProps {
  songs: Song[];
}

// The PageContent component displays a list of songs
const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  // Use the useOnPlay hook to handle playing a song
  const onPlay = useOnPlay(songs);
  // Check if there are any songs
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }
  // Render the list of songs
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((item) => (
        <SongItem
          key={item.id}
          onClick={(id: string) => onPlay(id)}
          data={item}
        />
      ))}
    </div>
  );
};

// Export the PageContent component
export default PageContent;
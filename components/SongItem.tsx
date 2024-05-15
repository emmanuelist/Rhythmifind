// Use client
"use client";

import useLoadImage from "@/hooks/useLoadImage"; // Import useLoadImage hook from "@/hooks/useLoadImage"
import { Song } from "@/types"; // Import Song type from "@/types"
import Image from "next/image"; // Import Image component from next/image
import PlayButton from "./PlayButton"; // Import PlayButton component

interface SongItemProps {
  data: Song; // Song data
  onClick: (id: string) => void; // Function to handle click event
}

/**
 * SongItem Component
 * @param {SongItemProps} props - The props for the SongItem component.
 * @returns {JSX.Element} - The rendered SongItem component.
 */
const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data); // Load image using useLoadImage hook

  return (
    <div
      onClick={() => onClick(data.id)} // Handle click event
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        {/* Render image */}
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        {/* Render song title */}
        <p className="font-semibold truncate w-full">{data.title}</p>
        {/* Render song author */}
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">{data.author}</p>
      </div>
      {/* Render play button */}
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem; // Export SongItem component

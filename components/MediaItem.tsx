"use client";

/**
 * Placeholder comment: "use client".
 * This comment is a placeholder and does not affect the code execution.
 */

import React from "react";
import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

/**
 * Props interface for MediaItem component.
 * @interface MediaItemProps
 * @property {Song} data - Song data.
 * @property {Function} [onClick] - Function to handle click event.
 */
interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

/**
 * MediaItem component.
 * @function MediaItem
 * @param {MediaItemProps} props - Component props.
 * @returns {JSX.Element} - Rendered MediaItem component.
 */
const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data); // Initialize useLoadImage hook to get image URL

  // Function to handle item click
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id); // Call onClick function with song ID as parameter
    }

    // TODO: Default turn on player
  };

  // Render MediaItem component
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;

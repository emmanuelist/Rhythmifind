"use client";

/**
 * Placeholder comment: "use client".
 * This comment is a placeholder and does not affect the code execution.
 */

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

/**
 * Props interface for ListItem component.
 * @interface ListItemProps
 * @property {string} image - URL of the image.
 * @property {string} name - Name of the item.
 * @property {string} href - URL to navigate on item click.
 */
interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

/**
 * ListItem component.
 * @function ListItem
 * @param {ListItemProps} props - Component props.
 * @returns {JSX.Element} - Rendered ListItem component.
 */
const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter(); // Initialize useRouter hook for routing

  // Function to handle item click
  const onClick = () => {
    // Add authentication before push
    router.push(href); // Navigate to specified URL
  };

  // Render ListItem component
  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      {/* Item image */}
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      {/* Item name */}
      <p className="font-medium truncate py-5">{name}</p>
      {/* Play icon */}
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;

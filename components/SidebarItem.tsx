import Link from "next/link"; // Import Link component from next/link
import React from "react"; // Import React module
import { IconType } from "react-icons"; // Import IconType type from react-icons
import { twMerge } from "tailwind-merge"; // Import twMerge function from tailwind-merge module

interface SidebarItemProps {
  icon: IconType; // IconType from react-icons
  label: string; // Label for the sidebar item
  active?: boolean; // Flag indicating if the item is active
  href: string; // URL for the sidebar item link
}

/**
 * SidebarItem Component
 * @param {SidebarItemProps} props - The props for the SidebarItem component.
 * @returns {JSX.Element} - The rendered SidebarItem component.
 */
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon, // Icon for the sidebar item
  label, // Label for the sidebar item
  active, // Flag indicating if the item is active
  href, // URL for the sidebar item link
}) => {
  return (
    <Link
      href={href} // URL for the sidebar item link
      className={twMerge(
        // Merge Tailwind classes
        `flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`, // Base classes
        active && "text-white" // Active class conditionally applied
      )}
    >
      <Icon size={26} /> {/* Render the icon */}
      <p className="truncate w-full">{label}</p> {/* Render the label */}
    </Link>
  );
};

export default SidebarItem; // Export SidebarItem component

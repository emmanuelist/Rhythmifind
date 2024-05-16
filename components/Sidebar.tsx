"use client";

import { usePathname } from "next/navigation"; // Import usePathname hook from next/navigation
import { useMemo } from "react"; // Import useMemo hook from react
import { BiSearch } from "react-icons/bi"; // Import BiSearch icon from react-icons/bi
import { HiHome } from "react-icons/hi"; // Import HiHome icon from react-icons/hi
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types"; // Import Song type from "@/types"
import usePlayer from "@/hooks/usePlayer"; // Import usePlayer hook from "@/hooks/usePlayer"
import { twMerge } from "tailwind-merge"; // Import twMerge function from tailwind-merge module


interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

/**
 * Sidebar Component
 * @param {SidebarProps} props - The props for the Sidebar component.
 * @returns {JSX.Element} - The rendered Sidebar component.
 */
const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname(); // use usePathname hook from next/navigation
  const player = usePlayer(); // use usePlayer hook from "@/hooks/usePlayer"
  


  // Define sidebar routes
  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: "Home",
      active: pathname !== "/search",
      href: "/",
    },
    {
      icon: BiSearch,
      label: "Search",
      active: pathname === "/search",
      href: "/search",
    },
  ], [pathname]);

  return (
    <div className={twMerge(`flex h-[100vh]`)}>
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;

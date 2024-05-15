"use client";

/**
 * Placeholder comment: "use client".
 * This comment is a placeholder and does not affect the code execution.
 */

import React from "react";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

/**
 * Player component renders the player interface.
 * @returns {JSX.Element} - Rendered Player component.
 */
const Player = () => {
  const player = usePlayer(); // Initialize usePlayer hook to get player information
  const { song } = useGetSongById(player.activeId); // Initialize useGetSongById hook to get song information
  const songUrl = useLoadSongUrl(song!); // Initialize useLoadSongUrl hook to load song URL

  // Return null if song, songUrl, or activeId is not available
  if (!song || !songUrl || !player.activeId) return null;

  // Render Player component
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;

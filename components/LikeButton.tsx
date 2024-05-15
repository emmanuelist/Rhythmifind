"use client";

/**
 * Placeholder comment: "use client".
 * This comment is a placeholder and does not affect the code execution.
 */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

/**
 * Props interface for LikeButton component.
 * @interface LikeButtonProps
 * @property {string} songId - ID of the song.
 */
interface LikeButtonProps {
  songId: string;
}

/**
 * LikeButton component.
 * @function: LikeButton
 * @param: {LikeButtonProps} props - Component props.
 * @returns: {JSX.Element} - Rendered LikeButton component.
 */
const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter(); // Initialize useRouter hook for routing
  const { supabaseClient } = useSessionContext(); // Initialize useSessionContext hook for Supabase client

  const authModal = useAuthModal(); // Initialize useAuthModal hook
  const { user } = useUser(); // Initialize useUser hook

  const [isLiked, setIsLiked] = useState(false); // State variable to track if the song is liked

  // Fetch liked status on component mount or when songId or user changes
  useEffect(() => {
    if (!user?.id) {
      return; // Exit early if user is not logged in
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true); // Set isLiked to true if song is liked by the user
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  // Determine icon based on like status
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  // Function to handle like/unlike action
  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen(); // Open authentication modal if user is not logged in
    }

    if (isLiked) {
      // Unlike the song if already liked
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message); // Show error message if deletion fails
      } else {
        setIsLiked(false); // Update isLiked state
      }
    } else {
      // Like the song if not already liked
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message); // Show error message if insertion fails
      } else {
        setIsLiked(true); // Update isLiked state
        toast.success("Song liked!"); // Show success message
      }
    }
    router.refresh(); // Refresh router to reflect changes
  };

  // Render LikeButton component
  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;

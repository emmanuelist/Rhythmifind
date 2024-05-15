"use client";

/** 
 * Placeholder comment: "use client".
 * This comment is a placeholder and does not affect the code execution.
 */

// Import necessary modules and components
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js for routing
import { BiSearch } from "react-icons/bi"; // Import BiSearch icon from react-icons/bi
import { HiHome } from "react-icons/hi"; // Import HiHome icon from react-icons/hi
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"; // Import RxCaretLeft and RxCaretRight icons from react-icons/rx
import { twMerge } from "tailwind-merge"; // Import twMerge function from tailwind-merge
import { useSupabaseClient } from "@supabase/auth-helpers-react"; // Import useSupabaseClient hook from @supabase/auth-helpers-react
import { FaUserAlt } from "react-icons/fa"; // Import FaUserAlt icon from react-icons/fa
import Button from "./Button"; // Import Button component
import useAuthModal from "@/hooks/useAuthModal"; // Import useAuthModal hook
import { useUser } from "@/hooks/useUser"; // Import useUser hook
import toast from "react-hot-toast"; // Import toast function from react-hot-toast
import usePlayer from "@/hooks/usePlayer"; // Import usePlayer hook

/** 
 * Props interface for Header component.
 * @interface HeaderProps
 * @property {React.ReactNode} children - Children nodes.
 * @property {string} [className] - Optional class name.
 */
interface HeaderProps {
  children: React.ReactNode; 
  className?: string; 
}

/** 
 * Header component.
 * @function Header
 * @param {HeaderProps} props - Component props.
 * @returns {JSX.Element} Rendered Header component.
 */
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  // Initialize hooks and variables
  const authModal = useAuthModal(); // Initialize useAuthModal hook for authentication modal
  const router = useRouter(); // Initialize useRouter hook for routing
  const player = usePlayer(); // Initialize usePlayer hook for player functionality

  const supabaseClient = useSupabaseClient(); // Initialize useSupabaseClient hook for Supabase client
  const { user } = useUser(); // Initialize useUser hook for user authentication

  /** 
   * Function to handle logout.
   * @function handleLogout
   * @returns {Promise<void>} Promise that resolves when logout is completed.
   */
  const handleLogout = async (): Promise<void> => {
    // Sign out user from Supabase
    const { error } = await supabaseClient.auth.signOut();
    /* Reset any playing song */
    player.reset();
    // Reset router to refresh page
    router.refresh();

    // Show success or error message
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
  };

  // Render Header component
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            // Render logout and profile buttons if user is logged in
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("#")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            // Render signup and login buttons if user is not logged in
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

// Export the Header component as the default export
export default Header;

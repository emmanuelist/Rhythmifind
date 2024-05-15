import { FaPlay } from "react-icons/fa";

/**
 * PlayButton component renders a button with a play icon.
 * @returns {JSX.Element} - Rendered PlayButton component.
 */
const PlayButton = () => {
  return (
    <button className="transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;

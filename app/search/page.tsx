// Import function to fetch songs by title
import getSongsByTitle from "@/actions/getSongsByTitle";

/**
 * Import components and interfaces
 * Header component for page header
 * SearchInput component for search input field
 * SearchContent component for displaying search results
 */
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

// Define interface for Search component props
interface SearchProps {
  searchParams: {
    title: string; // Title parameter for search query
  };
}

// Set revalidation interval for Next.js ISR (Incremental Static Regeneration)
export const revalidate = 0;

/**
 * Search component.
 * 
 * @param {SearchProps} props - The props for the Search component.
 * @returns {JSX.Element} The Search component JSX.
 */
const Search = async ({ searchParams }: SearchProps): Promise<JSX.Element> => {
  // Fetch songs matching the provided title
  const songs = await getSongsByTitle(searchParams.title);

  // Return the Search component JSX
  return (
    <div className="bg-slate-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

// Export the Search component as the default export
export default Search;

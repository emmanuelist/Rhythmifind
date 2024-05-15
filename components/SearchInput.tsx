"use client";

import qs from "query-string"; // Import query-string library
import { useRouter } from "next/navigation"; // Import useRouter hook from next/navigation
import { useEffect, useState } from "react"; // Import useEffect and useState hooks from react

import useDebounce from "@/hooks/useDebounce"; // Import useDebounce hook
import Input from "./Input";

/**
 * SearchInput Component
 * @returns {JSX.Element} - The rendered SearchInput component.
 */
const SearchInput = () => {
  const router = useRouter(); // use useRouter hook from next/navigation
  const [value, setValue] = useState<string>(""); // useState hook from react
  const debouncedValue = useDebounce<string>(value, 500); // useDebounce hook from "@/hooks/useDebounce"

  useEffect(() => {
    // useEffect hook from react
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to ?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;

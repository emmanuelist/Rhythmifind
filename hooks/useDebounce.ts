import { useEffect, useState } from "react"; // Import useEffect and useState hooks from react

/**
 * Custom hook for debouncing a value.
 * @param {T} value - The value to be debounced.
 * @param {number} delay - The delay in milliseconds for debouncing.
 * @returns {T} - The debounced value.
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value); // Initialize debouncedValue state with the initial value

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value); // Update debouncedValue after the delay
    }, delay || 500); // Use the provided delay or default to 500 milliseconds

    return () => {
      clearTimeout(timer); // Clear the timer on cleanup
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return debouncedValue; // Return the debounced value
}

export default useDebounce; // Export the useDebounce hook

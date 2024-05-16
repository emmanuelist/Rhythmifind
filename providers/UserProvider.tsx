"use client";

import { MyUserContextProvider } from "@/hooks/useUser"; // Import MyUserContextProvider from useUser hook

/** 
 * UserProvider component wraps the application with the user context provider 
 * to provide user authentication and related data throughout the app
 * Return: Render MyUserContextProvider with children
 */
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider; // Export UserProvider component

import { createContext, useEffect, useState } from "react";
import { UserDetails, Subscription } from "@/types"; // Import types
import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import React from "react";

// Define the type for the UserContext
type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

// Create the UserContext
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Define props interface
export interface Props {
  [propName: string]: any;
}

// UserContextProvider component
export const MyUserContextProvider = (props: Props) => {
  // Destructure values from useSessionContext and useSupaUser hooks
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } =
    useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // Function to get user details
  const getUserDetails = () => supabase.from("users").select("*").single();

  // Function to get user subscription
  const getSubscription = () =>
    supabase
      .from("subscription")
      .select("*, price(*, product(*))")
      .in("status", ["trialing", "active"])
      .single();

  // Effect hook to fetch user details and subscription
  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (subscriptionPromise.status === "fulfilled") {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  // Value for the context
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

// Custom hook to use UserContext
export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyUserProvider");
  }
  return context;
};

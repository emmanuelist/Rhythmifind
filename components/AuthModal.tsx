// Use the "use client" directive to indicate this component should be rendered on the client-side
"use client";

// Import necessary hooks and components
import useAuthModal from "@/hooks/useAuthModal";
import Modal from "./Modal";

// Import necessary libraries and hooks from Supabase
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// The AuthModal component displays an authentication modal
const AuthModal = () => {
  // Use the useSupabaseClient hook to access the Supabase client
  const supabaseClient = useSupabaseClient();
  // Use the useRouter hook to access the router object
  const router = useRouter();
  // Use the useSessionContext hook to access the session object
  const { session } = useSessionContext();
  // Use the useAuthModal hook to access the onClose and isOpen state
  const { onClose, isOpen } = useAuthModal();

  // Use the useEffect hook to refresh the page and close the modal when the user is authenticated
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  // Use the onChange function to close the modal when it is not open
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Render the authentication modal
  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={["github", "google"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

// Export the AuthModal component
export default AuthModal;
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the shape of your AuthContext data
type AuthDataType = {
  session: Session | null;
  error: string | null;
  loading: boolean;
  profile: any;
  isAdmin: boolean;
};

// 1. Create a custom context for authentication
const AuthContext = createContext<AuthDataType>({
  session: null,
  error: null, // Default value for error state
  loading: true,
  profile: null,
  isAdmin: false,
});

// 2. AuthProvider Component that wraps the app and provides session and error states
const AuthProvider = ({ children }: PropsWithChildren) => {
  // track a session
  const [session, setSession] = useState<Session | null>(null);
  //  track profile
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for managing errors

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // find session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw new Error(error.message); // Throw the error to be caught below
        }

        setSession(session); // Set session if <successful>

        if (session) {
          // fetch profile
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setProfile(data || null);
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message); // Set error message in state
        console.log("Error fetching session:", err.message); // Log error for debugging
      }
    };

    fetchSession();
    // check auto the session
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        error,
        loading,
        profile,
        isAdmin: profile?.group == "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// 3. Custom hook to consume the AuthContext
export const useAuth = () => useContext(AuthContext);

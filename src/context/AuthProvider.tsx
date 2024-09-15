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
  profile: Profile | null;
  isAdmin: boolean;
};

// 1. Create a custom context for authentication
const AuthContext = createContext<AuthDataType>({
  session: null,
  error: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

// 2. AuthProvider Component that wraps the app and provides session and error states
const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Fetch the session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw new Error(error.message);
        }

        setSession(session);

        if (session) {
          // Fetch profile data
          const { data, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            throw new Error(profileError.message);
          }

          setProfile(data as unknown as Profile | null);
        }

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        console.log("Error fetching session:", err.message);
      }
    };

    fetchSession();

    // Update session on auth state change
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setProfile(data as unknown as Profile | null);
    } catch (err: any) {
      console.log("Error fetching profile:", err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        error,
        loading,
        profile,
        isAdmin: profile?.group === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// 3. Custom hook to consume the AuthContext
export const useAuth = () => useContext(AuthContext);

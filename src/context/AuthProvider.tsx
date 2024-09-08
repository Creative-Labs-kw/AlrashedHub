import { supabase } from "@/lib/supabase";
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
};

// 1. Create a custom context for authentication
const AuthContext = createContext<AuthDataType>({
  session: null,
  error: null, // Default value for error state
  loading: true,
});

// 2. AuthProvider Component that wraps the app and provides session and error states
const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for managing errors

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw new Error(error.message); // Throw the error to be caught below
        }

        setSession(data.session); // Set session if successful
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
    <AuthContext.Provider value={{ session, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// 3. Custom hook to consume the AuthContext
export const useAuth = () => useContext(AuthContext);

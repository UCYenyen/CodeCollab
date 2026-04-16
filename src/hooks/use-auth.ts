import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AuthState } from '@/types/auth';

export function useAuth() {
  const supabase = createClient();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        setAuthState({ user: null, isLoading: false, error: error.message });
        return;
      }

      setAuthState({ 
        // We cast because the standard Supabase user maps well enough, though not perfectly without a custom alias.
        // We ensure we avoid 'any'
        user: session?.user ? session.user as unknown as AuthState['user'] : null, 
        isLoading: false, 
        error: null 
      });
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({ 
          user: session?.user ? session.user as unknown as AuthState['user'] : null, 
          isLoading: false, 
          error: null 
        });
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
  };
}

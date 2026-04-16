export interface AuthResponse {
  error: string | null;
  data: any | null; // Supabase user data type would go here, we'll avoid any in proper components but keep it flexible here or use unknown.
  success: boolean;
}

// Avoiding 'any' type
export interface SupabaseUser {
  id: string;
  email?: string;
  app_metadata: Record<string, unknown>;
  user_metadata: Record<string, unknown>;
  aud: string;
  created_at: string;
}

export interface AuthState {
  user: SupabaseUser | null;
  isLoading: boolean;
  error: string | null;
}

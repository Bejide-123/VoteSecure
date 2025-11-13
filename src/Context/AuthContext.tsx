import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Import Supabase client
import type { ReactNode } from 'react';

// ===== TYPE DEFINITIONS =====
// This defines what a User looks like in our app

interface User {
  uid: string;                    // Unique user ID (from Firebase later)
  email: string;                  // User's email
  userType: 'voter' | 'admin';    // What kind of user they are
  fullName: string;               // Their full name
  memberId: string;               // Student/Staff ID
  organization: string;           // School/Organization name
  department?: string;            // Optional department
  position?: string;              // Optional position (for admins)
  selfieUrl?: string;             // Profile picture URL
  createdAt: Date;                // When they registered
}

// ===== CONTEXT TYPE =====
// This defines what the AuthContext provides to components

interface AuthContextType {
  // Current user data (null if not logged in)
  user: User | null;
  
  // Is someone logged in?
  isAuthenticated: boolean;
  
  // Is the current user an admin?
  isAdmin: boolean;
  
  // Is the current user a voter?
  isVoter: boolean;
  
  // Are we still checking if someone is logged in? (on page load)
  isLoading: boolean;
  
  // Functions to manage authentication
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// ===== CREATE CONTEXT =====
// This creates the Context that components will use

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===== PROVIDER COMPONENT =====
// This wraps your app and provides auth data to all children

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  
  // ===== STATE =====
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // ===== DERIVED STATE =====
  // These are calculated from the user state
  const isAuthenticated = user !== null;
  const isAdmin = user?.userType === 'admin';
  const isVoter = user?.userType === 'voter';
  
  // ===== LOAD USER FROM LOCAL STORAGE ON MOUNT =====
  // This runs ONCE when the app first loads
  // It checks if there's a saved user in localStorage
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        // First check localStorage for cached user
        const savedUser = localStorage.getItem('votesecure_user');
        
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          parsedUser.createdAt = new Date(parsedUser.createdAt);
          setUser(parsedUser);
          console.log('✅ User loaded from storage:', parsedUser.email);
        }

        // Then check if there's an active Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Refresh user data from database
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const userData = {
              uid: profile.id,
              email: profile.email,
              userType: profile.user_type as 'voter' | 'admin',
              fullName: profile.full_name,
              memberId: profile.member_id,
              organization: profile.organization,
              department: profile.department || undefined,
              position: profile.position || undefined,
              selfieUrl: profile.selfie_url || undefined,
              createdAt: new Date(profile.created_at)
            };
            
            setUser(userData);
            localStorage.setItem('votesecure_user', JSON.stringify(userData));
            console.log('✅ User session restored from Supabase');
          }
        } else if (!savedUser) {
          console.log('ℹ️ No saved user or session found');
        }
      } catch (error) {
        console.error('❌ Error loading user:', error);
        localStorage.removeItem('votesecure_user');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []); // Empty dependency array = run once on mount
  
  // ===== LOGIN FUNCTION =====
  // This is called when a user successfully logs in
  
  const login = (userData: User) => {
    try {
      // Save user to state
      setUser(userData);
      
      // Save user to localStorage (so they stay logged in on refresh)
      localStorage.setItem('votesecure_user', JSON.stringify(userData));
      
      console.log('✅ User logged in:', userData.email);
    } catch (error) {
      console.error('❌ Error saving user:', error);
    }
  };
  
  // ===== LOGOUT FUNCTION =====
  // This is called when a user logs out
  
  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear user from state
      setUser(null);
      
      // Clear user from localStorage
      localStorage.removeItem('votesecure_user');
      
      console.log('✅ User logged out');
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('❌ Error during logout:', error);
    }
  };
  
  // ===== UPDATE USER FUNCTION =====
  // This is called when user updates their profile
  
  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      // Merge updates with existing user data
      const updatedUser = { ...user, ...updates };
      
      // Update state
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('votesecure_user', JSON.stringify(updatedUser));
      
      console.log('✅ User updated:', updates);
    } catch (error) {
      console.error('❌ Error updating user:', error);
    }
  };
  
  // ===== CONTEXT VALUE =====
  // This is what components will have access to
  
  const value: AuthContextType = {
    user,
    isAuthenticated,
    isAdmin,
    isVoter,
    isLoading,
    login,
    logout,
    updateUser,
  };
  
  // ===== LOADING STATE =====
  // While checking localStorage, show nothing
  // This prevents a flash of "not logged in" content
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-950 dark:to-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-semibold">
            Loading VoteSecure...
          </p>
        </div>
      </div>
    );
  }
  
  // ===== PROVIDE CONTEXT =====
  // Wrap children with the context provider
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
// This is how components will access the auth context

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// ===== HELPER FUNCTION: Protected Route Component =====
// This component blocks access to pages that require login

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;  // If true, only admins can access
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  
  // Still checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }
  
  // Not logged in - redirect to login
  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }
  
  // Requires admin but user is not admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-950 dark:to-gray-900">
        <div className="text-center max-w-md p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need admin privileges to access this page.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  // All checks passed - show the protected content
  return <>{children}</>;
};
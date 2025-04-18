import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { auth } from '../config/firebase.config';
import { authService } from '../services/api.service';
import { onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  initiateGoogleLogin: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Login with email/password
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock login - in a real app, this would call to your Firebase auth
      setCurrentUser({
        uid: 'user123',
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
      });
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock registration - in a real app, this would call to your Firebase auth
      setCurrentUser({
        uid: 'user123',
        email: email,
        displayName: name,
        photoURL: null,
      });
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // New method to directly initiate Google login flow
  const initiateGoogleLogin = async () => {
    try {
      console.log("Initiating Google sign-in redirect flow");
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      // Clear any previous auth state
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Start the redirect flow
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error("Error initiating Google login:", err);
      setError('Failed to start Google login process');
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Logging out user...");
      
      // Clear local storage first
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Call backend logout
      try {
        await authService.logout();
      } catch (logoutError) {
        console.error("Backend logout error:", logoutError);
        // Continue with Firebase logout even if backend logout fails
      }
      
      // Firebase sign out last
      await auth.signOut();
      
      // Clear user state
      setCurrentUser(null);
      console.log("Logout complete");
    } catch (err) {
      console.error("Logout error:", err);
      setError('Failed to log out. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login with idToken
  const loginWithGoogle = async (idToken: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Sending Google ID token to backend");
      const response = await authService.loginWithGoogle(idToken);

      if (response && response.user) {
        const userData = {
          uid: response.user.uid,
          email: response.user.email,
          displayName: response.user.displayName,
          photoURL: response.user.photoURL,
        };
        
        setCurrentUser(userData);
        console.log("Authentication successful, user set in context:", userData);
        return response;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: Error | unknown) {
      console.error("Google login error in AuthContext:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError('Failed to login with Google: ' + errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Legacy method for backwards compatibility
  const googleLogin = async () => {
    return initiateGoogleLogin();
  };

  // Listen for Firebase auth state changes
  useEffect(() => {
    let isSubscribed = true;
    
    console.log("Setting up Firebase auth state listener");
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isSubscribed) return;
      
      if (firebaseUser) {
        // User is signed in with Firebase
        console.log("Firebase auth state changed - user is signed in:", firebaseUser.email);
        
        try {
          // Get the ID token
          const idToken = await firebaseUser.getIdToken();
          
          // Use the token to authenticate with your backend
          try {
            const response = await authService.loginWithGoogle(idToken);
            
            if (response && response.user && isSubscribed) {
              setCurrentUser({
                uid: response.user.uid,
                email: response.user.email,
                displayName: response.user.displayName,
                photoURL: response.user.photoURL,
              });
              console.log("Backend authentication successful");
            }
          } catch (backendError) {
            console.error("Backend authentication failed, using Firebase user info:", backendError);
            
            // If backend auth fails, still set the user from Firebase
            if (isSubscribed) {
              setCurrentUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
              });
            }
          }
        } catch (error) {
          console.error("Error during token retrieval:", error);
        }
      } else {
        // User is signed out of Firebase
        console.log("Firebase auth state changed - user is signed out");
        if (isSubscribed) {
          setCurrentUser(null);
        }
      }
      
      if (isSubscribed) {
        setLoading(false);
      }
    });

    // Check if there's a stored user in localStorage as a fallback
    const storedUser = localStorage.getItem('user');
    if (storedUser && !currentUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log("Retrieved user from localStorage:", userData);
        setCurrentUser(userData);
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem('user');
      }
    }

    // Cleanup subscription on unmount
    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    loginWithGoogle,
    googleLogin,
    initiateGoogleLogin,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
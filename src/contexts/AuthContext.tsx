
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface User {
  uid: string;
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing user in localStorage (temporary until backend is connected)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock authentication functions until backend is connected
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      // Extract name from email for display purposes (temporary)
      const displayName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
      // This is a mock implementation
      const mockUser = { uid: '123456', email, displayName };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success(`Welcome back, ${displayName}!`);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      // This is a mock implementation
      const mockUser = { uid: '123456', email, displayName: name };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success(`Account created successfully, ${name}!`);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // This is a mock implementation
      setUser(null);
      localStorage.removeItem('user');
      toast.success("You've been logged out successfully");
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      // Mock implementation
      toast.success(`Password reset email sent to ${email}`);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

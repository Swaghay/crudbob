'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserWithID } from '../types/user';
import * as userServices from '../services/userServices';

interface AuthContextType {
  user: UserWithID | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error: string | null }>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithID | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bookbay-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await userServices.signIn(email, password);
      const loggedInUser = response.data;
      setUser(loggedInUser);
      localStorage.setItem('bookbay-user', JSON.stringify(loggedInUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<{success: boolean; error: string | null}> => {
    setIsLoading(true);
    try {
      const response = await userServices.signUp(email, password, name);
      const newUser = response.data;
      setUser(newUser);
      localStorage.setItem('bookbay-user', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true, error: null };
      } catch (error: any) {
      setIsLoading(false);

      if (error.response && error.response.data && error.response.data.detail) {
        return { success: false, error: error.response.data.detail };
      }

      return { success: false, error: 'Unknown error occurred' };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('bookbay-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

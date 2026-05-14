'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserInfo } from '@/types';
import { useUser, useClerk, useAuth as useClerkAuth } from "@clerk/nextjs";
import { setAuthToken } from '@/lib/api';

interface AuthContextType {
  userInfo: UserInfo | null;
  login: (userData: UserInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useClerkAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const updateToken = async () => {
      if (isLoaded && user) {
        const token = await getToken();
        setAuthToken(token);
        
        setUserInfo({
          _id: user.id,
          name: user.fullName || user.firstName || 'User',
          email: user.primaryEmailAddress?.emailAddress || '',
          isAdmin: user.publicMetadata?.role === 'admin',
          token: token || '',
        });
      } else if (isLoaded && !user) {
        setAuthToken(null);
        setUserInfo(null);
      }
    };

    updateToken();
  }, [user, isLoaded, getToken]);

  const login = (userData: UserInfo) => {
    // Handled by Clerk
    setUserInfo(userData);
  };

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

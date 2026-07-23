'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserInfo } from '@/types';

interface StoredUser extends UserInfo {
  password: string;
}

interface AuthContextType {
  userInfo: UserInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem('eshop_users') || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem('eshop_users', JSON.stringify(users));
}

function generateToken(user: UserInfo): string {
  const payload = { id: user._id, email: user.email, exp: Date.now() + 30 * 24 * 60 * 60 * 1000 };
  return btoa(JSON.stringify(payload));
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('eshop_token');
    const storedUser = localStorage.getItem('eshop_user');
    if (token && storedUser) {
      try {
        const payload = JSON.parse(atob(token));
        if (payload.exp > Date.now()) {
          setUserInfo(JSON.parse(storedUser));
        } else {
          localStorage.removeItem('eshop_token');
          localStorage.removeItem('eshop_user');
        }
      } catch {
        localStorage.removeItem('eshop_token');
        localStorage.removeItem('eshop_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const users = getUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return { success: false, error: 'No account found with this email' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }

    const userData: UserInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = generateToken(userData);
    localStorage.setItem('eshop_token', token);
    localStorage.setItem('eshop_user', JSON.stringify(userData));
    setUserInfo(userData);
    return { success: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const users = getUsers();

    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const newUser: StoredUser = {
      _id: 'user_' + Date.now(),
      name,
      email,
      password,
      isAdmin: false,
    };

    users.push(newUser);
    saveUsers(users);

    const userData: UserInfo = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    };

    const token = generateToken(userData);
    localStorage.setItem('eshop_token', token);
    localStorage.setItem('eshop_user', JSON.stringify(userData));
    setUserInfo(userData);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('eshop_token');
    localStorage.removeItem('eshop_user');
    setUserInfo(null);
  }, []);

  const updateProfile = useCallback((name: string, email: string) => {
    if (!userInfo) return;

    const users = getUsers();
    const idx = users.findIndex((u) => u._id === userInfo._id);
    if (idx !== -1) {
      users[idx].name = name;
      users[idx].email = email;
      saveUsers(users);
    }

    const updated: UserInfo = { ...userInfo, name, email };
    localStorage.setItem('eshop_user', JSON.stringify(updated));
    setUserInfo(updated);
  }, [userInfo]);

  return (
    <AuthContext.Provider value={{ userInfo, loading, login, signup, logout, updateProfile }}>
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

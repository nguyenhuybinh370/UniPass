import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { AuthUser } from '@/types/auth';
import { tokenStorage } from '@/utils/tokenStorage';
import { STORAGE_KEYS } from '@/constants/storage';

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Khôi phục phiên đăng nhập từ localStorage khi reload trang
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const token = tokenStorage.getAccessToken();

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error restoring auth state', error);
      tokenStorage.clearTokens();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((userData: AuthUser, token = 'mock-jwt-token') => {
    setUser(userData);
    tokenStorage.setAccessToken(token);
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    } catch (e) {
      console.error('Failed to store user profile', e);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    tokenStorage.clearTokens();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

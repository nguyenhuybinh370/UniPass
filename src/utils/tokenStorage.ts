import { STORAGE_KEYS } from '@/constants/storage';

export const tokenStorage = {
  getAccessToken: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch {
      return null;
    }
  },

  setAccessToken: (token: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    } catch (e) {
      console.error('Failed to store access token', e);
    }
  },

  getRefreshToken: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch {
      return null;
    }
  },

  setRefreshToken: (token: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    } catch (e) {
      console.error('Failed to store refresh token', e);
    }
  },

  clearTokens: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (e) {
      console.error('Failed to clear tokens', e);
    }
  },
};

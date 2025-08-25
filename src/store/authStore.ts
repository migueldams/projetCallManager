import {removeToken, setToken,setUserId} from '../utils/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types';
import axios from 'axios'

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toggleTheme: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const api = axios.create({
  baseURL: 'http://localhost:4000', // Backend Express
  headers: {
    'Content-Type': 'application/json'
  }
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      theme: 'light',

      login: async (email: string, password: string) => {
        // Simulation d'une authentification
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await api.post('/post/api/login', { email ,password });
        console.log(response.data.token)
        if(response.status == 200){
          const userId = response.data.user.id
          const token = response.data.token
          setUserId(userId)
          setToken(token)
          const user = response.data.user
          console.log(token)
          set({
            user: user,
            token,
            isAuthenticated: true,
          });
          return true
        }
        return false;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        removeToken()
      },

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },
    }),
    {
      name: 'pulse-auth-storage',
    }
  )
);

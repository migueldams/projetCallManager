
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types';

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

// Données utilisateurs simulées pour la démo
const mockUsers: Record<string, { user: User; password: string }> = {
  'admin@pulsemanager.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@pulsemanager.com',
      firstName: 'Marie',
      lastName: 'Dubois',
      role: 'admin',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20female%20executive%20portrait%20with%20friendly%20smile%2C%20modern%20office%20background%2C%20business%20attire%2C%20high%20quality%20corporate%20headshot&width=400&height=400&seq=admin-avatar-1&orientation=squarish',
      isActive: true,
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString(),
    },
  },
  'dg@pulsemanager.com': {
    password: 'dg123',
    user: {
      id: '4',
      email: 'daf@pulsemanager.com',
      firstName: 'francis',
      lastName: 'Dubois',
      role: 'daf',
      avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20female%20call%20center%20agent%20portrait%2C%20headset%20around%20neck%2C%20bright%20office%20environment%2C%20confident%20smile&width=400&height=400&seq=agent-avatar-1&orientation=squarish',
      isActive: true,
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString(),
    },
  },
  'daf@pulsemanager.com': {
    password: 'daf123',
    user: {
      id: '4',
      email: 'daf@pulsemanager.com',
      firstName: 'francis',
      lastName: 'Dubois',
      role: 'daf',
      avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20female%20call%20center%20agent%20portrait%2C%20headset%20around%20neck%2C%20bright%20office%20environment%2C%20confident%20smile&width=400&height=400&seq=agent-avatar-1&orientation=squarish',
      isActive: true,
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString(),
    },
  },

  'rh@pulsemanager.com': {
    password: 'rh123',
    user: {
      id: '2',
      email: 'rh@pulsemanager.com',
      firstName: 'Pierre',
      lastName: 'Martin',
      role: 'rh',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20HR%20manager%20portrait%2C%20friendly%20approachable%20appearance%2C%20modern%20office%20setting%2C%20business%20casual%20attire&width=400&height=400&seq=rh-avatar-1&orientation=squarish',
      isActive: true,
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString(),
    },
  },
  'supervisor@pulsemanager.com': {
    password: 'supervisor123',
    user: {
      id: '2',
      email: 'supervisor@pulsemanager.com',
      firstName: 'Pierre',
      lastName: 'Martin',
      role: 'supervisor',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20male%20HR%20manager%20portrait%2C%20friendly%20approachable%20appearance%2C%20modern%20office%20setting%2C%20business%20casual%20attire&width=400&height=400&seq=rh-avatar-1&orientation=squarish',
      isActive: true,
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString(),
    },
  },

  'agent@pulsemanager.com': {
    password: 'agent123',
    user: {
      id: '3',
      email: 'agent@pulsemanager.com',
      firstName: 'Sophie',
      lastName: 'Leroy',
      role: 'agent',
      avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20female%20call%20center%20agent%20portrait%2C%20headset%20around%20neck%2C%20bright%20office%20environment%2C%20confident%20smile&width=400&height=400&seq=agent-avatar-1&orientation=squarish',
      isActive: true,
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString(),
    },
  },
  
};

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
        
        const userData = mockUsers[email];
        if (userData && userData.password === password) {
          const token = `mock-jwt-${Date.now()}`;
          set({
            user: userData.user,
            token,
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
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

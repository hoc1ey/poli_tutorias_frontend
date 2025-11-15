import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/interfaces';

interface SessionState {
  user: Partial<User> | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  checkAuth: () => boolean;
  getUserRole: () => string[];
  hasRole: (role: string) => boolean;
  setLoading: (loading: boolean) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
        });
      },

      login: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...userData,
            },
          });
        }
      },

      checkAuth: () => {
        const { user } = get();
        return !!user;
      },

      getUserRole: () => {
        const user = get().user;
        return user?.role || [];
      },

      hasRole: (role: string) => {
        const userRoles = get().getUserRole();
        return userRoles.includes(role);
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setAuth: ({ user, token }) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),

      initializeAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
          get().setAuth({ user: null, token });
        }
      }
    }),
    { name: 'auth-storage' }
  )
);

export default useAuthStore;

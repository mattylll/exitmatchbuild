import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { SessionUser } from '@/types'

interface AuthState {
  user: SessionUser | null
  isLoading: boolean
  setUser: (user: SessionUser | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        setUser: (user) => set({ user }),
        setLoading: (loading) => set({ isLoading: loading }),
        logout: () => set({ user: null }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user }), // Only persist user data
      }
    )
  )
)
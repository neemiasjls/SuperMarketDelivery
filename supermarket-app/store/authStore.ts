'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'
import { api } from '@/lib/api'

interface AuthStore {
  user: User | null
  isLoginOpen: boolean
  isRegisterOpen: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>
  logout: () => void
  openLogin: () => void
  closeLogin: () => void
  openRegister: () => void
  closeRegister: () => void
}

function saveToken(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem('auth_token', token)
}

function clearToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('auth_token')
}

function mapUser(raw: any): User {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    phone: raw.phone ?? '',
    addresses: raw.addresses ?? [],
  }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoginOpen: false,
      isRegisterOpen: false,

      login: async (email, password) => {
        try {
          const { token, user } = await api.auth.login({ email, password })
          saveToken(token)
          set({ user: mapUser(user), isLoginOpen: false })
          return true
        } catch {
          return false
        }
      },

      register: async (name, email, password, phone) => {
        try {
          const { token, user } = await api.auth.register({ name, email, password, phone })
          saveToken(token)
          set({ user: mapUser(user), isRegisterOpen: false })
          return true
        } catch {
          return false
        }
      },

      logout: () => {
        clearToken()
        set({ user: null })
      },
      openLogin: () => set({ isLoginOpen: true, isRegisterOpen: false }),
      closeLogin: () => set({ isLoginOpen: false }),
      openRegister: () => set({ isRegisterOpen: true, isLoginOpen: false }),
      closeRegister: () => set({ isRegisterOpen: false }),
    }),
    { name: 'auth-storage' }
  )
)

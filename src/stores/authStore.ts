import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import api from '@/api/axios'

interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    setUser: (user: User) => void
    setTokens: (access: string, refresh: string) => void
    login: (email: string, password: string) => Promise<any>
    setAuth: (user: User, access: string, refresh: string) => void
    logout: () => Promise<void>
    updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,

            setUser: (user) => set({ user }),

            setTokens: (access, refresh) =>
                set({ accessToken: access, refreshToken: refresh }),

            login: async (email, password) => {
                const response = await api.post('/auth/login', { email, password })
                const data = response.data

                // Save token to localStorage as fallback for cross-domain
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token)
                }

                set({
                    user: data.user,
                    accessToken: data.access_token,
                    refreshToken: data.access_token, // backend uses same for now
                    isAuthenticated: true,
                })
                return data
            },

            setAuth: (user, access, refresh) => {
                if (access) {
                    localStorage.setItem('access_token', access)
                }
                set({
                    user,
                    accessToken: access,
                    refreshToken: refresh,
                    isAuthenticated: true,
                })
            },

            logout: async () => {
                localStorage.removeItem('access_token')
                await api.post('/auth/logout').catch(() => { })
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                })
            },

            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),
        }),
        {
            name: 'manuastro-auth',
            partialize: (state: AuthState) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)

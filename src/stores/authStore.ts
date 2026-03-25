import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import api from '@/api/axios'
import type { User } from '@/types'

interface LoginResponse {
    user: User
    access_token: string
    refresh_token?: string
    token_type?: string
}

interface AuthState {
    user: User | null
    accessToken: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    setUser: (user: User) => void
    setTokens: (access: string, refresh?: string | null) => void
    login: (email: string, password: string) => Promise<LoginResponse>
    setAuth: (user: User, access: string, refresh?: string | null) => void
    logout: () => Promise<void>
    updateUser: (updates: Partial<User>) => void
    restoreAuth: () => boolean
}

const localStorageWithValidation = {
    getItem: (name: string) => {
        try {
            const stored = localStorage.getItem(name)
            if (!stored) return null

            const parsed = JSON.parse(stored)
            if (parsed?.state?.accessToken) {
                localStorage.setItem('access_token', parsed.state.accessToken)
            }
            return stored
        } catch {
            return null
        }
    },
    setItem: (name: string, value: string) => {
        try {
            localStorage.setItem(name, value)
            const parsed = JSON.parse(value)
            if (parsed?.state?.accessToken) {
                localStorage.setItem('access_token', parsed.state.accessToken)
            }
        } catch (error) {
            console.error('Failed to save to localStorage:', error)
        }
    },
    removeItem: (name: string) => {
        localStorage.removeItem(name)
        localStorage.removeItem('access_token')
    },
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
                set({ accessToken: access, refreshToken: refresh ?? null }),

            login: async (email: string, password: string) => {
                const response = await api.post('/auth/login', { email, password })
                const data = response.data as LoginResponse

                if (!data.access_token) {
                    throw new Error('Login failed')
                }

                const user = data.user ? { ...data.user, is_admin: data.user.is_admin || false } : null

                set({
                    user,
                    accessToken: data.access_token,
                    refreshToken: data.refresh_token || null,
                    isAuthenticated: true,
                })

                localStorage.setItem('access_token', data.access_token)
                return data
            },

            setAuth: (user, access, refresh) => {
                if (access) {
                    localStorage.setItem('access_token', access)
                }

                set({
                    user: { ...user, is_admin: user.is_admin || false },
                    accessToken: access,
                    refreshToken: refresh ?? null,
                    isAuthenticated: true,
                })
            },

            logout: async () => {
                localStorage.removeItem('access_token')
                await api.post('/auth/logout').catch(() => {})
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

            restoreAuth: () => {
                const stored = localStorage.getItem('manuastro-auth')
                const token = localStorage.getItem('access_token')

                if (stored) {
                    try {
                        const parsed = JSON.parse(stored)
                        if (parsed?.state) {
                            set({
                                user: parsed.state.user,
                                accessToken: parsed.state.accessToken || token,
                                refreshToken: parsed.state.refreshToken,
                                isAuthenticated: parsed.state.isAuthenticated,
                            })
                            return true
                        }
                    } catch (error) {
                        console.error('Failed to parse stored auth state:', error)
                    }
                }

                if (token) {
                    set({
                        user: null,
                        accessToken: token,
                        refreshToken: null,
                        isAuthenticated: true,
                    })
                    return true
                }

                return false
            },
        }),
        {
            name: 'manuastro-auth',
            storage: createJSONStorage(() => localStorageWithValidation),
            partialize: (state: AuthState) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)

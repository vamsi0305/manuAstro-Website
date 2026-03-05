import api from '../axios'
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types'

export const authService = {
    login: async (data: LoginRequest) => {
        const response = await api.post<AuthResponse>('/auth/login', data)
        return response.data
    },

    register: async (data: RegisterRequest) => {
        const response = await api.post<AuthResponse>('/auth/register', data)
        return response.data
    },

    getProfile: async () => {
        const response = await api.get<User>('/auth/profile')
        return response.data
    },

    updateProfile: async (data: Partial<User>) => {
        const response = await api.patch<User>('/auth/profile', data)
        return response.data
    },

    verifyEmail: async (token: string) => {
        const response = await api.get(`/auth/verify-email?token=${token}`)
        return response.data
    }
}

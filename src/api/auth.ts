import apiClient from './axios'
import type { ApiResponse, LoginData, RegisterData, User } from '@/types'

export const authApi = {
    register: (data: RegisterData) =>
        apiClient.post<ApiResponse<{ user: User; access_token: string; refresh_token: string }>>('/auth/register', data),

    login: (data: LoginData) =>
        apiClient.post<ApiResponse<{ user: User; access_token: string; refresh_token: string }>>('/auth/login', data),

    refresh: (refreshToken: string) =>
        apiClient.post<ApiResponse<{ access_token: string }>>('/auth/refresh', {
            refresh_token: refreshToken,
        }),

    logout: (refreshToken: string) =>
        apiClient.post('/auth/logout', { refresh_token: refreshToken }),

    me: () =>
        apiClient.get<ApiResponse<User>>('/auth/me'),

    forgotPassword: (email: string) =>
        apiClient.post('/auth/forgot-password', { email }),

    resetPassword: (data: { email: string; otp: string; new_password: string }) =>
        apiClient.post('/auth/reset-password', data),
}

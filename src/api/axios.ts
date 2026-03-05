import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // sends HttpOnly cookies automatically
    headers: {
        'Content-Type': 'application/json',
    },
})

// NOTE: Authorization Bearer header removed — auth handled via HttpOnly cookies
// The response interceptor below handles 401 errors


// Response interceptor for handling token refresh and errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // Handle 401 Unauthorised
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = useAuthStore.getState().refreshToken
                if (refreshToken) {
                    const response = await axios.post(`${API_URL}/auth/refresh`, { refresh: refreshToken })
                    const { access } = response.data

                    useAuthStore.getState().setTokens(access, refreshToken)
                    originalRequest.headers.Authorization = `Bearer ${access}`

                    return api(originalRequest)
                }
            } catch (refreshError) {
                useAuthStore.getState().logout()
                toast.error('Session expired. Please login again.')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        // Global error handling
        const message = error.response?.data?.message || 'Something went wrong'
        if (error.response?.status !== 401) {
            toast.error(message)
        }

        return Promise.reject(error)
    }
)

export default api

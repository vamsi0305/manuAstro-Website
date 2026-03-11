import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

console.log('API URL:', API_URL) // remove after testing

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // sends HttpOnly cookies automatically
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor — add token from localStorage if exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor — save token to localStorage + cookie-based auth refresh
api.interceptors.response.use(
    (response) => {
        const token = response.data?.access_token
        if (token) {
            localStorage.setItem('access_token', token)
        }
        return response
    },
    async (error) => {
        const originalRequest = error.config

        // Handle 401 — try to refresh token via cookie-based endpoint once
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // Cookies are sent automatically (withCredentials: true)
                const response = await axios.post(
                    `${API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                )
                
                // If refresh returns a new token in body, save it
                if (response.data?.access_token) {
                    localStorage.setItem('access_token', response.data.access_token)
                }
                
                // Retry original request
                return api(originalRequest)
            } catch (refreshError) {
                // Refresh failed — clear localStorage and redirect to login
                localStorage.removeItem('access_token')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        if (error.response?.status === 401) {
            localStorage.removeItem('access_token')
        }

        // FIX: FastAPI returns "detail", not "message"
        const message =
            error.response?.data?.detail ||
            error.response?.data?.message ||
            'Something went wrong'

        if (error.response?.status !== 401) {
            toast.error(message)
        }

        return Promise.reject(error)
    }
)

export default api

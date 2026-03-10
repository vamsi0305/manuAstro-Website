import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // sends HttpOnly cookies automatically
    headers: {
        'Content-Type': 'application/json',
    },
})

// Response interceptor — cookie-based auth refresh + correct error messages
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // Handle 401 — try to refresh token via cookie-based endpoint once
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // Cookies are sent automatically (withCredentials: true)
                await axios.post(
                    `${API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                )
                // Retry original request — new access_token cookie is now set
                return api(originalRequest)
            } catch (refreshError) {
                // Refresh failed — redirect to login
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
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

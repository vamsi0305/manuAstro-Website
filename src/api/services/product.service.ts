import api from '../axios'
import type { Product, Category } from '@/types'

export const productService = {
    getAll: async (params?: { category?: string; q?: string; featured?: boolean }) => {
        const { data } = await api.get('/products', { params })
        // Return data directly — image_url comes from backend
        return Array.isArray(data) ? data : (data as any).items || (data as any).products || []
    },

    getCategories: async () => {
        const { data } = await api.get('/categories')
        return Array.isArray(data) ? data : (data as any).items || []
    },

    getReviews: async (productId: string) => {
        const response = await api.get(`/products/${productId}/reviews`)
        return response.data
    },

    addReview: async (productId: string, data: any) => {
        const response = await api.post(`/products/${productId}/reviews`, data)
        return response.data
    }
}

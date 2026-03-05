import api from '../axios'
import type { Product, Category } from '@/types'

export const productService = {
    getAll: async (params?: any) => {
        const response = await api.get<Product[]>('/products', { params })
        return response.data
    },

    getById: async (id: string) => {
        const response = await api.get<Product>(`/products/${id}`)
        return response.data
    },

    getBySlug: async (slug: string) => {
        const response = await api.get<Product>(`/products/slug/${slug}`)
        return response.data
    },

    getCategories: async () => {
        const response = await api.get<Category[]>('/categories')
        return response.data
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

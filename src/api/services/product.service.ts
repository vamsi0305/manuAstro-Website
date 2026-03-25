/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '../axios'
import type { Product, Category } from '@/types'
import { resolveAssetUrl } from '@/utils/assets'

function normalizeProduct(product: Product) {
    return {
        ...product,
        image_url: resolveAssetUrl((product as Product & { image_url?: string }).image_url),
        thumbnail_url: resolveAssetUrl(product.thumbnail_url),
        images: Array.isArray(product.images) ? product.images.map((image) => resolveAssetUrl(image) || image) : [],
    }
}

export const productService = {
    getAll: async (params?: { category?: string; q?: string; featured?: boolean }) => {
        const { data } = await api.get('/products', { params })
        const items = Array.isArray(data) ? data : (data as any).items || (data as any).products || []
        return items.map((product: Product) => normalizeProduct(product))
    },

    getBySlug: async (slug: string) => {
        const { data } = await api.get(`/products/slug/${slug}`)
        return normalizeProduct(data)
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

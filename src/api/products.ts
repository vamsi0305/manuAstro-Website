import apiClient from './axios'
import type { ApiResponse, PaginatedResponse, Product } from '@/types'

interface ProductsParams {
    category?: string
    search?: string
    sort?: string
    page?: number
    per_page?: number
    featured?: boolean
}

export const productsApi = {
    list: (params?: ProductsParams) =>
        apiClient.get<PaginatedResponse<Product>>('/products/', { params }),

    featured: () =>
        apiClient.get<ApiResponse<Product[]>>('/products/featured'),

    getBySlug: (slug: string) =>
        apiClient.get<ApiResponse<Product>>(`/products/${slug}`),

    create: (data: FormData) =>
        apiClient.post<ApiResponse<Product>>('/products/', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),

    update: (id: string, data: Partial<Product>) =>
        apiClient.put<ApiResponse<Product>>(`/products/${id}`, data),

    delete: (id: string) =>
        apiClient.delete(`/products/${id}`),

    uploadImage: (id: string, file: FormData) =>
        apiClient.post(`/products/${id}/images`, file, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
}

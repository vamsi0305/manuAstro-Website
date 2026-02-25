import apiClient from './axios'
import type { ApiResponse, PaginatedResponse, Blog } from '@/types'

export const blogsApi = {
    list: (params?: { category?: string; search?: string; page?: number }) =>
        apiClient.get<PaginatedResponse<Blog>>('/blogs/', { params }),

    featured: () =>
        apiClient.get<ApiResponse<Blog[]>>('/blogs/featured'),

    getBySlug: (slug: string) =>
        apiClient.get<ApiResponse<Blog>>(`/blogs/${slug}`),
}

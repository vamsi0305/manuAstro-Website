import api from '../axios'

export const blogService = {
    getAll: async (params?: any) => {
        const response = await api.get('/blogs', { params })
        return response.data
    },

    getBySlug: async (slug: string) => {
        const response = await api.get(`/blogs/${slug}`)
        return response.data
    },

    getCategories: async () => {
        const response = await api.get('/blogs/categories')
        return response.data
    }
}

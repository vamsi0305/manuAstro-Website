import api from '../../lib/api';

export const adminService = {
    getStats: async () => {
        const { data } = await api.get('/admin/stats');
        return data;
    },

    getOrders: async () => {
        const { data } = await api.get('/admin/orders');
        return data;
    },

    updateOrderStatus: async (orderId: number, status: string) => {
        const { data } = await api.put(`/admin/orders/${orderId}/status`, { status });
        return data;
    },

    getUsers: async () => {
        const { data } = await api.get('/admin/users');
        return data;
    },

    getBookings: async () => {
        const { data } = await api.get('/admin/bookings');
        return data;
    },

    getContacts: async () => {
        const { data } = await api.get('/admin/contacts');
        return data;
    },

    createProduct: async (productData: any) => {
        const { data } = await api.post('/admin/products', productData);
        return data;
    },

    updateProduct: async (productId: number, productData: any) => {
        const { data } = await api.put(`/admin/products/${productId}`, productData);
        return data;
    },

    deleteProduct: async (productId: number) => {
        const { data } = await api.delete(`/admin/products/${productId}`);
        return data;
    }
};

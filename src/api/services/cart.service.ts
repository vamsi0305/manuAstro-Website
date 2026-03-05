import api from '../../lib/api';

export const cartService = {
    getCart: async () => {
        const { data } = await api.get('/cart');
        return data;
    },

    addItem: async (productId: number, quantity: number = 1) => {
        const { data } = await api.post('/cart/items', {
            product_id: productId,
            quantity
        });
        return data;
    },

    updateItem: async (itemId: number, quantity: number) => {
        const { data } = await api.put(`/cart/items/${itemId}`, { quantity });
        return data;
    },

    removeItem: async (itemId: number) => {
        const { data } = await api.delete(`/cart/items/${itemId}`);
        return data;
    },

    clearCart: async () => {
        const { data } = await api.delete('/cart/clear');
        return data;
    }
};

import api from '../../lib/api';

export const wishlistService = {
    getWishlist: async () => {
        const { data } = await api.get('/wishlist');
        return data;
    },

    addItem: async (productId: number) => {
        const { data } = await api.post('/wishlist', { product_id: productId });
        return data;
    },

    removeItem: async (productId: number) => {
        const { data } = await api.delete(`/wishlist/${productId}`);
        return data;
    },

    checkItem: async (productId: number) => {
        const { data } = await api.get(`/wishlist/check/${productId}`);
        return data.is_wishlisted;
    }
};

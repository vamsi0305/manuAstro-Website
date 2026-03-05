import api from '../axios';

export const ordersService = {
    // Create new order (auth required — uses cookie)
    createOrder: async (orderData: {
        items: { product_id: number; quantity: number }[];
        shipping_address: Record<string, string>;
        payment_method: string;
        coupon_code?: string;
    }) => {
        const { data } = await api.post('/orders/', orderData);
        return data;
    },

    // Get current user's orders (auth required)
    getMyOrders: async () => {
        const { data } = await api.get('/orders/my-orders');
        return data;
    },

    // Get single order by ID (auth required, owner or admin)
    getOrderById: async (orderId: number) => {
        const { data } = await api.get(`/orders/${orderId}`);
        return data;
    },

    // Admin — get all orders
    getAllOrders: async () => {
        const { data } = await api.get('/orders/admin');
        return data;
    },

    // Admin — update order status
    updateOrderStatus: async (orderId: number, status: string) => {
        const { data } = await api.put(`/orders/${orderId}/status`, { status });
        return data;
    }

    // NOTE: /payments/submit-proof and /payments/{id}/confirm
    // are NOT implemented in the backend. Removed to prevent 404 errors.
};

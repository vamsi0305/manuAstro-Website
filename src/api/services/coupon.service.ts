import api from '../../lib/api';

export const couponService = {
    validate: async (code: string, orderAmount: number) => {
        const { data } = await api.post('/coupons/validate', {
            code: code.trim().toUpperCase(),
            order_amount: orderAmount
        });
        return data;
    }
};
